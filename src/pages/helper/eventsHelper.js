// Env
const { REACT_APP_API } = process.env;

export const toastInfo = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: false,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

export const eventsFetching = () => {
  let requestBody = {
    query: `
          query {
            events {
              _id
              title
              description
              price
              date
              creator {
                _id
                email
              }
            }
          }    
          `,
  };
  return fetch(REACT_APP_API, {
    method: "Post",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const createEvent = (props) => {
  const { title, description, price, date, token } = props;
  let requestBody = {
    query: `
        mutation createEvent(title: String!, $description: String!, $price: Float!, $date: String!) {
            createEvent(eventInput:{ title: $title, description: $description, price: $price, date: $date }) {
              _id
            }
          }`,
    variables: {
      title,
      description,
      price: +price,
      date,
    },
  };
  return fetch(REACT_APP_API, {
    method: "Post",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};

export const bookEventHelper = (props) => {
  const { eventId, token } = props;
  let requestBody = {
    query: `
        mutation bookEvent( $eventId : ID! ){
            bookEvent( eventId: $eventId ){
            _id
            event {
                title
              }
            }
        }`,
    variables: {
      eventId: eventId,
    },
  };
  return fetch(REACT_APP_API, {
    method: "Post",
    body: JSON.stringify(requestBody),
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed!");
      }
      return res.json();
    })
    .catch((err) => console.log(err));
};
