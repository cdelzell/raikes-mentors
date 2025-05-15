import { Link } from "react-router-dom";
import "./navBar.css";
import type { UserData } from "../../firebase/dataInterfaces";
import raikes from "../../assets/raikes.png";

export default function NavBar({
  userKey,
  userData,
}: {
  userKey: string;
  userData: UserData | undefined;
}) {
  return (
    <div className="box">
      <div className="linkWrapper">
        <Link
          to={"/profile"}
          state={{ userKey: userKey, userData: userData }}
          className="link"
        >
          profile
        </Link>
        <p></p>
        <Link
          to={"/mentors"}
          state={{ userKey: userKey, userData: userData }}
          className="link"
        >
          mentors
        </Link>
        <Link
          to={"/mentees"}
          state={{ userKey: userKey, userData: userData }}
          className="link"
        >
          mentees
        </Link>
      </div>
      <img src={raikes} className="raikesImage" />
    </div>
  );
}
