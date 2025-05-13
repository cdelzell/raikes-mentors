import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useTheme, useMediaQuery } from "@mui/material";

import "./signIn.css";
import { logIn } from "../firebase/readDatabase";
import { useState } from "react";
import type { userData } from "../firebase/dataInterfaces";
import { useNavigate } from "react-router-dom";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cohort, setCohort] = useState("");
  const [phone, setPhone] = useState("");
  const [userData, setUserData] = useState<userData>();

  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSignUp = async () => {
    try {
      let foundUserData = null;
      if (!password || !email || !firstName || !lastName || !cohort || !phone) {
        setError(true);
        setErrorMessage("Error: Please fill  all fields!");
        return;
      }

      if (!cleanPhone(phone).valid) {
        setError(true);
        setErrorMessage("Please submit a phone number in the correct format!");
      }

      if (!cleanCohort(cohort).valid) {
        setError(true);
        setErrorMessage(
          "Please submit your cohort year in the correct format!"
        );
      }

      setUserData({
        email: email,
        firstName: firstName,
        lastName: lastName,
        cohort: parseInt(cohort),
        password: password,
        mentee: false,
        mentor: false,
        phone: 0,
      });

      const result = await logIn(email, password);
      foundUserData = result?.userData;
      if (foundUserData) {
        setUserData(foundUserData);
        console.log(foundUserData);
        return;
      }

      if (foundUserData == null) {
        setErrorMessage("Error: Username not found");
        setError(true);
        return;
      }
    } catch (error) {
      setErrorMessage("Login failed. Please try again.");
      setError(true);
    }
  };

  return (
    <main className="loginPage">
      <CssBaseline />
      {/* Main signup form container */}
      <Sheet
        sx={{
          width: isSmallScreen ? "60%" : isMediumScreen ? "60%" : 500,
          maxWidth: 500,
          mx: "auto",
          my: 4,
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
        {/* Header section */}
        <div>
          <Typography level="h1" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-md">Sign up to continue.</Typography>
        </div>

        {/* Registration form */}
        <form>
          {/* Username input field */}
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input
              name="email"
              type="email"
              placeholder="student@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </FormControl>

          {/* First Name input field */}
          <FormControl>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              type="text"
              placeholder="jane"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </FormControl>

          {/* Last Name input field */}
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="firstName"
              type="text"
              placeholder="doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </FormControl>

          {/* Cohort Year input field */}
          <FormControl>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="cohort"
              type="number"
              placeholder="2025"
              value={cohort}
              onChange={(e) => setCohort(e.target.value)}
            />
          </FormControl>

          {/* Cohort Year input field */}
          <FormControl>
            <FormLabel>
              Phone Number (no dashes or extra spaces, please)
            </FormLabel>
            <Input
              name="phone"
              type="phone"
              placeholder="6309454957"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </FormControl>

          {/* Password input field */}
          <FormControl>
            <FormLabel>Password</FormLabel>
            <Input
              name="password"
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </FormControl>

          {/* Error message display */}
          {error && (
            <Typography sx={{ color: "red", fontSize: "sm" }}>
              {errorMessage}
            </Typography>
          )}

          {/* Submit button */}
          <Button type="submit" sx={{ mt: 1 }} onClick={() => handleSignUp()}>
            Sign Up
          </Button>
        </form>
      </Sheet>
    </main>
  );
}

function cleanPhone(phoneNum: string) {
  phoneNum.replace("-", "");
  phoneNum.replace(" ", "");

  try {
    if (phoneNum.length != 10) {
      return { valid: false, number: 0 };
    }
    return { valid: true, number: parseInt(phoneNum) };
  } catch (err) {
    return { valid: false, number: 0 };
  }
}

function cleanCohort(cohort: string) {
  try {
    if (cohort.length == 4 && cohort.substring(0, 2) == "20") {
      return { valid: true, number: parseInt(cohort) };
    } else if (cohort.length == 2) {
      return { valid: true, number: parseInt(cohort) + 2000 };
    }
    return { valid: false, number: 0 };
  } catch (err) {
    return { valid: false, number: 0 };
  }
}
