import { useRecoilValue } from "recoil";
import { userDictState } from "../atoms/user";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { sum } from "../worker/worker";
import { useState } from "react";
import UserHeader from "../components/UserHeader";

function UserTrophy() {
  const params = useParams();
  const userId = params.userId ? params.userId : "";
  const data: userDict = useRecoilValue(userDictState);

  const user: user = data[userId].user;
  const projects: project[] = data[userId].projects;

  return (
    <div>
      <UserHeader user={user} selectedTab="trophy" />
      <div>trophy</div>
    </div>
  );
}

export default UserTrophy;
