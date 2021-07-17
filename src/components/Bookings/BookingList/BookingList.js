import React from "react";
import BookingItem from "./BookingItem/BookingItem";

const BookingList = ({ bookings, cancelBookingNow }) => {
  return (
    <React.Fragment>
      <ul>
        <BookingItem bookings={bookings} cancelBookingNow={cancelBookingNow} />
      </ul>
    </React.Fragment>
  );
};

export default BookingList;
