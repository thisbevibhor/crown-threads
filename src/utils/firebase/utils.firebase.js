/* eslint-disable no-unused-vars */
//! explnations are written under the lines.

import { initializeApp } from "firebase/app";
// eslint-disable-next-line no-unused-vars
import {
	getAuth,
	signInWithRedirect,
	signInWithPopup,
	GoogleAuthProvider,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	signOut,
	onAuthStateChanged,
} from "firebase/auth";

import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
// ? getFirestore: initiates the firestore DB
// ? doc: this is used to access the document
// ? getdoc: used to read data from a document
// ? setdoc: used to write data to a document

const firebaseConfig = {
	apiKey: "AIzaSyA4lXWmOyQl8Hr-9yq1EyCX7gezTI-tZ5A",
	authDomain: "crown-threads.firebaseapp.com",
	projectId: "crown-threads",
	storageBucket: "crown-threads.appspot.com",
	messagingSenderId: "230519502657",
	appId: "1:230519502657:web:9074077d2e36a105af53c0",
};
// ? this firebase config is obtained after the web app is initiated in the firebase console
// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
// ? App is initialized

//initiate a provider instance
// Create a Google Sign-In provider
const googleProvider = new GoogleAuthProvider();
// ? Google, apple, github and twitter provide a provider class, this one is from Google Auth

// Set custom parameters for the provider
googleProvider.setCustomParameters({
	prompt: "select_account",
});
// ? this one is defined by googleAuth

// Get the Firebase authentication instance
export const auth = getAuth();
// ?  this is a method

// Function to initiate Google Sign-In using a popup
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
// ? this method takes two args, defined by default, could be different if the provider was different

// export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider);
// ? commented out was similar but it redirected us to google for sign in instead of a popup

export const db = getFirestore();
// ? initiate the DB, method provided by Fb

// * creating a user in the firestore data below, userAuth and additional is what we get after popup's success
export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
	if (!userAuth) return;
	// ? break the process if userAuth returns false

	const userDocRef = doc(db, "users", userAuth.uid);
	// ? db is singleton instance, points to database in console. this creates a document, collection "users" with a unique id "userAuth.id" which we get after auth() passess

	console.log(userDocRef);
	// ? Firebase generates this object even if it wasn't created in the database

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	// ? returns the document that was created after the "doc" was completed with the three info above

	console.log(userSnapshot.exists());
	// ? returns true only if the data exists in the DB, not just the reference like the one {"doc"} returned above, it will return true after we "setDoc"

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
				...additionalInformation,
			});
		} catch (error) {
			console.log("Error creating the User:", error.message);
		}
	}

	return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
	if (!email || !password) return;
	return signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);

// ? onAuthStateChanged fn will call the callback function when the auth state changes, we need to suplly that function to it, what it returns is a fn that unsubscribes the listener
