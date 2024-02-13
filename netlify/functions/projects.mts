import { config } from "dotenv";


config();

export default async (req: Request) => {
  console.log("req", req.body);

  // let body = {}
  // try {
  //     body = JSON.parse(event.body)
  //   } catch (e) {
  //     // body = parse(event.body)
  //     console.log("error", e);
  // }

  // console.log("body", body);

  //   // Bail if email is missing
  //   if (!body.projectsId) {
  //       console.log("GETTTTT")
  //       console.log(body.projectsId);
  //   }

  const projectIds = [55, 79, 78, 73];
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

  return new Response(JSON.stringify(works));
};
