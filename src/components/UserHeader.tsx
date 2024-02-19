import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserHeader.css";
import UserIcon from "./UserIcon";

type Props = {
  user: user;
  selectedTab: string;
};

const UserHeader = ({ user, selectedTab }: Props) => {
  const navigate = useNavigate();
  const [active, setActive] = useState(selectedTab);

  return (
    <div>
      <div className="user_header_info section pt-0 pb-2">
        <div style={{ width: "80px" }}>
          <UserIcon user={user} />
        </div>
        <div className="user_name">{user.user_name}</div>
      </div>

      <div className="tabs is-centered">
        <ul>
          {/* @ts-ignore */}
          <li className={active === "projects" && "is-active"}>
            <a
              onClick={() => {
                setActive("projects");
                navigate(`/user/projects/${user.id}`);
              }}
            >
              Project
            </a>
          </li>
          {/* @ts-ignore */}
          <li className={active === "trophy" && "is-active"}>
            <a
              onClick={() => {
                setActive("trophy");
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
};

export default UserHeader;
