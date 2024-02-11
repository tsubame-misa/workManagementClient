
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdXNlcnMubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiZG90ZW52XCI7XG5cbmNvbmZpZygpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XG4vL01FTU86XHU1RTc0XHU1RUE2XHUzMDU0XHUzMDY4XHUzMDZCXHU0RUJBXHUzMDRDXHU1OTA5XHUzMDhGXHUzMDhCXHUzMDZFXHUzMDY3XHUzMDAxXHU0RTAwXHU2NUU2XHU0RUJBXHUzMDkyXHU1M0Q2XHUzMDYzXHUzMDY2XHUzMDRCXHUzMDg5XHUzMDAxXHUzMEQ3XHUzMEVEXHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDkyXHU1RjE1XHUzMDRGXHUzMDg4XHUzMDQ2XHUzMDZCXHUzMDU3XHUzMDY2XHUzMDQ0XHUzMDhCXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vdHN1YmFtZS5oYXN1cmEuYXBwL2FwaS9yZXN0L3dvcmtfbWFuYWdlbWVudC91c2Vyc2AsXG4gICAge1xuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIngtaGFzdXJhLWFkbWluLXNlY3JldFwiOiBwcm9jZXNzLmVudi5IQVNVUkEsXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIH1cbiAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHVzZXJzOiB1c2VyW10gPSBkYXRhLnVzZXJzO1xuXG4gICAgY29uc3QgdXNlclByb2plY3RzOiB1c2VyUHJvamVjdFtdID0gYXdhaXQgUHJvbWlzZS5hbGwodXNlcnMubWFwKGFzeW5jICh1c2VyKT0+e1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgICAgYGh0dHBzOi8vdHN1YmFtZS5oYXN1cmEuYXBwL2FwaS9yZXN0L3dvcmtfbWFuYWdlbWVudC91c2VyL3Byb2plY3RzYCxcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwieC1oYXN1cmEtYWRtaW4tc2VjcmV0XCI6IHByb2Nlc3MuZW52LkhBU1VSQSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcl9pZDogdXNlci51c2VyX2lkIH0pLFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBcbiAgICAgICAgY29uc3QgcHJvamVjdHM6cHJvamVjdCA9IGRhdGEucHJvamVjdHMuc29ydCgoYSwgYikgPT4gYi50b3RhbF9zZWNvbmRzIC0gYS50b3RhbF9zZWNvbmRzKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHVzZXIsXG4gICAgICAgICAgICBwcm9qZWN0cyxcbiAgICAgICAgfTtcbiAgICB9KSk7XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh1c2VyUHJvamVjdHMpKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7O0FBQUEsU0FBUyxjQUFjO0FBRXZCLE9BQU87QUFFUCxJQUFPLGdCQUFRLFlBQVk7QUFFekIsUUFBTSxXQUFXLE1BQU07QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxNQUNFLFNBQVM7QUFBQSxRQUNQLHlCQUF5QixRQUFRLElBQUk7QUFBQSxNQUN2QztBQUFBLE1BQ0EsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0UsUUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLFFBQU0sUUFBZ0IsS0FBSztBQUUzQixRQUFNLGVBQThCLE1BQU0sUUFBUSxJQUFJLE1BQU0sSUFBSSxPQUFPLFNBQU87QUFDMUUsVUFBTUEsWUFBVyxNQUFNO0FBQUEsTUFDbkI7QUFBQSxNQUNBO0FBQUEsUUFDRSxTQUFTO0FBQUEsVUFDUCx5QkFBeUIsUUFBUSxJQUFJO0FBQUEsUUFDdkM7QUFBQSxRQUNFLFFBQVE7QUFBQSxRQUNSLE1BQU0sS0FBSyxVQUFVLEVBQUUsU0FBUyxLQUFLLFFBQVEsQ0FBQztBQUFBLE1BQ2xEO0FBQUEsSUFDSjtBQUNBLFVBQU1DLFFBQU8sTUFBTUQsVUFBUyxLQUFLO0FBRWpDLFVBQU0sV0FBbUJDLE1BQUssU0FBUyxLQUFLLENBQUMsR0FBRyxNQUFNLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYTtBQUN2RixXQUFPO0FBQUEsTUFDSDtBQUFBLE1BQ0E7QUFBQSxJQUNKO0FBQUEsRUFDSixDQUFDLENBQUM7QUFFSixTQUFPLElBQUksU0FBUyxLQUFLLFVBQVUsWUFBWSxDQUFDO0FBQ2xEOyIsCiAgIm5hbWVzIjogWyJyZXNwb25zZSIsICJkYXRhIl0KfQo=
