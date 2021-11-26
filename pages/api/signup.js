import fetch from "node-fetch";

const HASURA_OPERATION = `
mutation ($email: String!, $state: String!, $city: String!) {
  insert_desiree_pre_signup_one(object: {email: $email, state: $state, city: $city}) {
    id
  }
}
`;

// execute the parent operation in Hasura
const execute = async (variables) => {
  const fetchResponse = await fetch(
    "https://desiree-pwa-app.herokuapp.com/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: HASURA_OPERATION,
        variables,
      }),
    }
  );
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  return data;
};

export default async function handler(req, res) {
  // get request input
  const { email, state, city } = req.body.input;

  // run some business logic

  // execute the Hasura operation
  const { data, errors } = await execute({ email, state, city });

  // if Hasura operation errors, then throw error
  if (errors) {
    return res.status(400).json(errors[0]);
  }

  // success
  return res.json({
    ...data.insert_desiree_pre_signup_one,
  });
}
