// Env
const { REACT_APP_API } = process.env;

export const authentication = ({ email, password, isLogin }) => {
  let requestBody;
  if (isLogin) {
    // Sign In
    requestBody = {
      query: `
      query login( $email: String!, $password: String!){
        login( email: $email, password: $password ) {
          userId
          token
          tokenExpiration
        }
      }
      `,
      variables: {
        email,
        password,
      },
    };
  } else {
    // Sign Up
    requestBody = {
      query: `
        mutation createUser( $email: String!, $password: String!){
            createUser( userInput: {email: $email, password: $password} ) {
            _id
            email
          }
        }
        `,
      variables: {
        email,
        password,
      },
    };
  }

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
