import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import { useTheme, useMediaQuery } from "@mui/material";
import { logIn } from "../firebase/readDatabase";
import { useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";
import { useNavigate } from "react-router-dom";
import "./signUp.css";
import { addNewUser } from "../firebase/writeDatabase";

export default function SignUp({
  setUserKey,
  setUserData,
}: {
  setUserKey: (key: string) => void;
  setUserData: (data: UserData) => void;
}) {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [cohort, setCohort] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (!password || !email || !firstName || !lastName || !cohort || !phone) {
        setError(true);
        setErrorMessage("Error: Please fill  all fields!");
        return;
      }

      if (!cleanPhone(phone).valid) {
        setError(true);
        setErrorMessage("Please submit a phone number in the correct format!");
        return;
      }

      if (!cleanCohort(cohort).valid) {
        setError(true);
        setErrorMessage(
          "Please submit your cohort year in the correct format!"
        );
        return;
      }

      const newUser = {
        email: email,
        firstName: firstName,
        lastName: lastName,
        cohort: cleanCohort(cohort).number,
        password: password,
        mentee: false,
        mentor: false,
        phone: cleanPhone(phone).number,
      };

      const result = await addNewUser(newUser);

      if (result) {
        setUserKey(result);
        setUserData(newUser);
        navigate("/profile", { state: { userKey: result, userInfo: newUser } });
        return;
      }

      if (result == null) {
        setErrorMessage("Error: User not added.");
        setError(true);
        return;
      }
    } catch (error) {
      setErrorMessage("Sign up failed. Please try again.");
      setError(true);
    }
  };

  return (
    <main className="center">
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
        <form onSubmit={handleSignUp}>
          {/* Username input field */}
          <FormControl>
            <FormLabel sx={{ mt: ".5vw" }}>Email</FormLabel>
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
            <FormLabel sx={{ mt: ".5vw" }}>First Name</FormLabel>
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
            <FormLabel sx={{ mt: ".5vw" }}>Last Name</FormLabel>
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
            <FormLabel sx={{ mt: ".5vw" }}>Cohort Year</FormLabel>
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
            <FormLabel sx={{ mt: ".5vw" }}>
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
            <FormLabel sx={{ mt: ".5vw" }}>Password</FormLabel>
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
          <Button type="submit" sx={{ mt: "1vw" }}>
            Sign Up
          </Button>
        </form>
      </Sheet>
    </main>
  );
}

function cleanPhone(phoneNum: string) {
  phoneNum = phoneNum.replace("-", "");
  phoneNum = phoneNum.replace("-", "");
  phoneNum = phoneNum.replace(" ", "");
  phoneNum = phoneNum.replace(" ", "");

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
      let num = parseInt(cohort) + 2000;
      return { valid: true, number: num };
    }
    return { valid: false, number: 0 };
  } catch (err) {
    return { valid: false, number: 0 };
  }
}
