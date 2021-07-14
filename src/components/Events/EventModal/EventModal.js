import React from "react";

// CSS
import "./EventModal.css";

// Component
import Modal from "../../Modal/Modal";

const EventModal = ({ popUpBooking, setPopUpBooking, bookEvent }) => {
  return (
    <div>
      {!!popUpBooking && (
        <Modal
          title={popUpBooking.title}
          canCancel
          canConfirm
          onCancel={() => {
            setPopUpBooking(null);
          }}
          onConfirm={() => {
            bookEvent(popUpBooking._id);
            return setPopUpBooking(null);
          }}
        >
          <div className="events__event-booking-modal">
            <p>{popUpBooking.description}</p>
            <div className="events__event-booking-modal-price-date">
              <p>
                <span>Price :- </span>
                {popUpBooking.price} INR
              </p>
              <p>
                <span>Date :- </span>
                {new Date(popUpBooking.date).toLocaleDateString()}
              </p>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
};

export default EventModal;
