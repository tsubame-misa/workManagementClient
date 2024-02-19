import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  return (
    <section className="hero header">
      <div className="hero-body">
        <div className="container">
          <h1
            className="title has-text-white"
            style={{ width: "fit-content" }}
            onClick={() => navigate("/")}
          >
            Work Management
          </h1>
        </div>
      </div>
    </section>
  );
}

export default Header;
