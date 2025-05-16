import "./navBar.css";
import type { UserData } from "../../firebase/dataInterfaces";
export default function NavBar({ userKey, userData, }: {
    userKey: string;
    userData: UserData | undefined;
}): import("react/jsx-runtime").JSX.Element;
