import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import { useEffect, useState } from "react";
import type { userData } from "../firebase/dataInterfaces";
import "./mentors.css";
import { getMenteeData, getUserData } from "../firebase/readDatabase";
import UserProfile from "../components/userProfile/userProfile";

export default function Mentors() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<userData>();
  const [mentors, setMentors] = useState<userData[]>();
  const [isMentee, setIsMentee] = useState(false);

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserData = state?.userData;

    try {
      if (stateUserData && stateUserKey) {
        setUserKey(stateUserKey);
        setUserData(stateUserData);
        setIsMentee(stateUserData.mentee);
      }
    } catch (err) {
      console.log("There was an error grabbing the user's data.");
      return;
    }
  }, [state]);

  useEffect(() => {
    if (userKey && userData?.mentor == true) {
      async () => {
        let menteeData = await getMenteeData(userKey);
        let mentorsInfo = [] as userData[];
        for (const i in menteeData?.mentors) {
          let mentor = await getUserData(i);
          if (mentor) {
            mentorsInfo.push(mentor);
          }
        }
        setMentors(mentorsInfo);
      };
    }
  }, [userKey]);

  return (
    <div className="fullScreen">
      <NavBar />
      <div className="profileWrapper"></div>
      {mentors && mentors.map((mentor, index) => <UserProfile {...mentor} />)}
    </div>
  );
}
