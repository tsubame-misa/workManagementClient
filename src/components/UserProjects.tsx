import { useEffect, useState } from "react";
import StackedBarChart from "./charts/StackedBarChart";
import { convertTime } from "../worker/worker";
import "./UserProjects.css";

type Props = {
  user: user;
  projects: project[];
};

const UserProjects = ({ user, projects }: Props) => {
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    const total = projects.reduce(function (sum, p) {
      return sum + p.total_seconds;
    }, 0);
    setTotalTime(total);
  }, []);

  return (
    <div className="user_projects">
      <div>
        <img
          style={{ width: "50px" }}
          src={user.icon ? user.icon : "/vite.svg"}
        />
      </div>
      <div className="total_time">{convertTime(totalTime)}</div>
      <div style={{ width: "100%" }}>
        <StackedBarChart projects={projects} totalTime={totalTime} />
      </div>
    </div>
  );
};

export default UserProjects;
