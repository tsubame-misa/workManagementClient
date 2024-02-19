import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import UserIcon from "../components/UserIcon";
import { convertTime, getWorkSeoconds } from "../worker/worker";

function Project() {
  const { userId, projectId } = useParams();
  const [works, setWorks] = useState<showWork[]>([]);
  const data: userDict = useRecoilValue(userDictState);

  const user = data[userId].user;
  const project = data[userId].projects.find(
    (p: project) => p.id.toString() === projectId
  );

  useEffect(() => {
    (async () => {
      //TODO:recoilで管理
      const projectIds = [projectId];
      const response = await fetch("/.netlify/functions/projects", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectIds: projectIds }),
      });
      const data: { [name: number]: work[] } = await response.json();
      const newWorks: showWork[] = Object.values(data[Number(projectId)])
        .map((w) => {
          return {
            id: w.id,
            start_time: w.start_time,
            end_time: w.end_time,
            seconds: getWorkSeoconds(w.start_time, w.end_time),
            description: w.description ? w.description : "",
          };
        })
        .sort((a, b) => {
          const dateA = new Date(a.start_time);
          const dateB = new Date(b.start_time);
          return dateB.getTime() - dateA.getTime();
        });
      setWorks(newWorks);
    })();
  }, []);

  return (
    <div>
      <div>
        <div className="is-flex is-align-items-center">
          <div className="p-2" style={{ width: "70px" }}>
            <UserIcon user={user} />
          </div>
          <div className="is-size-4">{project.name}</div>
        </div>
        <div className="is-flex is-justify-content-center pb-5 is-size-4">
          total time&ensp;
          <span className="has-text-weight-bold" style={{ color: "#009688" }}>
            {convertTime(project.total_seconds)}
          </span>
        </div>
      </div>
      <div>
        {works.map((w) => (
          <div key={w.id}>
            {w.start_time} {w.description} {convertTime(w.seconds)}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Project;
