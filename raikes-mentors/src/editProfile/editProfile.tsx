import { useLocation, useNavigate } from "react-router";
import NavBar from "../components/navBar/navBar";
import SignUp from "../signUp/signUp";
import { useEffect, useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";

export default function EditProfile() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const navigate = useNavigate();

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserData = state?.userData;

    try {
      if (stateUserData && stateUserKey) {
        setUserKey(stateUserKey);
        setUserData(stateUserData);
      }
    } catch (err) {
      console.log("There was an error grabbing the user's data.");
      return;
    }
  }, [state]);

  return (
    <div className="fullScreen">
      <NavBar userKey={userKey} userData={userData} />
    </div>
  );
}
