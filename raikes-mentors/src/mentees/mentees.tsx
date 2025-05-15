import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import { useEffect, useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";
import "./mentees.css";
import {
  getMenteeData,
  getMentorData,
  getNewMentor,
  getUserData,
} from "../firebase/readDatabase";
import UserProfile from "../components/userProfile/userProfile";
import {
  addNewMentee,
  addNewMentor,
  editUserField,
} from "../firebase/writeDatabase";

export default function Mentees() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const [mentees, setMentees] = useState<UserData[]>();
  const [isMentor, setIsMentor] = useState(false);

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserData = state?.userData;
    console.log(stateUserData);

    try {
      if (stateUserData && stateUserKey) {
        setUserKey(stateUserKey);
        setUserData(stateUserData);
        setIsMentor(stateUserData.mentor);
      }
    } catch (err) {
      console.log("There was an error grabbing the user's data.");
      return;
    }
  }, [state]);

  useEffect(() => {
    if (userKey && userData?.mentor == true) {
      (async () => {
        let menteeData = await getMentorData(userKey);
        let menteesInfo = [] as UserData[];
        for (const i in menteeData?.mentees) {
          let mentee = await getUserData(i);
          if (mentee) {
            menteesInfo.push(mentee);
          }
        }
        setMentees(menteesInfo);
      })();
    }
  }, [userKey]);

  const handleSignUp = () => {
    (async () => {
      console.log(userData);
      if (userData) {
        addNewMentor(userData);
        editUserField(userKey, { mentor: true });
        setIsMentor(true);
        console.log("success!");
      }
    })();
  };

  return (
    <div className="fullScreen">
      <NavBar userKey={userKey} userData={userData} />
      <div className="profileWrapper"></div>
      {mentees && mentees.map((mentee, index) => <UserProfile {...mentee} />)}
      {mentees?.length == 0 && (
        <div className="menteeSignUp empty">No mentees yet!</div>
      )}
      {!isMentor && (
        <div className="menteeSignUp">
          <h2>
            Sign up to be a mentor! Meet with students from lower cohorts in
            Raikes to share your experience and offer support.
          </h2>
          <button onClick={handleSignUp}>Sign up!</button>
        </div>
      )}
    </div>
  );
}
