import { useEffect, useState } from "react";
import UserProjects from "../components/UserProjects";

function Home() {
  const [userData, setUserData] = useState<userProject[]>([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/.netlify/functions/users");
      const data = await response.json();
      setUserData(data);
    })();
  }, []);

  return (
    <div>
      {userData.map((d) => {
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
