import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Project from "./pages/Project";
import User from "./pages/User";
import "bulma/css/bulma.css";

function Header() {
  return (
    <section className="hero header">
      <div className="hero-body">
        <div className="container">
          <h1 className="title has-text-white">header</h1>
        </div>
      </div>
    </section>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Header />
      <section className="section">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user/:userId" element={<User />} />
            <Route path="/project/:projectId" element={<Project />} />
            {/* <Route path="*" element={ <Notfound /> } /> */}
          </Routes>
        </div>
      </section>
    </BrowserRouter>
  );
}
export default App;
