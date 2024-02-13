
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
      // @ts-ignore
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
        // @ts-ignore
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvdXNlcnMubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiZG90ZW52XCI7XG5cbmNvbmZpZygpO1xuXG5leHBvcnQgZGVmYXVsdCBhc3luYyAoKSA9PiB7XG4vL01FTU86XHU1RTc0XHU1RUE2XHUzMDU0XHUzMDY4XHUzMDZCXHU0RUJBXHUzMDRDXHU1OTA5XHUzMDhGXHUzMDhCXHUzMDZFXHUzMDY3XHUzMDAxXHU0RTAwXHU2NUU2XHU0RUJBXHUzMDkyXHU1M0Q2XHUzMDYzXHUzMDY2XHUzMDRCXHUzMDg5XHUzMDAxXHUzMEQ3XHUzMEVEXHUzMEI4XHUzMEE3XHUzMEFGXHUzMEM4XHUzMDkyXHU1RjE1XHUzMDRGXHUzMDg4XHUzMDQ2XHUzMDZCXHUzMDU3XHUzMDY2XHUzMDQ0XHUzMDhCXG4gIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgYGh0dHBzOi8vdHN1YmFtZS5oYXN1cmEuYXBwL2FwaS9yZXN0L3dvcmtfbWFuYWdlbWVudC91c2Vyc2AsXG4gICAge1xuICAgICAgLy8gQHRzLWlnbm9yZVxuICAgICAgaGVhZGVyczoge1xuICAgICAgICBcIngtaGFzdXJhLWFkbWluLXNlY3JldFwiOiBwcm9jZXNzLmVudi5IQVNVUkEsXG4gICAgICB9LFxuICAgICAgbWV0aG9kOiBcIkdFVFwiLFxuICAgIH1cbiAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIGNvbnN0IHVzZXJzOiB1c2VyW10gPSBkYXRhLnVzZXJzO1xuXG4gICAgY29uc3QgdXNlclByb2plY3RzOiB1c2VyUHJvamVjdFtdID0gYXdhaXQgUHJvbWlzZS5hbGwodXNlcnMubWFwKGFzeW5jICh1c2VyKT0+e1xuICAgICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IGZldGNoKFxuICAgICAgICAgICAgYGh0dHBzOi8vdHN1YmFtZS5oYXN1cmEuYXBwL2FwaS9yZXN0L3dvcmtfbWFuYWdlbWVudC91c2VyL3Byb2plY3RzYCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICAgICAgIFwieC1oYXN1cmEtYWRtaW4tc2VjcmV0XCI6IHByb2Nlc3MuZW52LkhBU1VSQSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdXNlcl9pZDogdXNlci51c2VyX2lkIH0pLFxuICAgICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgICBcbiAgICAgIGNvbnN0IHByb2plY3RzOiBwcm9qZWN0W11cbiAgICAgICAgPSBkYXRhLnByb2plY3RzLnNvcnQoKGE6IHByb2plY3QsIGI6IHByb2plY3QpID0+IGIudG90YWxfc2Vjb25kcyAtIGEudG90YWxfc2Vjb25kcyk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB1c2VyLFxuICAgICAgICAgICAgcHJvamVjdHMsXG4gICAgICAgIH07XG4gICAgfSkpO1xuXG4gIHJldHVybiBuZXcgUmVzcG9uc2UoSlNPTi5zdHJpbmdpZnkodXNlclByb2plY3RzKSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7OztBQUFBLFNBQVMsY0FBYztBQUV2QixPQUFPO0FBRVAsSUFBTyxnQkFBUSxZQUFZO0FBRXpCLFFBQU0sV0FBVyxNQUFNO0FBQUEsSUFDckI7QUFBQSxJQUNBO0FBQUE7QUFBQSxNQUVFLFNBQVM7QUFBQSxRQUNQLHlCQUF5QixRQUFRLElBQUk7QUFBQSxNQUN2QztBQUFBLE1BQ0EsUUFBUTtBQUFBLElBQ1Y7QUFBQSxFQUNGO0FBQ0UsUUFBTSxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQ2pDLFFBQU0sUUFBZ0IsS0FBSztBQUUzQixRQUFNLGVBQThCLE1BQU0sUUFBUSxJQUFJLE1BQU0sSUFBSSxPQUFPLFNBQU87QUFDMUUsVUFBTUEsWUFBVyxNQUFNO0FBQUEsTUFDbkI7QUFBQSxNQUNGO0FBQUE7QUFBQSxRQUVJLFNBQVM7QUFBQSxVQUNQLHlCQUF5QixRQUFRLElBQUk7QUFBQSxRQUN2QztBQUFBLFFBQ0UsUUFBUTtBQUFBLFFBQ1IsTUFBTSxLQUFLLFVBQVUsRUFBRSxTQUFTLEtBQUssUUFBUSxDQUFDO0FBQUEsTUFDbEQ7QUFBQSxJQUNKO0FBQ0EsVUFBTUMsUUFBTyxNQUFNRCxVQUFTLEtBQUs7QUFFbkMsVUFBTSxXQUNGQyxNQUFLLFNBQVMsS0FBSyxDQUFDLEdBQVksTUFBZSxFQUFFLGdCQUFnQixFQUFFLGFBQWE7QUFDbEYsV0FBTztBQUFBLE1BQ0g7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLEVBQ0osQ0FBQyxDQUFDO0FBRUosU0FBTyxJQUFJLFNBQVMsS0FBSyxVQUFVLFlBQVksQ0FBQztBQUNsRDsiLAogICJuYW1lcyI6IFsicmVzcG9uc2UiLCAiZGF0YSJdCn0K
