import { Link } from "react-router-dom";
import "./navBar.css";
export default function NavBar() {
  return (
    <div className="box">
      <div className="linkWrapper">
        <Link to={""} className="link">
          profile
        </Link>
        <p></p>
        <Link to={""} className="link">
          mentors
        </Link>
        <Link to={""} className="link">
          mentees
        </Link>
      </div>
    </div>
  );
}
