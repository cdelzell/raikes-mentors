import type { Mentees, Mentors, UserData } from "./dataInterfaces";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

function getDate(): { year: number; month: number } {
  const date = new Date();
  return { year: date.getFullYear(), month: date.getMonth() };
}

// Usage
const { year, month } = getDate();

// Read information about a user given a userID
export async function getUserData(userID: string) {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as UserData;
  } else {
    return null;
  }
}

export async function logIn(email: string, password: string) {
  const userID = await findUserIDByEmail(email);

  if (userID == null) {
    return null;
  } else {
    const userData = await findUserByUserID(userID);
    if (userData != null) {
      if (userData.userData?.password == password) {
        return userData;
      }
    }
  }
}

export async function findUserByUserID(userID: string) {
  try {
    // Create a query against the collection
    const docRef = doc(db, "users", userID);
    const querySnapshot = await getDoc(docRef);
    let userData = null;
    if (querySnapshot.exists()) {
      userData = querySnapshot.data() as UserData;
    }

    return { userID, userData };
  } catch (e) {
    console.error("Error finding user profile:", e);
    throw e;
  }
}

// 2. Build your query against the "users" collection
export async function findUserIDByEmail(email: string) {
  // e.g. collection path is "users"
  const usersCol = collection(db, "users");

  // create a query where the "email" field equals the provided email
  const q = query(usersCol, where("email", "==", email));

  // 3. Execute the query
  const snapshot = await getDocs(q);

  // 4. Check results
  if (snapshot.empty) {
    // no matching user
    return null;
  }

  const userDoc = snapshot.docs[0];
  return userDoc.id;
}

// Read information about a user given a userID
export async function getMentorData(mentorID: string) {
  const docRef = doc(db, "mentors", mentorID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Mentors;
  } else {
    return null;
  }
}

// Read information about a user given a userID
export async function getMenteeData(menteeID: string) {
  const docRef = doc(db, "mentees", menteeID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data() as Mentees;
  } else {
    return null;
  }
}

export async function getNewMentor(menteeID: string) {
  const menteeInfo = await getMenteeData(menteeID);
  const userData = await getUserData(menteeID);
  //get list of all mentors
  //filter list by mentors the user already has
  //filter list by mentors that are younger or same cohort as the mentee
  //choose random mentor from the list
  let yearCutoff = year - 3;

  if (month < 7) {
    yearCutoff -= 1;
  }

  const q = query(
    collection(db, "users"),
    where("mentor", "==", true),
    where("cohort", "<", userData?.cohort),
    where("cohort", ">", yearCutoff)
  );

  const snapshot = await getDocs(q);
  const mentors = snapshot.docs.map((d) => d.id);
  const currentMentors = menteeInfo?.mentors;
  let possibleMentors = [] as string[];
  possibleMentors = mentors.filter((id) => id != menteeID);

  if (currentMentors) {
    possibleMentors = mentors.filter((id) => !currentMentors.includes(id));
  }

  if (!possibleMentors) {
    return null;
  }

  return possibleMentors[Math.floor(Math.random() * possibleMentors.length)];
}
