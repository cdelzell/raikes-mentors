import { useLocation } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import { useEffect, useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";
import "./mentees.css";
import { getMentorData, getUserData } from "../firebase/readDatabase";
import UserProfile from "../components/userProfile/userProfile";
import { addNewMentor, editUserField } from "../firebase/writeDatabase";
import CircularProgress from "@mui/material/CircularProgress";
import { muiTheme } from "../theme";
import { ThemeProvider } from "@mui/material";

export default function Mentees() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const [mentees, setMentees] = useState<UserData[]>([]);
  const [isMentor, setIsMentor] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stateUserKey = state?.userKey;
    const stateUserData = state?.userData;
    console.log(stateUserData);

    try {
      if (stateUserData && stateUserKey) {
        setUserKey(stateUserKey);
        setUserData(stateUserData);
        setIsMentor(stateUserData.mentor);
        setReady(true);
      }
    } catch (err) {
      console.log("There was an error grabbing the user's data.");
      return;
    }
  }, [state, userData]);

  useEffect(() => {
    if (userKey && userData?.mentor == true) {
      (async () => {
        let menteeData = await getMentorData(userKey);
        let menteesInfo = [] as UserData[];
        for (const i in menteeData?.mentees) {
          let mentee = await getUserData(menteeData.mentees[parseInt(i)]);
          if (mentee) {
            menteesInfo.push(mentee);
          }
        }
        setMentees(menteesInfo);
        setReady(true);
      })();
    }
  }, [isMentor]);

  const handleSignUp = () => {
    (async () => {
      console.log(userData);
      if (userData) {
        addNewMentor(userData);
        editUserField(userKey, { mentor: true });
        setIsMentor(true);
        setUserData({ ...userData, mentor: true });
        console.log("success!");
      }
    })();
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
      {isMentor && ready && (
        <div className="profileWrapper">
          {mentees?.length != 0 &&
            ready &&
            mentees.map((mentee, index) => (
              <UserProfile key={index} {...mentee} />
            ))}
          {mentees?.length == 0 && <div className="empty">No mentees yet!</div>}
        </div>
      )}

      {!isMentor && ready && (
        <div className="mentorSignUp">
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
