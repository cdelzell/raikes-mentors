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
  addMenteeToMentor,
  addMentorToMentee,
  addNewMentee,
  editUserField,
} from "../firebase/writeDatabase";
import { CircularProgress, ThemeProvider } from "@mui/material";
import { muiTheme } from "../theme";

export default function Mentors() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const [mentors, setMentors] = useState<UserData[]>([]);
  const [isMentee, setIsMentee] = useState<boolean>();
  const [requestedMentor, setRequestedMentor] = useState(false);
  const [mentorAvailable, setMentorAvailable] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserData = state?.userData;

    try {
      if (stateUserData && stateUserKey) {
        setUserKey(stateUserKey);
        setUserData(stateUserData);
        setIsMentee(stateUserData.mentee);
        setReady(true);
      }
    } catch (err) {
      console.log("There was an error grabbing the user's data.");
      return;
    }
  }, [state, userData]);

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
        setReady(true);
      })();
    }
  }, [isMentee]);

  const handleSignUp = () => {
    (async () => {
      if (userData) {
        addNewMentee(userData);
        editUserField(userKey, { mentee: true });
        setIsMentee(true);
        setUserData({ ...userData, mentee: true });
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
            setMentors((prev) => [...prev, newMentor]);
            addMentorToMentee(userData, newMentor);
            addMenteeToMentor(newMentor, userData);
          }
        } else {
          setMentorAvailable(false);
          setRequestedMentor(true);
        }
      }
    })();
  };

  const handlePopup = () => {
    setMentorAvailable(true);
  };

  if (!ready) {
    return (
      <div className="fullScreen">
        <NavBar userKey={userKey} userData={userData} />
        <div className="loading">
          <ThemeProvider theme={muiTheme}>
            <CircularProgress color="primary" />
          </ThemeProvider>
        </div>
      </div>
    );
  }

  return (
    <div className="fullScreen">
      <NavBar userKey={userKey} userData={userData} />
      {isMentee && mentors?.length != 0 && ready && (
        <div className="profileWrapper">
          <div className="mentors">
            {mentors &&
              mentors.map((mentor, index) => (
                <UserProfile key={index} {...mentor} />
              ))}
          </div>

          <div className="connect">
            <button onClick={handleMentorConnect}>
              Connect with a new mentor!
            </button>
          </div>
          {!mentorAvailable && requestedMentor && (
            <div className="connect">
              <div className="popup">
                <div style={{ position: "absolute", bottom: ".6vw" }}>
                  No new mentors available. Please check another time!
                </div>
                <button onClick={handlePopup}>X</button>
              </div>
            </div>
          )}
        </div>
      )}

      {isMentee && mentors?.length == 0 && ready && (
        <div className="profileWrapper menteeSignUp">
          <h2>
            You haven't connected with any mentors yet! Would you like to
            connect with one?
          </h2>
          <button onClick={handleMentorConnect} className="connectButton">
            Connect!
          </button>
          {!mentorAvailable && requestedMentor && (
            <div className="connect">
              <div className="popup">
                <div style={{ position: "absolute", bottom: ".6vw" }}>
                  No new mentors available. Please check another time!
                </div>
                <button onClick={handlePopup}>X</button>
              </div>
            </div>
          )}
        </div>
      )}
      {!isMentee && ready && (
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
