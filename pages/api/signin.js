// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fetch from "node-fetch";

export default async function handler(req, res) {
  const HASURA_OPERATION = `
                          query MyQuery {
                            desiree_pre_signup {
                              city
                              email
                              id
                              state
                            }
                          }
                          `;

  const fetchResponse = await fetch(
    "https://desiree-pwa-app.herokuapp.com/v1/graphql",
    {
      method: "POST",
      body: JSON.stringify({
        query: HASURA_OPERATION,
      }),
    }
  );
  const data = await fetchResponse.json();
  console.log("DEBUG: ", data);
  res.status(200).json(data);
}
