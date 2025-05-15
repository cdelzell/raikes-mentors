import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import { useEffect, useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";
import "./mentors.css";
import {
  getMenteeData,
  getNewMentor,
  getUserData,
} from "../firebase/readDatabase";
import UserProfile from "../components/userProfile/userProfile";
import {
  addMentorToMentee,
  addNewMentee,
  editUserField,
} from "../firebase/writeDatabase";
import { CircularProgress } from "@mui/material";

export default function Mentors() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const [mentors, setMentors] = useState<UserData[]>([]);
  const [isMentee, setIsMentee] = useState(false);
  const [mentorAvailable, setMentorAvailable] = useState(false);
  const [checkMentors, setCheckMentors] = useState(false);

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserData = state?.userData;

    try {
      if (stateUserData && stateUserKey) {
        setUserKey(stateUserKey);
        setUserData(stateUserData);
        setIsMentee(stateUserData.mentee);
        setCheckMentors(true);
      }
    } catch (err) {
      console.log("There was an error grabbing the user's data.");
      return;
    }
  }, [state]);

  useEffect(() => {
    if (userKey && userData?.mentee == true) {
      (async () => {
        let menteeData = await getMenteeData(userKey);
        let mentorsInfo = [] as UserData[];
        for (const i in menteeData?.mentors) {
          let mentor = await getUserData(menteeData.mentors[parseInt(i)]);
          if (mentor) {
            mentorsInfo.push(mentor);
          }
        }
        setMentors(mentorsInfo);
        setCheckMentors(false);
      })();
    }
  }, [checkMentors]);

  const handleSignUp = () => {
    (async () => {
      if (userData) {
        addNewMentee(userData);
        editUserField(userKey, { mentee: true });
        setIsMentee(true);
      }
    })();
  };

  const handleMentorConnect = () => {
    (async () => {
      if (userData) {
        const newMentorID = await getNewMentor(userKey);
        if (newMentorID) {
          const newMentor = await getUserData(newMentorID);
          if (newMentor) {
            mentors?.push(newMentor);
            addMentorToMentee(userData, newMentor);
            setCheckMentors(true);
          }
        }
      }
    })();
  };

  if (checkMentors) {
    return (
      <>
        <NavBar userKey={userKey} userData={userData} />
      </>
    );
  }

  return (
    <div className="fullScreen">
      <NavBar userKey={userKey} userData={userData} />
      {isMentee && mentors?.length != 0 && (
        <div className="profileWrapper">
          <div className="mentors">
            {mentors &&
              mentors.map((mentor, index) => (
                <UserProfile key={index} {...mentor} />
              ))}
          </div>

          <div className="connect">
            <h2>Connect with a new mentor!</h2>
            <button onClick={handleMentorConnect}>Connect!</button>
          </div>
        </div>
      )}

      {isMentee && mentors?.length == 0 && (
        <div className="menteeSignUp">
          <h2>
            You haven't connected with any mentors yet! Would you like to
            connect with one?
          </h2>
          <button onClick={handleMentorConnect}>Connect!</button>
        </div>
      )}
      {!isMentee && userData && (
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
