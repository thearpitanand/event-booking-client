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

const EventsPage = () => {
  const authenticationContext = useContext(AuthContext);
  const [events, setEvents] = useState([]);

  const [isCreating, setIsCreating] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [date, setDate] = useState("");

  // Fetch All events
  useEffect(() => {
    eventsFetching()
      .then((data) => {
        setEvents(data.data.events);
      })
      .catch((error) => {
        console.log("Unable to fetch data");
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
        console.log("Unable to book event");
      });
  };

  const createAnEvent = (e) => {
    e.preventDefault();
    setDate("");
    setTitle("");
    setPrice("");
    setDescription("");
    setIsCreating(!isCreating);
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
        if (!!data.data.createEvent.title) {
          return toast(
            `Event " ${data.data.createEvent.title} "is created successfully`,
            toastInfo
          );
        }
      })
      .catch((error) => {
        console.log("Unable to create event");
      });
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
        {isCreating && (
          <Modal
            title="Create Event"
            canCancel
            canConfirm
            onCancel={() => {
              setDate("");
              setTitle("");
              setPrice("");
              setDescription("");
              setIsCreating(!isCreating);
            }}
            onConfirm={createAnEvent}
          >
            <div className="Modal__form">
              <input
                className="Model__form--Input"
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <input
                className="Model__form--Input"
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <input
                className="Model__form--Input"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <textarea
                rows="3"
                className="Model__form--Input"
                type="textarea"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </Modal>
        )}
      </div>

      <p className="events__break-line"></p>

      <div className="events__content">
        <ul className="events__content-list">
          {events.map((event) => (
            <li key={event._id} className="events__event">
              <h3 className="events__event-heading">{event.title}</h3>
              <p className="events__event-description">{event.description}</p>
              <p className="events__event-price">{event.price} ₹</p>
              <button
                className="events__event-book-button"
                onClick={() => bookEvent(event._id)}
              >
                Book Now
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default EventsPage;
