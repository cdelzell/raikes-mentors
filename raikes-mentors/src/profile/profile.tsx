/*
what does this page need to do?
- have the ability for someone to sign up as a mentor
- have the ability for someone to sign up as a mentee
- have the ability to request a mentor
- have the ability to pause mentorship
- have the ability to edit profile (email, name, password)
- have the ability to see contact info of mentors/mentees
- be able to see your mentors and mentees

4 different options for a profile:
- not a mentor or mentee (Weird, not the norm)
- just a mentor
- just a mentee
- both a mentor and a mentee

Vision:
- left side navigation bar, large
- right is where the different elements will populate   
    - essentially keep the same page but load different components based on the nav state
    - or load different pages, the nav bar should be its own component
*/

import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import { useEffect, useState } from "react";
import type { userData } from "../firebase/dataInterfaces";
import "./profile.css";

export default function Profile() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<userData>();

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserProfile = state?.userProfile;

    try {
      if (stateUserProfile && stateUserKey) {
        setUserKey(stateUserKey);
        setUserData(stateUserProfile);
      }
    } catch (err) {
      console.log("There was an error grabbing the user's data.");
      return;
    }
  }, [state]);

  return (
    <div className="fullScreen">
      <NavBar />
      <div className="profileWrapper">
        <p>
          Welcome {userData?.firstName}! This is a place for connecting with
          other Raikes students across cohorts, and hopefully a place for people
          to connect!
        </p>
      </div>
    </div>
  );
}
