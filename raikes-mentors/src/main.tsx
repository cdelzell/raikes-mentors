import ReactDOM from "react-dom/client";
import SignIn from "./signIn/signIn.tsx";
import SignUp from "./signUp/signUp.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Profile from "./profile/profile.js";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/sign_up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(<App />);
export default App;
