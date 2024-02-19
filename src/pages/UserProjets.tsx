import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import { useNavigate, useParams } from "react-router-dom";
import { convertTime, sum } from "../worker/worker";
import UserHeader from "../components/UserHeader";
import { useEffect, useState } from "react";
import StackedBarChart from "../components/charts/StackedBarChart";

function UserProjects() {
  const navigate = useNavigate();
  const [sortedProject, setSortedProject] = useState<project[] | null>(null);

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
      const data: { [name: number]: work[] } = await response.json();

      const sortedNewProjects: project[] = projects
        .map((p) => {
          return { ...p, works: data[p.id] };
        })
        .sort((a, b) => b.total_seconds - a.total_seconds);
      setSortedProject(sortedNewProjects);
    })();
  }, []);

  const totalTime = sum(projects.map((p) => p.total_seconds));

  function convertBarData(works: work[]): barData[] {
    return works.map((w: work) => {
      const start = new Date(w.start_time);
      const end = new Date(w.end_time);
      return {
        id: w.id,
        name: w.description ?? "",
        total_seconds: end.getTime() / 1000 - start.getTime() / 1000,
      };
    });
  }

  return (
    <div>
      <UserHeader user={user} selectedTab="projects" />
      <div>
        {sortedProject && (
          <div className="is-flex is-justify-content-center p-5 is-size-4">
            total &ensp;
            <span className="has-text-weight-bold" style={{ color: "#009688" }}>
              {convertTime(totalTime)}
            </span>
          </div>
        )}
        <div>
          {!sortedProject ? (
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
            sortedProject.map((v) => {
              return (
                <div
                  className="is-flex has-justify-content-cneter is-align-items-center pt-3 pb-3"
                  key={v.id}
                  onClick={() => navigate(`/user/${user.id}/project/${v.id}`)}
                  style={{ cursor: "pointer" }}
                >
                  <div
                    className="is-flex has-justify-content-cneter"
                    style={{
                      width: "120px",
                      textAlign: "center",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {v.name}
                  </div>
                  <div
                    style={{
                      width: "120px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    {convertTime(v.total_seconds)}
                  </div>
                  <div style={{ width: "100%" }}>
                    {v.works && (
                      <div>
                        <StackedBarChart
                          user={user}
                          barData={convertBarData(v.works)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProjects;
