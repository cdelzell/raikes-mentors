import type { userData } from "./dataInterfaces";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { app } from "../firebase";
import { findUserIDByEmail } from "./readDatabase";

const db = getFirestore(app);
// const date = new Date();
// const year = date.getFullYear();
// const month = date.getMonth();

// Add a new document with a generated ID
export async function addNewUser(userData: userData) {
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

export async function addNewMentor(userData: userData) {
  try {
    let userID = await findUserIDByEmail(userData.email);

    if (userID == null) {
      return null;
    }

    const docRef = await addDoc(collection(db, "users", userID), {
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
  userData: userData,
  menteeData: userData
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

export async function addNewMentee(userData: userData) {
  try {
    let userID = await findUserIDByEmail(userData.email);

    if (userID == null) {
      return null;
    }

    const docRef = await addDoc(collection(db, "users", userID), {
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

export async function addMentorToMentee(
  userData: userData,
  mentorData: userData
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
