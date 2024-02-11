
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/users.mts
import { config } from "dotenv";
config();
var users_default = async () => {
  const response = await fetch(
    `https://tsubame.hasura.app/api/rest/work_management/users`,
    {
      headers: {
        "x-hasura-admin-secret": process.env.HASURA
      },
      method: "GET"
    }
  );
  const data = await response.json();
  const users = data.users;
  const userProjects = await Promise.all(users.map(async (user) => {
    const response2 = await fetch(
      `https://tsubame.hasura.app/api/rest/work_management/user/projects`,
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA
        },
        method: "POST",
        body: JSON.stringify({ user_id: user.user_id })
      }
    );
    const data2 = await response2.json();
    const projects = data2.projects.sort((a, b) => b.total_seconds - a.total_seconds);
    return {
      user,
      projects
    };
  }));
  return new Response(JSON.stringify(userProjects));
};
export {
  users_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdXNlcnMubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiZG90ZW52XCI7XG5cbmNvbmZpZygpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XG4vL01FTU86XHU1RTc0XHU1RUE2XHUzMDU0XHUzMDY4XHUzMDZCXHU0RUJBXHUzMDRDXHU1OTA5XHUzMDhGXHUzMDhCXHUzMDZFXHUzMDY3XHUzMDAxXHU0RTAwXHU2NUU2XHU0RUJBXHUzMDkyXHU1M0Q2XHUzMDYzXHUzMDY2XHUzMDRCXHUzMDg5XHUzMDAxXHUzMEQ3XHUzMEVEXHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDkyXHU1RjE1XHUzMDRGXHUzMDg4XHUzMDQ2XHUzMDZCXHUzMDU3XHUzMDY2XHUzMDQ0XHUzMDhCXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vdHN1YmFtZS5oYXN1cmEuYXBwL2FwaS9yZXN0L3dvcmtfbWFuYWdlbWVudC91c2Vyc2AsXG4gICAge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIngtaGFzdXJhLWFkbWluLXNlY3JldFwiOiBwcm9jZXNzLmVudi5IQVNVUkEsXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIH1cbiAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHVzZXJzOiB1c2VyW10gPSBkYXRhLnVzZXJzO1xuXG4gICAgY29uc3QgdXNlclByb2plY3RzOiB1c2VyUHJvamVjdFtdID0gYXdhaXQgUHJvbWlzZS5hbGwodXNlcnMubWFwKGFzeW5jICh1c2VyKT0+e1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgICAgYGh0dHBzOi8vdHN1YmFtZS5oYXN1cmEuYXBwL2FwaS9yZXN0L3dvcmtfbWFuYWdlbWVudC91c2VyL3Byb2plY3RzYCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwieC1oYXN1cmEtYWRtaW4tc2VjcmV0XCI6IHByb2Nlc3MuZW52LkhBU1VSQSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcl9pZDogdXNlci51c2VyX2lkIH0pLFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdHM6cHJvamVjdFtdID0gZGF0YS5wcm9qZWN0cy5zb3J0KChhLCBiKSA9PiBiLnRvdGFsX3NlY29uZHMgLSBhLnRvdGFsX3NlY29uZHMpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdXNlcixcbiAgICAgICAgICAgIHByb2plY3RzLFxuICAgICAgICB9O1xuICAgIH0pKTtcblxuICByZXR1cm4gbmV3IFJlc3BvbnNlKEpTT04uc3RyaW5naWZ5KHVzZXJQcm9qZWN0cykpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxTQUFTLGNBQWM7QUFFdkIsT0FBTztBQUVQLElBQU8sZ0JBQVEsWUFBWTtBQUV6QixRQUFNLFdBQVcsTUFBTTtBQUFBLElBQ3JCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsU0FBUztBQUFBLFFBQ1AseUJBQXlCLFFBQVEsSUFBSTtBQUFBLE1BQ3ZDO0FBQUEsTUFDQSxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFDRSxRQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFDakMsUUFBTSxRQUFnQixLQUFLO0FBRTNCLFFBQU0sZUFBOEIsTUFBTSxRQUFRLElBQUksTUFBTSxJQUFJLE9BQU8sU0FBTztBQUMxRSxVQUFNQSxZQUFXLE1BQU07QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxRQUNFLFNBQVM7QUFBQSxVQUNQLHlCQUF5QixRQUFRLElBQUk7QUFBQSxRQUN2QztBQUFBLFFBQ0UsUUFBUTtBQUFBLFFBQ1IsTUFBTSxLQUFLLFVBQVUsRUFBRSxTQUFTLEtBQUssUUFBUSxDQUFDO0FBQUEsTUFDbEQ7QUFBQSxJQUNKO0FBQ0EsVUFBTUMsUUFBTyxNQUFNRCxVQUFTLEtBQUs7QUFFakMsVUFBTSxXQUFxQkMsTUFBSyxTQUFTLEtBQUssQ0FBQyxHQUFHLE1BQU0sRUFBRSxnQkFBZ0IsRUFBRSxhQUFhO0FBQ3pGLFdBQU87QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLElBQ0o7QUFBQSxFQUNKLENBQUMsQ0FBQztBQUVKLFNBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxZQUFZLENBQUM7QUFDbEQ7IiwKICAibmFtZXMiOiBbInJlc3BvbnNlIiwgImRhdGEiXQp9Cg==
