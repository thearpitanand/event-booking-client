// Env
const { REACT_APP_API } = process.env;

export const fetchBooking = ({ token }) => {
  let requestBody = {
    query: `
                query {
                    bookings {
                    _id
                    event{
                        _id
                        title
                        description
                        price
                        date
                    }
                    createdAt
                    }
                }
        `,
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

export const cancelBooking = ({ bookingId, token }) => {
  let requestBody = {
    query: `
    mutation cancelBooking ( $bookingId: ID! ) {
        cancelBooking ( bookingId: $bookingId ) {
          _id
        }
      }
        `,
    variables: {
      bookingId,
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
