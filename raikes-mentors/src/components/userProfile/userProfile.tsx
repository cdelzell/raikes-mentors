import { ClassNames } from "@emotion/react";
import type { userData } from "../../firebase/dataInterfaces";

export default function UserProfile(userInfo: userData) {
  return (
    <div className="box">
      <div className="name">{userInfo.firstName}</div>
      <div className="year">{userInfo.cohort}</div>
      <div className="phone">{userInfo.phone}</div>
    </div>
  );
}
