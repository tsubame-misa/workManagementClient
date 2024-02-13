import { useRecoilState, useRecoilValue } from "recoil";
import { userDictState, workState } from "../atoms/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { convertTime, sum } from "../worker/worker";
import UserHeader from "../components/UserHeader";
import { useEffect, useState } from "react";

function UserProjects() {
  const navigate = useNavigate();
  //   const [userProject, setUserProject] = useRecoilState<projectDict>(workState);
  const [sortedProject, setSortedProject] = useState<project[]>([]);

  const params = useParams();
  const userId = params.userId ? params.userId : "";
  const data: userDict = useRecoilValue(userDictState);

  const user: user = data[userId].user;
  const projects: project[] = data[userId].projects;

  useEffect(() => {
    (async () => {
      const projectIds: number[] = projects.map((p) => p.id);

      const response = await fetch("/.netlify/functions/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectIds: projectIds }),
      });
      const data = await response.json();

      const sortedNewProjects = projects
        .map((p) => {
          return { ...p, works: data[p.id] };
        })
        .sort((a, b) => b.total_seconds - a.total_seconds);
      setSortedProject(sortedNewProjects);

      //   const projectDict = {};
      //   for (let i = 0; i < sortedNewProjects.length; i++) {
      //     const p = sortedNewProjects[i];
      //     projectDict[p.id] = p;
      //   }
      //   setUserProject(projectDict);
    })();
  }, []);

  //   console.log(userProject);

  const totalTime = sum(projects.map((p) => p.total_seconds));

  return (
    <div>
      <UserHeader user={user} selectedTab="projects" />

      <div>
        <div>total time : {convertTime(totalTime)}</div>
        <div>
          {sortedProject.map((v) => {
            return (
              <div>
                <div>{v.name}</div>
                <div>{convertTime(v.total_seconds)}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default UserProjects;
