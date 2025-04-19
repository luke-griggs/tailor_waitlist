import { collection, addDoc, query, where, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";

export interface WaitlistEntry {
  email: string;
  createdAt: Date;
}

// Collection reference
const waitlistCollection = collection(db, "waitlist");

/**
 * Check if an email already exists in the waitlist
 * @param email - The email to check
 * @returns Promise<boolean> - True if email exists, false otherwise
 */
export async function checkEmailExists(email: string): Promise<boolean> {
  try {
    const q = query(
      waitlistCollection,
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  } catch (error) {
    console.error("Error checking email existence:", error);
    throw error;
  }
}

/**
 * Add an email to the waitlist
 * @param email - The email to add
 * @returns Promise<string> - The document ID if successful
 */
export async function addToWaitlist(email: string): Promise<string> {
  try {
    // First check if email already exists
    const exists = await checkEmailExists(email);

    if (exists) {
      throw new Error("Email already registered");
    }

    // Add the email to the waitlist
    const docRef = await addDoc(waitlistCollection, {
      email: email.toLowerCase(),
      createdAt: new Date(),
    });

    return docRef.id;
  } catch (error) {
    console.error("Error adding to waitlist:", error);
    throw error;
  }
}
