import type { Mentees, Mentors, UserData } from "./dataInterfaces";
export declare function getUserData(userID: string): Promise<UserData | null>;
export declare function logIn(email: string, password: string): Promise<{
    userID: string;
    userData: UserData | null;
} | null | undefined>;
export declare function findUserByUserID(userID: string): Promise<{
    userID: string;
    userData: UserData | null;
}>;
export declare function findUserIDByEmail(email: string): Promise<string | null>;
export declare function getMentorData(mentorID: string): Promise<Mentors | null>;
export declare function getMenteeData(menteeID: string): Promise<Mentees | null>;
export declare function getNewMentor(menteeID: string): Promise<string | null>;
