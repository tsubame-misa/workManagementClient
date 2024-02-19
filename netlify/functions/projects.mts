 // @ts-ignore
import { HandlerEvent } from "@netlify/functions";
import { config } from "dotenv";

config();

exports.handler = async function (event:HandlerEvent) {
  const body = JSON.parse(event.body);
  const projectIds = body.projectIds;
  const works = {};
  for (const p of projectIds) {
    const response = await fetch(
      `https://tsubame.hasura.app/api/rest/work_management/users/projects/work`,
      {
        // @ts-ignore
        headers: {
          "x-hasura-admin-secret": process.env.HASURA,
        },
        method: "POST",
        body: JSON.stringify({ project_id: p }),
      }
    );
    const data = await response.json();
    // @ts-ignore
    works[p.toString()] = data.works;
  }  

  return {
    headers: {
        "content-type": "application/json",
      },
  statusCode: 200,

  body: JSON.stringify(works),
};
};
