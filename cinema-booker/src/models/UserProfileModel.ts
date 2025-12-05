// models/UserProfileModel.ts

export type Booking = {
  _id: string;
  movieID: string;
  promoCode: string;
  promoCodeID: string;
  showID: string;
  userID: string;
  bookingDate: string;
  orderTotal: number;
  seats: string[];
  tickets: {
    child: number;
    adult: number;
    senior: number;
  };
};

export type Show = {
  _id: string;
  movieID: string;
  showRoomID: string;
  movieTitle: string;
  showRoomName: string;
  time: number;
  date: string;
  seatReservationArray: boolean[];
};

export type CompleteBooking = {
  booking: Booking;
  show: Show;
};
