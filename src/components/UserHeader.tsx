import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./UserHeader.css";

type Props = {
  user: user;
};

const UserHeader = ({ user }: Props) => {
  const navigate = useNavigate();
  const [active, setActive] = useState("pictures");

  return (
    <div>
      <div className="user_header_info section pt-0">
        <img className="user_icon" src={user.icon ? user.icon : "/vite.svg"} />
        <div className="user_name">{user.user_name}</div>
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
};

export default UserHeader;
