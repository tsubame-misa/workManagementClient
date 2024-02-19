import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import UserIcon from "../components/UserIcon";
import {
  convertDateString,
  convertTime,
  getWorkSeoconds,
} from "../worker/worker";

function Project() {
  const { userId, projectId } = useParams();
  const [works, setWorks] = useState<showWork[] | null>(null);
  const data: userDict = useRecoilValue(userDictState);

  const user = data[userId ?? ""].user;
  const project = data[userId ?? ""].projects.find(
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
        <div className="is-flex is-align-items-center is-justify-content-center">
          <div className="p-1" style={{ width: "70px" }}>
            <UserIcon user={user} />
          </div>
          <div className="is-size-3">{project?.name}</div>
        </div>
        <div className="is-flex is-justify-content-center pt-2 pb-5 is-size-4">
          total &ensp;
          <span className="has-text-weight-bold" style={{ color: "#009688" }}>
            {convertTime(project?.total_seconds ?? 0)}
          </span>
        </div>
      </div>
      {!works ? (
        <div className="is-flex is-flex-direction-column is-align-items-center p-5">
          <div className="p-5">loading...</div>
          <div style={{ width: "50vw" }}>
            <progress
              className="progress is-small is-link"
              max="100"
            ></progress>
          </div>
        </div>
      ) : (
        <div className="is-flex is-justify-content-center">
          <table className="table">
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th style={{ minWidth: "50vw" }}>Description</th>
              </tr>
            </thead>
            {works.length > 10 && (
              <tfoot>
                <tr>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Description</th>
                </tr>
              </tfoot>
            )}
            <tbody>
              {works.map((w) => (
                <tr key={w.id}>
                  <td> {convertDateString(w.start_time)} </td>
                  <td>{convertTime(w.seconds)}</td>
                  <td>{w.description} </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Project;
