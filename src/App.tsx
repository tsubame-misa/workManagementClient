import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import User from "./pages/User";
import "bulma/css/bulma.css";
import { RecoilRoot } from "recoil";
import Header from "./components/Header";

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Header />
        <section className="section">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/user/projects/:userId" element={<User />} />
              <Route path="/user/trophy/:userId" element={<User />} />
              <Route path="/project/:projectId" element={<Project />} />
              {/* <Route path="*" element={ <Notfound /> } /> */}
            </Routes>
          </div>
        </section>
      </BrowserRouter>
    </RecoilRoot>
  );
}
export default App;
