import { useEffect, useState } from "react";
import StackedBarChart from "./charts/StackedBarChart";
import { convertTime, sum } from "../worker/worker";
import { useNavigate } from "react-router-dom";
import "./UserSummarizedInfo.css";
import UserIcon from "./UserIcon";

type Props = {
  user: user;
  projects: project[];
};

const UserSummarizedInfo = ({ user, projects }: Props) => {
  const navigate = useNavigate();
  const [totalTime, setTotalTime] = useState<number>(0);

  useEffect(() => {
    const total = sum(projects.map((p) => p.total_seconds));
    setTotalTime(total);
  }, []);

  return (
    <div className="user_projects">
      <div
        className="user"
        onClick={() => navigate(`/user/projects/${user.id}`)}
      >
        <div style={{ width: "50px" }}>
          <UserIcon user={user} />
        </div>

        <div className="total_time">{convertTime(totalTime)}</div>
      </div>

      <div style={{ width: "100%" }}>
        <StackedBarChart user={user} barData={projects} />
      </div>
    </div>
  );
};

export default UserSummarizedInfo;
