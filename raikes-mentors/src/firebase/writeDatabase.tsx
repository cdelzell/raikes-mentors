import type { UserData } from "./dataInterfaces";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
  setDoc,
} from "firebase/firestore";
import { app } from "../firebase";
import { findUserIDByEmail } from "./readDatabase";

const db = getFirestore(app);
// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth();

// Add a new document with a generated ID
export async function addNewUser(userData: UserData) {
  try {
    const docRef = await addDoc(collection(db, "users"), {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      mentee: userData.mentee,
      mentor: userData.mentor,
      password: userData.password,
      cohort: userData.cohort,
      phone: userData.phone,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the new document ID if needed
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Re-throw the error to handle it elsewhere
  }
}

export async function editUserField(
  userID: string,
  updates: Partial<UserData>
) {
  try {
    const userRef = doc(db, "users", userID);

    await updateDoc(userRef, updates);
    console.log("User updated:", updates);
  } catch (err) {
    console.error("error!");
    throw err;
  }
}

export async function addNewMentor(userData: UserData) {
  try {
    let userID = await findUserIDByEmail(userData.email);

    if (userID == null) {
      return null;
    }

    const docRef = await addDoc(collection(db, "mentors", userID), {
      mentees: [] as string[],
      userID: userID,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the new document ID if needed
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Re-throw the error to handle it elsewhere
  }
}

export async function addMenteeToMentor(
  userData: UserData,
  menteeData: UserData
) {
  try {
    let userID = await findUserIDByEmail(userData.email);
    let menteeID = await findUserIDByEmail(menteeData.email);

    if (userID == null) {
      return null;
    }

    const userDocRef = doc(db, "mentors", userID);

    await updateDoc(userDocRef, {
      mentees: arrayUnion(menteeID),
    });

    console.log("Document written with ID: ", userID);
    return userID; // Return the new document ID if needed
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Re-throw the error to handle it elsewhere
  }
}

export async function addNewMentee(userData: UserData) {
  try {
    let userID = await findUserIDByEmail(userData.email);

    if (userID == null) {
      return null;
    }

    // create a DocumentReference at /mentees/{userID}
    const menteeDocRef = doc(db, "mentees", userID);

    // write your data there
    await setDoc(menteeDocRef, {
      mentors: [] as string[],
      userID: userID,
    });

    return userID; // Return the new document ID if needed
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Re-throw the error to handle it elsewhere
  }
}

export async function addMentorToMentee(
  userData: UserData,
  mentorData: UserData
) {
  try {
    let userID = await findUserIDByEmail(userData.email);
    let mentorID = await findUserIDByEmail(mentorData.email);

    if (userID == null) {
      return null;
    }

    const userDocRef = doc(db, "mentees", userID);

    await updateDoc(userDocRef, {
      mentors: arrayUnion(mentorID),
    });

    console.log("Document written with ID: ", userID);
    return userID; // Return the new document ID if needed
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Re-throw the error to handle it elsewhere
  }
}
