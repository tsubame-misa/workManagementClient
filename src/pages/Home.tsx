import { useEffect } from "react";
import UserProjects from "../components/UserProjects";
import { useRecoilState } from "recoil";
import { userDictState } from "../atoms/user";

function Home() {
  const [userData, setUserData] = useRecoilState<userDict>(userDictState);

  useEffect(() => {
    (async () => {
      const response = await fetch("/.netlify/functions/users");
      const data = await response.json();
      const userDict: userDict = {};
      for (const d of data) {
        userDict[d.user.id] = d;
      }
      setUserData(userDict);
    })();
  }, []);

  return (
    <div>
      {Object.values(userData).map((d) => {
        return (
          <UserProjects
            user={d.user}
            projects={d.projects}
            key={d.user.user_id}
          />
        );
      })}
    </div>
  );
}

export default Home;
