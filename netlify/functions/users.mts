import { config } from "dotenv";

config();

export default async () => {
//MEMO:年度ごとに人が変わるので、一旦人を取ってから、プロジェクトを引くようにしている
  const response = await fetch(
    `https://tsubame.hasura.app/api/rest/work_management/users`,
    {
      // @ts-ignore
      headers: {
        "x-hasura-admin-secret": process.env.HASURA,
      },
      method: "GET",
    }
  );
    const data = await response.json();
    const users: user[] = data.users;

    const userProjects: userProject[] = await Promise.all(users.map(async (user)=>{
        const response = await fetch(
            `https://tsubame.hasura.app/api/rest/work_management/user/projects`,
          {
              // @ts-ignore
              headers: {
                "x-hasura-admin-secret": process.env.HASURA,
              },
                method: "POST",
                body: JSON.stringify({ user_id: user.user_id }),
            }
        );
        const data = await response.json();
        
      const projects: project[]
        = data.projects.sort((a: project, b: project) => b.total_seconds - a.total_seconds);
        return {
            user,
            projects,
        };
    }));

  return new Response(JSON.stringify(userProjects));
};
