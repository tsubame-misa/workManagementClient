import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import { useParams } from "react-router-dom";
import UserHeader from "../components/UserHeader";

function UserTrophy() {
  const params = useParams();
  const userId = params.userId ? params.userId : "";
  const data: userDict = useRecoilValue(userDictState);

  const user: user = data[userId].user;

  return (
    <div>
      <UserHeader user={user} selectedTab="trophy" />
      <div className="is-flex is-justify-content-center p-5">comming soon</div>
    </div>
  );
}

export default UserTrophy;
