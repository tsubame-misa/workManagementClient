import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Project from "./pages/Project";
import User from "./pages/User";
import "bulma/css/bulma.css";

function Header() {
  return (
    <section className="hero is-warning">
      <div className="hero-body">
        <div className="container">
          <h1 className="title">header</h1>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="section has-background-warning-light">
        <div className="container">
          {/* <div className="block has-text-right">
            <button className="button is-warning is-inverted is-outlined">
              ログイン
            </button>
          </div> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:userId" element={<User />} />
            <Route
              path="/user/:userId/project/:projectId"
              element={<Project />}
            />
          </Routes>
        </div>
      </section>
    </BrowserRouter>
  );
}
export default App;
