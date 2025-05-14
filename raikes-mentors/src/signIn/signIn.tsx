import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";
import { useTheme, useMediaQuery } from "@mui/material";

import "./signIn.css";
import { logIn } from "../firebase/readDatabase";
import { useState } from "react";
import type { UserData } from "../firebase/dataInterfaces";
import { useNavigate } from "react-router-dom";

export default function SignIn({
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

  const navigate = useNavigate();
  const theme = useTheme();

  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleLogin = async (email: string, password: string) => {
    try {
      let foundUserData = null;
      const result = await logIn(email, password);
      if (result?.userData && result?.userID) {
        setUserData(result?.userData);
        setUserKey(result.userID);
        navigate("/profile", {
          state: { userKey: result?.userID, userData: result?.userData },
        });
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
    <main className="center">
      <CssBaseline />
      <Sheet
        sx={{
          width: isSmallScreen ? "60%" : isMediumScreen ? "60%" : 500,
          mx: "auto", // margin left & right
          my: 4, // margin top & bottom
          py: 3, // padding top & bottom
          px: 2, // padding left & right
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: "sm",
          boxShadow: "md",
        }}
        variant="outlined"
      >
        <div>
          <Typography level="h4" component="h1">
            <b>Welcome!</b>
          </Typography>
          <Typography level="body-sm">Sign in to continue.</Typography>
        </div>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            // html input attribute
            name="email"
            type="email"
            placeholder="raikes@email.com"
            value={email}
            onChange={(input) => setEmail(input.target.value)}
          />
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <Input
            // html input attribute
            name="password"
            type="password"
            placeholder="password"
            value={password}
            onChange={(input) => setPassword(input.target.value)}
          />
        </FormControl>
        {/* Error message display */}
        {error && (
          <Typography sx={{ color: "red", fontSize: "sm" }}>
            {errorMessage}
          </Typography>
        )}
        <Button
          sx={{ mt: 1 /* margin top */ }}
          onClick={() => handleLogin(email, password)}
        >
          Log in
        </Button>
        <Typography
          endDecorator={<Link href="/sign_up">Sign up</Link>}
          sx={{ fontSize: "sm", alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
