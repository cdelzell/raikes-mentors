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
          Cohort: <span style={{ color: "crimson" }}>{userInfo.cohort}</span>
        </div>
        <div className="phone">
          Phone: <span style={{ color: "crimson" }}>{userInfo.phone}</span>
        </div>
        <div className="phone">
          Email: <span style={{ color: "crimson" }}>{userInfo.email}</span>
        </div>
      </div>
    </div>
  );
}
