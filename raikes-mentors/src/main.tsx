import ReactDOM from "react-dom/client";
import SignIn from "./signIn/signIn.tsx";
import SignUp from "./signUp/signUp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Profile from "./profile/profile.js";
import Mentors from "./mentors/mentors.tsx";
import NavBar from "./components/navBar/navBar.tsx";
import { useState } from "react";
import type { UserData } from "./firebase/dataInterfaces.tsx";

function App() {
  const [userKey, setUserKey] = useState<string>("");
  const [userData, setUserData] = useState<UserData | null>(null);

  // e.g. after sign-in or sign-up:
  // setUserKey(fetchedKey);
  // setUserData(fetchedData);

  return (
    <BrowserRouter>
      <div className="display">
        {/* {userKey && userData && (
          <NavBar userKey={userKey} userData={userData} />
        )} */}

        <Routes>
          <Route
            path="/"
            element={
              <SignIn setUserKey={setUserKey} setUserData={setUserData} />
            }
          />
          <Route
            path="/sign_up"
            element={
              <SignUp setUserKey={setUserKey} setUserData={setUserData} />
            }
          />

          {/* now every page under here will see the same NavBar props */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentors" element={<Mentors />} />

          {/* …etc… */}
        </Routes>
      </div>
    </BrowserRouter>

    // return (

    //   <BrowserRouter>
    //     <Routes>
    //       <Route path="/" element={<SignIn />} />
    //       <Route path="/sign_up" element={<SignUp />} />
    //       <Route path="/profile" element={<Profile />} />
    //       <Route path="/mentors" element={<Mentors />} />
    //     </Routes>
    //   </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
export default App;
