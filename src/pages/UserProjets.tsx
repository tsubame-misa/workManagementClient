import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sum } from "../worker/worker";
import UserHeader from "../components/UserHeader";

function UserProjects() {
  const navigate = useNavigate();

  const params = useParams();
  const userId = params.userId ? params.userId : "";
  const data: userDict = useRecoilValue(userDictState);

  const user: user = data[userId].user;
  const projects: project[] = data[userId].projects;

  const totalTime = sum(projects.map((p) => p.total_seconds));

  return (
    <div>
      <UserHeader user={user} />
      <div>project</div>
    </div>
  );
}

export default UserProjects;
