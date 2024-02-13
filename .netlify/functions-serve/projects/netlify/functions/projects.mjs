
import {createRequire as ___nfyCreateRequire} from "module";
import {fileURLToPath as ___nfyFileURLToPath} from "url";
import {dirname as ___nfyPathDirname} from "path";
let __filename=___nfyFileURLToPath(import.meta.url);
let __dirname=___nfyPathDirname(___nfyFileURLToPath(import.meta.url));
let require=___nfyCreateRequire(import.meta.url);


// netlify/functions/projects.mts
import { config } from "dotenv";
config();
var projects_default = async (req, context) => {
  console.log("req", req.body);
  const projectIds = [55, 79, 78, 73];
  const works = {};
  for (const p of projectIds) {
    const response = await fetch(
      `https://tsubame.hasura.app/api/rest/work_management/users/projects/work`,
      {
        headers: {
          "x-hasura-admin-secret": process.env.HASURA
        },
        method: "POST",
        body: JSON.stringify({ project_id: p })
      }
    );
    const data = await response.json();
    works[p.toString()] = data.works;
  }
  return new Response(JSON.stringify(works));
};
export {
  projects_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibmV0bGlmeS9mdW5jdGlvbnMvcHJvamVjdHMubXRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBjb25maWcgfSBmcm9tIFwiZG90ZW52XCI7XG4vLyBpbXBvcnQgeyBIYW5kbGVyRXZlbnQgfSBmcm9tIFwiQG5ldGxpZnkvZnVuY3Rpb25zXCI7XG5pbXBvcnQgdHlwZSB7IENvbnRleHQgfSBmcm9tIFwiQG5ldGxpZnkvZnVuY3Rpb25zXCJcblxuY29uZmlnKCk7XG5cbmV4cG9ydCBkZWZhdWx0IGFzeW5jIChyZXE6IFJlcXVlc3QsIGNvbnRleHQ6IENvbnRleHQpID0+IHtcbiAgY29uc29sZS5sb2coXCJyZXFcIiwgcmVxLmJvZHkpO1xuXG4gIC8vIGxldCBib2R5ID0ge31cbiAgLy8gdHJ5IHtcbiAgLy8gICAgIGJvZHkgPSBKU09OLnBhcnNlKGV2ZW50LmJvZHkpXG4gIC8vICAgfSBjYXRjaCAoZSkge1xuICAvLyAgICAgLy8gYm9keSA9IHBhcnNlKGV2ZW50LmJvZHkpXG4gIC8vICAgICBjb25zb2xlLmxvZyhcImVycm9yXCIsIGUpO1xuICAvLyB9XG5cbiAgLy8gY29uc29sZS5sb2coXCJib2R5XCIsIGJvZHkpO1xuXG4gIC8vICAgLy8gQmFpbCBpZiBlbWFpbCBpcyBtaXNzaW5nXG4gIC8vICAgaWYgKCFib2R5LnByb2plY3RzSWQpIHtcbiAgLy8gICAgICAgY29uc29sZS5sb2coXCJHRVRUVFRUXCIpXG4gIC8vICAgICAgIGNvbnNvbGUubG9nKGJvZHkucHJvamVjdHNJZCk7XG4gIC8vICAgfVxuXG4gIGNvbnN0IHByb2plY3RJZHMgPSBbNTUsIDc5LCA3OCwgNzNdO1xuICBjb25zdCB3b3JrcyA9IHt9O1xuICBmb3IgKGNvbnN0IHAgb2YgcHJvamVjdElkcykge1xuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goXG4gICAgICBgaHR0cHM6Ly90c3ViYW1lLmhhc3VyYS5hcHAvYXBpL3Jlc3Qvd29ya19tYW5hZ2VtZW50L3VzZXJzL3Byb2plY3RzL3dvcmtgLFxuICAgICAge1xuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgXCJ4LWhhc3VyYS1hZG1pbi1zZWNyZXRcIjogcHJvY2Vzcy5lbnYuSEFTVVJBLFxuICAgICAgICB9LFxuICAgICAgICBtZXRob2Q6IFwiUE9TVFwiLFxuICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHByb2plY3RfaWQ6IHAgfSksXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIHdvcmtzW3AudG9TdHJpbmcoKV0gPSBkYXRhLndvcmtzO1xuICB9XG5cbiAgcmV0dXJuIG5ldyBSZXNwb25zZShKU09OLnN0cmluZ2lmeSh3b3JrcykpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7QUFBQSxTQUFTLGNBQWM7QUFJdkIsT0FBTztBQUVQLElBQU8sbUJBQVEsT0FBTyxLQUFjLFlBQXFCO0FBQ3ZELFVBQVEsSUFBSSxPQUFPLElBQUksSUFBSTtBQWtCM0IsUUFBTSxhQUFhLENBQUMsSUFBSSxJQUFJLElBQUksRUFBRTtBQUNsQyxRQUFNLFFBQVEsQ0FBQztBQUNmLGFBQVcsS0FBSyxZQUFZO0FBQzFCLFVBQU0sV0FBVyxNQUFNO0FBQUEsTUFDckI7QUFBQSxNQUNBO0FBQUEsUUFDRSxTQUFTO0FBQUEsVUFDUCx5QkFBeUIsUUFBUSxJQUFJO0FBQUEsUUFDdkM7QUFBQSxRQUNBLFFBQVE7QUFBQSxRQUNSLE1BQU0sS0FBSyxVQUFVLEVBQUUsWUFBWSxFQUFFLENBQUM7QUFBQSxNQUN4QztBQUFBLElBQ0Y7QUFDQSxVQUFNLE9BQU8sTUFBTSxTQUFTLEtBQUs7QUFDakMsVUFBTSxFQUFFLFNBQVMsQ0FBQyxJQUFJLEtBQUs7QUFBQSxFQUM3QjtBQUVBLFNBQU8sSUFBSSxTQUFTLEtBQUssVUFBVSxLQUFLLENBQUM7QUFDM0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
