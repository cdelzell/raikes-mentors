import { Link } from "react-router-dom";
import "./navBar.css";
import type { UserData } from "../../firebase/dataInterfaces";
import raikes from "../../assets/raikes.png";
import { useState } from "react";

export default function NavBar({
  userKey,
  userData,
}: {
  userKey: string;
  userData: UserData | undefined;
}) {
  const [currLocation, setCurrentLocation] = useState("");

  const handleClick = (location: string) => {
    setCurrentLocation(location);
  };

  return (
    <div className="box">
      <div className="linkWrapper">
        <Link
          to={"/profile"}
          state={{ userKey: userKey, userData: userData }}
          className={`link ${currLocation == "profile" ? "selected" : ""}`}
          onClick={() => handleClick("profile")}
        >
          profile
        </Link>
        <p></p>
        <Link
          to={"/mentors"}
          state={{ userKey: userKey, userData: userData }}
          className={`link ${currLocation == "mentors" ? "selected" : ""}`}
          onClick={() => handleClick("mentors")}
        >
          mentors
        </Link>
        <Link
          to={"/mentees"}
          state={{ userKey: userKey, userData: userData }}
          className={`link ${currLocation == "mentees" ? "selected" : ""}`}
          onClick={() => handleClick("mentees")}
        >
          mentees
        </Link>
      </div>
      <Link to={"/"} className="link">
        <img src={raikes} className="raikesImage" />
      </Link>
    </div>
  );
}
