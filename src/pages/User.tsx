import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sum } from "../worker/worker";

function User() {
  const navigate = useNavigate();

  const params = useParams();
  const userId = params.userId ? params.userId : "";
  const data: userDict = useRecoilValue(userDictState);

  console.log("data[userId]", data);

  const user: user = data[userId].user;
  const projects: project[] = data[userId].projects;

  const totalTime = sum(projects.map((p) => p.total_seconds));

  return (
    <div>
      <div className="user" onClick={() => navigate(`/user/${user.user_id}`)}>
        <img className="user_icon" src={user.icon ? user.icon : "/vite.svg"} />
        <div className="total_time">{totalTime}</div>
      </div>
      user
    </div>
  );
}

export default User;
