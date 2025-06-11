import ReactDOM from "react-dom/client";
import SignIn from "./signIn/signIn.tsx";
import SignUp from "./signUp/signUp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Profile from "./profile/profile.js";
import Mentors from "./mentors/mentors.tsx";
import Mentees from "./mentees/mentees.tsx";
import EditProfile from "./editProfile/editProfile.tsx";

function App() {
  return (
    <BrowserRouter>
      <div className="display">
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign_up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/mentees" element={<Mentees />} />
          <Route path="/edit-profile" element={<EditProfile />} />
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
