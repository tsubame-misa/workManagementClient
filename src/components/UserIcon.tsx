import DefaultIcon from "./DefaultIcon";

type Props = {
  user: user;
};

const UserIcon = ({ user }: Props) => {
  return (
    <div>
      {user.icon ? (
        <img src={user.icon} />
      ) : (
        <DefaultIcon
          userName={user.user_name ? user.user_name : user.user_id}
        />
      )}
    </div>
  );
};

export default UserIcon;
