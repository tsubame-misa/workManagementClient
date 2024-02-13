import { useEffect, useState } from "react";
import StackedBarChart from "./charts/StackedBarChart";
import { convertTime, sum } from "../worker/worker";
import { useNavigate } from "react-router-dom";
import "./UserProjects.css";

type Props = {
  user: user;
  projects: project[];
};

const UserProjects = ({ user, projects }: Props) => {
  const navigate = useNavigate();
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    const total = sum(projects.map((p) => p.total_seconds));
    setTotalTime(total);
  }, []);

  return (
    <div className="user_projects">
      <div className="user" onClick={() => navigate(`/user/${user.user_id}`)}>
        <img className="user_icon" src={user.icon ? user.icon : "/vite.svg"} />
        <div className="total_time">{convertTime(totalTime)}</div>
      </div>

      <div style={{ width: "100%" }}>
        <StackedBarChart user={user} projects={projects} />
      </div>
    </div>
  );
};

export default UserProjects;
