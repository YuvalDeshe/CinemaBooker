import { MongoClient, ObjectId } from 'mongodb';
import { sendEmail, generateBookingConfirmationEmailHtml, generateBookingConfirmationEmailText } from '@/lib/email';

const uri = process.env.MONGODB_URI;

export async function POST(request) {
    let client;
    let db;
    
    async function connectToDatabase() {
        if (db) {
            return { db };
        }
    
        client = new MongoClient(uri);
        await client.connect();
        db = client.db('BookingDatabase');
    
        return { db };
    }

    try {
        const { db } = await connectToDatabase();
        const BookingCollection = db.collection('BookingCollection');

        const newBooking = await request.json();

        console.log('promocodeid: ', newBooking.promoCodeID);
        const promoCodeID = (newBooking.promoCodeID === '' || newBooking.promoCodeID === undefined) ? null : ObjectId.createFromHexString(newBooking.promoCodeID);

        const bookingToInsert = {
        movieID: ObjectId.createFromHexString(newBooking.movieID),
        promoCode: newBooking.promoCode,
        promoCodeID: promoCodeID,
        showID: ObjectId.createFromHexString(newBooking.showID),
        userID: ObjectId.createFromHexString(newBooking.userID),
        // userID: newBooking.userID,
        paymentCardUsed: newBooking.paymentCardUsed,
        bookingDate: newBooking.bookingDate,
        orderTotal: newBooking.orderTotal,
        seats: newBooking.seats,
        tickets: newBooking.tickets,
        };

        if (newBooking.userID == '') throw new Error('Invalid UserID');
        const result = await BookingCollection.insertOne(bookingToInsert);

        // Send confirmation email
        if (newBooking.userEmail && newBooking.userName) {
            try {
                const emailHtml = generateBookingConfirmationEmailHtml(
                    newBooking.userName,
                    {
                        bookingId: result.insertedId.toString(),
                        movieTitle: newBooking.movieTitle || 'Movie',
                        showtime: newBooking.showtime || '',
                        date: newBooking.date || '',
                        auditorium: newBooking.auditorium || '',
                        seats: newBooking.seats || [],
                        adultTickets: newBooking.tickets?.adult || 0,
                        childTickets: newBooking.tickets?.child || 0,
                        seniorTickets: newBooking.tickets?.senior || 0,
                        orderTotal: newBooking.orderTotal || 0,
                        promoCode: newBooking.promoCode || '',
                        bookingDate: newBooking.bookingDate
                    }
                );

                const emailText = generateBookingConfirmationEmailText(
                    newBooking.userName,
                    {
                        bookingId: result.insertedId.toString(),
                        movieTitle: newBooking.movieTitle || 'Movie',
                        showtime: newBooking.showtime || '',
                        date: newBooking.date || '',
                        auditorium: newBooking.auditorium || '',
                        seats: newBooking.seats || [],
                        adultTickets: newBooking.tickets?.adult || 0,
                        childTickets: newBooking.tickets?.child || 0,
                        seniorTickets: newBooking.tickets?.senior || 0,
                        orderTotal: newBooking.orderTotal || 0,
                        promoCode: newBooking.promoCode || '',
                        bookingDate: newBooking.bookingDate
                    }
                );

                await sendEmail({
                    to: newBooking.userEmail,
                    subject: `Booking Confirmation - ${newBooking.movieTitle || 'Your Movie'}`,
                    text: emailText,
                    html: emailHtml
                });

                console.log('Booking confirmation email sent to:', newBooking.userEmail);
            } catch (emailError) {
                console.error('Failed to send booking confirmation email:', emailError);
                // Don't fail the booking if email fails
            }
        }

        return new Response(JSON.stringify({
            ...result,
            bookingId: result.insertedId.toString()
        }), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error("Failed to add new booking:", error);
        return new Response(JSON.stringify({ message: "An error occurred while adding the booking.", error: error.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
}
