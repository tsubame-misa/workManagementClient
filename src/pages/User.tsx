import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { convertTime, sum } from "../worker/worker";
import { useState } from "react";

function User() {
  const navigate = useNavigate();

  const params = useParams();
  const userId = params.userId ? params.userId : "";
  const data: userDict = useRecoilValue(userDictState);

  const user: user = data[userId].user;
  const projects: project[] = data[userId].projects;

  const totalTime = sum(projects.map((p) => p.total_seconds));
  const [active, setActive] = useState("pictures");

  return (
    <div>
      <div className="user">
        <img className="user_icon" src={user.icon ? user.icon : "/vite.svg"} />
        <div className="total_time">{convertTime(totalTime)}</div>
      </div>

      <div className="tabs is-centered">
        <ul>
          <li className={active === "pictures" && "is-active"}>
            <a
              onClick={() => {
                setActive("pictures");
                navigate(`/user/projects/${user.id}`);
              }}
            >
              Project
            </a>
          </li>
          <li className={active === "music" && "is-active"}>
            <a
              onClick={() => {
                setActive("music");
                navigate(`/user/trophy/${user.id}`);
              }}
            >
              Trophy
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default User;
