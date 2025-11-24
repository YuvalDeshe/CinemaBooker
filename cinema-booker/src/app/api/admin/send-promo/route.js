import { MongoClient } from 'mongodb';
import { sendEmail, generatePromotionalEmailHtml, generatePromotionalEmailText } from '@/lib/email';

const uri = process.env.MONGODB_URI;

let client;
let userDb;
let promoDb;

async function connectToDatabases() {
  if (userDb && promoDb) {
    return { userDb, promoDb };
  }

  client = new MongoClient(uri);
  await client.connect();
  userDb = client.db('UserDatabase');
  promoDb = client.db('PromoCodeDatabase');

  return { userDb, promoDb };
}

export async function POST(request) {
  try {
    console.log('📧 [POST] /api/admin/send-promo called');
    
    const { userDb, promoDb } = await connectToDatabases();
    console.log('✅ Connected to MongoDB');

    const { promoCodeName } = await request.json();
    
    if (!promoCodeName) {
      return new Response(
        JSON.stringify({ message: 'Promo code name is required' }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('🔍 Fetching promo code:', promoCodeName);

    // Fetch the promo code details
    const promoCodeCollection = promoDb.collection('PromoCodeCollection');
    const promoCode = await promoCodeCollection.findOne({ codeString: promoCodeName });

    if (!promoCode) {
      console.error('❌ Promo code not found:', promoCodeName);
      return new Response(
        JSON.stringify({ message: 'Promo code not found' }), 
        {
          status: 404,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    console.log('✅ Found promo code:', promoCode);

    // Fetch all users who are registered for promos
    const usersCollection = userDb.collection('UserCollection');
    const users = await usersCollection.find({ 
      isRegisteredForPromos: true,
      email: { $exists: true, $ne: null, $ne: '' }
    }).toArray();

    console.log(`📧 Found ${users.length} users registered for promos`);

    if (users.length === 0) {
      return new Response(
        JSON.stringify({ 
          message: 'No users registered for promotional emails',
          emailsSent: 0,
          totalUsers: 0
        }), 
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    // Calculate discount percentage from multiplier
    const discountPercent = Math.round((1 - promoCode.priceMultiplier) * 100);

    // Send emails to all registered users
    const emailResults = [];
    let successCount = 0;
    let failCount = 0;

    for (const user of users) {
      try {
        const userName = user.firstName || user.username || 'Valued Customer';
        
        const emailHtml = generatePromotionalEmailHtml(
          userName,
          promoCode.codeString,
          discountPercent,
          promoCode.startDate,
          promoCode.endDate
        );

        const emailText = generatePromotionalEmailText(
          userName,
          promoCode.codeString,
          discountPercent,
          promoCode.startDate,
          promoCode.endDate
        );

        console.log(`📧 Sending email to ${user.email}...`);

        const result = await sendEmail({
          to: user.email,
          subject: `🎬 Exclusive ${discountPercent}% Discount - ${promoCode.codeString}`,
          text: emailText,
          html: emailHtml
        });

        if (result.success) {
          successCount++;
          emailResults.push({
            email: user.email,
            status: 'sent',
            messageId: result.messageId
          });
          console.log(`✅ Email sent successfully to ${user.email}`);
        } else {
          failCount++;
          emailResults.push({
            email: user.email,
            status: 'failed',
            error: result.error
          });
          console.error(`❌ Failed to send email to ${user.email}:`, result.error);
        }
      } catch (error) {
        failCount++;
        emailResults.push({
          email: user.email,
          status: 'failed',
          error: error.message
        });
        console.error(`❌ Error sending email to ${user.email}:`, error);
      }
    }

    console.log(`📊 Email campaign complete: ${successCount} sent, ${failCount} failed`);

    return new Response(
      JSON.stringify({ 
        message: 'Promotional emails sent',
        emailsSent: successCount,
        emailsFailed: failCount,
        totalUsers: users.length,
        promoCode: promoCode.codeString,
        discountPercent,
        results: emailResults
      }), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error in send-promo endpoint:', error);
    return new Response(
      JSON.stringify({ 
        message: 'Server error while sending promotional emails', 
        error: error.message 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

// GET endpoint to fetch all promo codes for selection
export async function GET() {
  try {
    console.log('📡 [GET] /api/admin/send-promo called');
    
    const { promoDb } = await connectToDatabases();
    console.log('✅ Connected to MongoDB');

    const promoCodeCollection = promoDb.collection('PromoCodeCollection');
    const promoCodes = await promoCodeCollection.find({}).toArray();

    console.log(`✅ Found ${promoCodes.length} promo codes`);

    return new Response(
      JSON.stringify(promoCodes), 
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error('❌ Error fetching promo codes:', error);
    return new Response(
      JSON.stringify({ 
        message: 'Server error while fetching promo codes', 
        error: error.message 
      }), 
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
