import React from "react";
import Backdrop from "../Backdrop/Backdrop";

import "./Modal.css";

const Modal = (props) => (
  <React.Fragment>
    <Backdrop />
    <div className="modal">
      <header className="modal__header">
        <h1>{props.title}</h1>
      </header>
      <section className="modal__content">{props.children}</section>
      <section className="modal__actions">
        {props.canCancel && (
          <button className="modal__btn" onClick={props.onCancel}>
            Cancel
          </button>
        )}
        {props.canConfirm && (
          <button className="modal__btn" onClick={props.onConfirm}>
            Confirm
          </button>
        )}
      </section>
    </div>
  </React.Fragment>
);

export default Modal;
