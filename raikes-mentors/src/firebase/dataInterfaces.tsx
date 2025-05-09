export interface userData {
  firstName: string;
  lastName: string;
  email: string;
  mentee: boolean;
  mentor: boolean;
  password: string;
  cohort: number;
  phone: number;
}

export interface mentors {
  mentees: string[];
  userID: string;
}

export interface mentees {
  mentors: string[];
  userID: string;
}
