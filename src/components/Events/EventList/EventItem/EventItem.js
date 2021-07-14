import React from "react";

// CSS
import "./EventItem.css";

const EventItem = ({ events, authenticationContext, setPopUpBooking }) => {
  return (
    <React.Fragment>
      {events.map((event) => (
        <li key={event._id} className="events__event">
          <h3 className="events__event-heading">{event.title}</h3>
          <p className="events__event-description">{event.description}</p>
          {/* <p className="events__event-price">{event.price} INR</p> */}
          <p
            className="events__event-date"
            style={{
              textAlign: !!authenticationContext.userId ? "left" : "center",
            }}
          >
            {new Date(event.date).toLocaleDateString()}
          </p>
          {event.creator._id === authenticationContext.userId ? (
            <p className="events__event-creator">Created by you!</p>
          ) : (
            !!authenticationContext.userId && (
              <button
                className="events__event-book-button"
                onClick={() => {
                  setPopUpBooking(event);
                }}
              >
                Book Now
              </button>
            )
          )}
        </li>
      ))}
    </React.Fragment>
  );
};

export default EventItem;
