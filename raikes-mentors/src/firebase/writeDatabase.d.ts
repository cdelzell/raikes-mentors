import type { UserData } from "./dataInterfaces";
export declare function addNewUser(userData: UserData): Promise<string>;
export declare function editUserField(userID: string, updates: Partial<UserData>): Promise<void>;
export declare function addNewMentor(userData: UserData): Promise<string | null>;
export declare function addMenteeToMentor(userData: UserData, menteeData: UserData): Promise<string | null>;
export declare function addNewMentee(userData: UserData): Promise<string | null>;
export declare function addMentorToMentee(userData: UserData, mentorData: UserData): Promise<string | null>;
