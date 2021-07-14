import React, { useState, useContext, useEffect } from "react";

// CSS
import "./Events.css";

// Context
import AuthContext from "../context/auth-context";

// Helper
import {
  eventsFetching,
  createEvent,
  bookEventHelper,
  toastInfo,
} from "./helper/eventsHelper";

// Component
import Modal from "../components/Modal/Modal";
import { toast } from "react-toastify";
import Loading from "../components/Loading/Loading";
import EventList from "../components/Events/EventList/EventList";
import CreateEvent from "../components/Events/CreateEventModal/CreateEvent";

const EventsPage = () => {
  const authenticationContext = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const [popUpBooking, setPopUpBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  // Fetch All events
  useEffect(() => {
    setIsLoading(true);
    eventsFetching()
      .then((data) => {
        setEvents(data.data.events);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Unable to fetch data");
        setIsLoading(false);
      });
  }, [isCreating]);

  const bookEvent = (eventId) => {
    bookEventHelper({ eventId, token: authenticationContext.token })
      .then((data) => {
        if (!!data.data.bookEvent._id) {
          return toast(
            `You Have Successfully Booked Event " ${data.data.bookEvent.event.title} "`,
            toastInfo
          );
        }
      })
      .catch((error) => {
        console.log(error);
        console.log("Unable to book event");
      });
  };

  const createAnEvent = (e) => {
    e.preventDefault();
    if (
      title.trim().length === 0 ||
      description.trim().length === 0 ||
      price.trim().length === 0 ||
      date.trim().length === 0
    ) {
      return toast("Enter all information.", toastInfo);
    }
    createEvent({
      title,
      description,
      price,
      date,
      token: authenticationContext.token,
    })
      .then((data) => {
        if (!!data.data.createEvent._id) {
          let updatedEvents = [...events];
          updatedEvents.push({
            _id: data.data.createEvent._id,
            title,
            description,
            price,
            date,
            creator: {
              _id: authenticationContext.userId,
            },
          });
          setEvents([...updatedEvents]);
          return toast(`Event " ${title} " is created successfully`, toastInfo);
        }
      })
      .catch((error) => {
        console.log("Unable to create event");
      });
    setDate("");
    setTitle("");
    setPrice("");
    setDescription("");
    setIsCreating(!isCreating);
  };

  return (
    <div className="events__main-div">
      <div className="events__header">
        <h1>Events</h1>
        {!!authenticationContext.token && (
          <button
            className="events__header__button"
            onClick={() => setIsCreating(!isCreating)}
          >
            Create Event
          </button>
        )}
        <CreateEvent
          isCreating={isCreating}
          setDate={setDate}
          setTitle={setTitle}
          setPrice={setPrice}
          setDescription={setDescription}
          setIsCreating={setIsCreating}
          createAnEvent={createAnEvent}
          title={title}
          price={price}
          date={date}
          description={description}
        />
      </div>

      <p className="events__break-line"></p>

      <div className="events__content">
        <ul className="events__content-list">
          {isLoading ? (
            <Loading />
          ) : (
            <EventList
              events={events}
              authenticationContext={authenticationContext}
              popUpBooking={popUpBooking}
              setPopUpBooking={setPopUpBooking}
              bookEvent={bookEvent}
            />
          )}
        </ul>
      </div>
    </div>
  );
};

export default EventsPage;
