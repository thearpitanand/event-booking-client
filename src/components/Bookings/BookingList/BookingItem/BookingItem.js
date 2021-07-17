import React from "react";

// CSS
import "./BookingItem.css";

const BookingItem = ({ bookings, cancelBookingNow, token }) => {
  return (
    <React.Fragment>
      {bookings.map((booking) => (
        <li key={booking._id} className="bookings__event">
          <h3 className="bookings__event-heading">{booking.event.title}</h3>
          <p className="bookings__event-description">
            {booking.event.description}
          </p>
          <p className="bookings__event-date">
            {new Date(booking.createdAt).toLocaleDateString()}
          </p>
          <button
            className="bookings__event-cancel-button"
            onClick={() => cancelBookingNow(booking._id, booking.event.title)}
          >
            Cancel Booking
          </button>
        </li>
      ))}
    </React.Fragment>
  );
};

export default BookingItem;
