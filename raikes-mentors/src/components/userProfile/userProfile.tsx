import { ClassNames } from "@emotion/react";
import type { UserData } from "../../firebase/dataInterfaces";

export default function UserProfile(userInfo: UserData) {
  return (
    <div className="box">
      <div className="name">{userInfo.firstName}</div>
      <div className="year">{userInfo.cohort}</div>
      <div className="phone">{userInfo.phone}</div>
    </div>
  );
}
