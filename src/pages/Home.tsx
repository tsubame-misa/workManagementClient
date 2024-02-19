import { useEffect } from "react";
import UserSummarizedInfo from "../components/UserSummarizedInfo";
import { useRecoilState } from "recoil";
import { userDictState } from "../atoms/user";
import { sum } from "../worker/worker";

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
      {Object.values(userData)
        .sort(
          (a, b) =>
            sum(b.projects.map((p) => p.total_seconds)) -
            sum(a.projects.map((p) => p.total_seconds))
        )
        .map((d) => {
          return (
            <UserSummarizedInfo
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
