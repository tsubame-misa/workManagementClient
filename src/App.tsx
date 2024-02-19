import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import "bulma/css/bulma.css";
import { RecoilRoot } from "recoil";
import Header from "./components/Header";
import UserTrophy from "./pages/UserTrophy";
import UserProjects from "./pages/UserProjets";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <section className="p-5">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/projects/:userId" element={<UserProjects />} />
              <Route path="/user/trophy/:userId" element={<UserTrophy />} />
              <Route
                path="/user/:userId/project/:projectId"
                element={<Project />}
              />
              {/* <Route path="*" element={ <Notfound /> } /> */}
            </Routes>
          </div>
        </section>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
