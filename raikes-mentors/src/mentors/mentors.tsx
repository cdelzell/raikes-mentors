import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import { useEffect, useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";
import "./mentors.css";
import { getMenteeData, getUserData } from "../firebase/readDatabase";
import UserProfile from "../components/userProfile/userProfile";
import { addNewMentee, editUserField } from "../firebase/writeDatabase";

export default function Mentors() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const [mentors, setMentors] = useState<UserData[]>();
  const [isMentee, setIsMentee] = useState(false);

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserData = state?.userData;
    console.log(stateUserData);

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
      (async () => {
        let menteeData = await getMenteeData(userKey);
        let mentorsInfo = [] as UserData[];
        for (const i in menteeData?.mentors) {
          let mentor = await getUserData(i);
          if (mentor) {
            mentorsInfo.push(mentor);
          }
        }
        setMentors(mentorsInfo);
      })();
    }
  }, [userKey]);

  const handleSignUp = () => {
    (async () => {
      console.log(userData);
      if (userData) {
        addNewMentee(userData);
        editUserField(userKey, { mentee: true });
        setIsMentee(true);
        console.log("success!");
      }
    })();
  };

  const handleMentorConnect = () => {
    (async () => {
      if (userData) {
        addNewMentee(userData);
        setIsMentee(true);
      }
    })();
  };

  return (
    <div className="fullScreen">
      <NavBar userKey={userKey} userData={userData} />
      <div className="profileWrapper"></div>
      {mentors && mentors.map((mentor, index) => <UserProfile {...mentor} />)}
      {isMentee && !mentors && (
        <div className="menteeSignUp">
          <h2>
            You haven't connected with any mentors yet! Would you like to
            connect with one?
          </h2>
          <button onClick={handleMentorConnect}>Connect!</button>
        </div>
      )}
      {!isMentee && (
        <div className="menteeSignUp">
          <h2>
            Sign up to be a mentee! Meet with students from upper-level cohorts
            in Raikes to hear about their experiences, learn from them, and just
            get to know another person in Raikes.
          </h2>
          <button onClick={handleSignUp}>Sign up!</button>
        </div>
      )}
    </div>
  );
}
