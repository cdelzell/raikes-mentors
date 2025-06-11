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

import { useLocation, useNavigate } from "react-router-dom";
import NavBar from "../components/navBar/navBar";
import { useEffect, useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";
import "./profile.css";
import SignUp from "../signUp/signUp";
import { useMediaQuery, useTheme } from "@mui/material";
import { Button, Typography } from "@mui/joy";
import Sheet from "@mui/joy/Sheet";
import { CssVarsProvider } from "@mui/joy/styles";
import { joyTheme } from "../theme";
import EditIcon from "@mui/icons-material/Edit";

export default function Profile() {
  const { state } = useLocation();
  const [userKey, setUserKey] = useState("");
  const [userData, setUserData] = useState<UserData>();
  const navigate = useNavigate();

  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

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

  const handleEdit = () => {
    navigate("/edit-profile");
  };

  return (
    <div className="fullScreen">
      <NavBar userKey={userKey} userData={userData} />
      <div className="profileWrapper">
        {/* <div className="profile"> */}
        <Sheet
          sx={{
            width: isSmallScreen ? "50%" : isMediumScreen ? "50%" : 400,
            height: isSmallScreen ? "50%" : isMediumScreen ? "50%" : 300,
            maxWidth: 500,
            py: 3,
            px: 2,
            display: "flex",
            flexDirection: "column",
            gap: 2,
            borderRadius: "sm",
            boxShadow: "md",
            minHeight: 50,
          }}
          variant="outlined"
        >
          <CssVarsProvider theme={joyTheme}>
            <Typography level="h1" component="h1">
              <b>
                {userData?.firstName} {userData?.lastName}
              </b>
              <Button
                className="edit"
                startDecorator={<EditIcon />}
                variant="soft"
                size="sm"
              >
                Edit
              </Button>
            </Typography>
            <Typography>
              <b>Cohort Year:</b> {userData?.cohort}{" "}
              <Button
                className="edit"
                startDecorator={<EditIcon />}
                variant="soft"
                size="sm"
              >
                Edit
              </Button>
            </Typography>
            <Typography>
              <b>Email:</b> {userData?.email}{" "}
              <Button
                className="edit"
                startDecorator={<EditIcon />}
                variant="soft"
                size="sm"
              >
                Edit
              </Button>
            </Typography>
            <Typography>
              <b>Phone Number:</b> {userData?.phone}{" "}
              <Button
                className="edit"
                startDecorator={<EditIcon />}
                variant="soft"
                size="sm"
              >
                Edit
              </Button>
            </Typography>
            {/* <Button
              sx={{
                mt: 1,
                "&:hover": {
                  backgroundColor: "#a70e0e",
                },
                position: "absolute",
                bottom: "1vw",
              }}
              onClick={() => handleEdit()}
            >
              Edit profile
            </Button> */}
          </CssVarsProvider>
        </Sheet>
        {/* </div> */}
      </div>
    </div>
  );
}
