import type { userData, mentors, mentees } from "./dataInterfaces";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
} from "firebase/firestore";
import { app } from "../firebase";
import { findUserByUserID, findUserByEmail } from "./readDatabase";

const db = getFirestore(app);

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
    const userID = findUserByEmail(userData.email);

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

export async function addNewMentee(userData: userData) {
  try {
    const docRef = await addDoc(collection(db, "users", menteeData.userID), {
      mentees: menteeData.mentors,
      userID: menteeData.userID,
    });

    console.log("Document written with ID: ", docRef.id);
    return docRef.id; // Return the new document ID if needed
  } catch (e) {
    console.error("Error adding document: ", e);
    throw e; // Re-throw the error to handle it elsewhere
  }
}
