import React from "react";
import Modal from "../../Modal/Modal";
import EventModal from "../EventModal/EventModal";
import EventItem from "./EventItem/EventItem";

const EventList = ({
  events,
  authenticationContext,
  popUpBooking,
  setPopUpBooking,
  bookEvent,
}) => {
  return (
    <React.Fragment>
      <EventItem
        events={events}
        authenticationContext={authenticationContext}
        setPopUpBooking={setPopUpBooking}
      />
      <EventModal
        popUpBooking={popUpBooking}
        setPopUpBooking={setPopUpBooking}
        bookEvent={bookEvent}
      />
    </React.Fragment>
  );
};

export default EventList;
