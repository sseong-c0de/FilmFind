import { Link } from "react-router-dom";

function Header() {
  return (
    <div className="HeaderBar">
      <div className="Header_Logo">
        <h1>
          <Link to="/">Film Find</Link>
        </h1>
      </div>
    </div>
  );
}
export default Header;
