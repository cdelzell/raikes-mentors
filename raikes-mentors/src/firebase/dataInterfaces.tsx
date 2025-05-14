export interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  mentee: boolean;
  mentor: boolean;
  password: string;
  cohort: number;
  phone: number;
}

export interface Mentors {
  mentees: string[];
  userID: string;
}

export interface Mentees {
  mentors: string[];
  userID: string;
}
