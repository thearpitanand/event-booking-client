import React, { useContext, useEffect, useState } from "react";

// CSS
import "./Booking.css";

// Component
import Loading from "../components/Loading/Loading";

// Context
import AuthContext from "../context/auth-context";

// Helper Method
import { fetchBooking, cancelBooking } from "./helper/bookingHelper";
import BookingList from "../components/Bookings/BookingList/BookingList";

// Toastify
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastInfo } from "./helper/eventsHelper";
toast.configure();

const BookingsPage = () => {
  const { token } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetchBooking({ token })
      .then((data) => {
        // console.log(data.data.bookings);
        setBookings(data.data.bookings);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Unable to book event");
        setIsLoading(false);
      });
  }, [token]);

  const cancelBookingNow = (bookingId, eventName) => {
    setIsLoading(true);
    cancelBooking({ bookingId, token })
      .then((data) => {
        // console.log(data.data.cancelBooking._id);
        if (data.data.cancelBooking._id) {
          toast(
            `Booking for ${eventName} event is canceled successfully.`,
            toastInfo
          );
          let updatedBookings = [...bookings];
          updatedBookings = updatedBookings.filter((booking) => {
            return booking._id !== bookingId;
          });
          setBookings([...updatedBookings]);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Unable to cancel event booking.");
        setIsLoading(false);
      });
  };

  return (
    <div className="bookings__main-div">
      <div className="bookings__header">
        <h1>Bookings</h1>
      </div>

      <p className="bookings__break-line"></p>

      <div className="bookings__content">
        <ul className="bookings__content-list">
          {isLoading ? (
            <Loading />
          ) : (
            <BookingList
              bookings={bookings}
              cancelBookingNow={cancelBookingNow}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default BookingsPage;
