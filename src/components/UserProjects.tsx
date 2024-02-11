import { useEffect, useState } from "react";

type Props = {
  user: user;
  projects: project[];
};

const UserProjects = ({ user, projects }: Props) => {
  const [totalTime, setTotalTime] = useState<number>(0);
  const [barData, setBarData] = useState([]);

  useEffect(() => {
    const total = projects.reduce(function (sum, p) {
      return sum + p.total_seconds;
    }, 0);
    setTotalTime(total);
  });

  function convertTime(seconds: number): string {
    const m = seconds / 60;
    return Math.floor(m / 60) + " h " + Math.floor(m % 60) + " m";
  }

  return (
    <div style={{ padding: "10px" }}>
      <div>
        <img
          style={{ width: "50px" }}
          src={user.icon ? user.icon : "/vite.svg"}
        />
      </div>
      <div>{convertTime(totalTime)}</div>
      {projects.map((p) => {
        return (
          <div>
            {p.name}, {p.total_seconds}
          </div>
        );
      })}
    </div>
  );
};

export default UserProjects;
