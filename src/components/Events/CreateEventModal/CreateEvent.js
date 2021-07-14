import React from "react";

// CSS
import "./CreateEvent.css";

// Component
import Modal from "../../Modal/Modal";

const CreateEvent = ({
  isCreating,
  setDate,
  setTitle,
  setPrice,
  setDescription,
  setIsCreating,
  createAnEvent,
  title,
  price,
  date,
  description,
}) => {
  return (
    <React.Fragment>
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
    </React.Fragment>
  );
};

export default CreateEvent;
