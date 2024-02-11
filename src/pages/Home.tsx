import { useEffect, useState } from "react";

function Home() {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    (async () => {
      const response = await fetch("/.netlify/functions/users");
      const data = await response.json();
      setUserData(data);
    })();
  }, []);

  console.log(userData);

  return <div>home</div>;
}

export default Home;
