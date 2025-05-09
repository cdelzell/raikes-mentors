import Sheet from "@mui/joy/Sheet";
import CssBaseline from "@mui/joy/CssBaseline";
import Typography from "@mui/joy/Typography";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";
import Link from "@mui/joy/Link";

import "./signIn.css";
import { logIn } from "../firebase/readDatabase";
import { useState } from "react";
import type { userData } from "../firebase/dataInterfaces";

export default function SignIn() {
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userData, setUserData] = useState<userData>();

  const handleLogin = async (email: string, password: string) => {
    try {
      let foundUserData = null;
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
    <main className="center">
      <CssBaseline />
      <Sheet
        sx={{
          width: 300,
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
          endDecorator={<Link href="/sign-up">Sign up</Link>}
          sx={{ fontSize: "sm", alignSelf: "center" }}
        >
          Don&apos;t have an account?
        </Typography>
      </Sheet>
    </main>
  );
}
