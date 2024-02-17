import { useEffect, useState } from "react";
import StackedBarChart from "./charts/StackedBarChart";
import { convertTime, sum } from "../worker/worker";
import { useNavigate } from "react-router-dom";
import "./UserSummarizedInfo.css";
import Icon from "./Icon";

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
        {user.icon ? (
          <div className="user_icon">
            <img src={user.icon} />
          </div>
        ) : (
          <div className="user_icon">
            <Icon userName={user.user_id} />
          </div>
        )}

        <div className="total_time">{convertTime(totalTime)}</div>
      </div>

      <div style={{ width: "100%" }}>
        <StackedBarChart user={user} barData={projects} />
      </div>
    </div>
  );
};

export default UserSummarizedInfo;
