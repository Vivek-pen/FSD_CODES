import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <Link to="/" style={{ margin: "10px" }}>Home</Link>
      <Link to="/register" style={{ margin: "10px" }}>Register</Link>
      <Link to="/login" style={{ margin: "10px" }}>Login</Link>
      <Link to="/about" style={{ margin: "10px" }}>About</Link>
      <Link to="/contact" style={{ margin: "10px" }}>Contact</Link>
    </nav>
  );
}
