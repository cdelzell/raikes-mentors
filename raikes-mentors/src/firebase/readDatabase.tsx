import type { userData, mentors, mentees } from "./dataInterfaces";
import {
  getFirestore,
  collection,
  QuerySnapshot,
  addDoc,
  doc,
  setDoc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import type { DocumentData } from "firebase/firestore";
import { app } from "../firebase";

const db = getFirestore(app);

// Read information about a user given a userID
export async function getUserData(userID: string) {
  const docRef = doc(db, "users", userID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

export async function findUserByUserID(userID: string) {
  try {
    // Create a query against the collection
    const docRef = doc(db, "users", userID);
    const querySnapshot = await getDoc(docRef);
    let userData = null;
    let userKey = "";
    if (querySnapshot.exists()) {
      const userEntry = querySnapshot.data();
      userKey = Object.keys(userEntry)[0];
      userData = Object.values(userEntry)[0] as userData;
    }

    return { userKey, userData };
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
  const snapshot: QuerySnapshot<DocumentData> = await getDocs(q);

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
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}

// Read information about a user given a userID
export async function getMenteeData(menteeID: string) {
  const docRef = doc(db, "mentees", menteeID);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    console.log("Document data:", docSnap.data());
    return docSnap.data();
  } else {
    // docSnap.data() will be undefined in this case
    console.log("No such document!");
    return null;
  }
}
