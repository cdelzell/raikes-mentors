import type { UserData } from "../../firebase/dataInterfaces";
import "./userProfile.css";
export default function UserProfile(userInfo: UserData) {
  return (
    <div className="holder">
      <div className="textStyling">
        <h3 className="name">
          {userInfo.firstName} {userInfo.lastName}
        </h3>
        <div className="year">
          Cohort: <span style={{ color: "#d00000" }}>{userInfo.cohort}</span>
        </div>
        <div className="phone">
          Phone: <span style={{ color: "#d00000" }}>{userInfo.phone}</span>
        </div>
        <div className="phone">
          Email: <span style={{ color: "#d00000" }}>{userInfo.email}</span>
        </div>
        {/* <button>Contact me!</button> */}
      </div>
    </div>
  );
}
