import { useEffect, useState } from "react";
import StackedBarChart from "./charts/StackedBarChart";
import { convertTime } from "../worker/worker";

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
    <div style={{ padding: "10px" }}>
      <div>
        <img
          style={{ width: "50px" }}
          src={user.icon ? user.icon : "/vite.svg"}
        />
      </div>
      <div>{convertTime(totalTime)}</div>
      <StackedBarChart projects={projects} totalTime={totalTime} />
    </div>
  );
};

export default UserProjects;
