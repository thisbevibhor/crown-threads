/* eslint-disable no-unused-vars */
import { initializeApp } from "firebase/app";
// eslint-disable-next-line no-unused-vars
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
	apiKey: "AIzaSyA4lXWmOyQl8Hr-9yq1EyCX7gezTI-tZ5A",
	authDomain: "crown-threads.firebaseapp.com",
	projectId: "crown-threads",
	storageBucket: "crown-threads.appspot.com",
	messagingSenderId: "230519502657",
	appId: "1:230519502657:web:9074077d2e36a105af53c0",
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

//initiate a provider instance
// Create a Google Sign-In provider
const provider = new GoogleAuthProvider();

// Set custom parameters for the provider
provider.setCustomParameters({
	prompt: "select_account",
});

// Get the Firebase authentication instance
export const auth = getAuth();

// Function to initiate Google Sign-In using a popup
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
// * creating a user in the firestore data
export const createUserDocumentFromAuth = async (userAuth) => {
	const userDocRef = doc(db, "users", userAuth.uid);

	console.log(userDocRef);

	const userSnapshot = await getDoc(userDocRef);
	console.log(userSnapshot);
	console.log(userSnapshot.exists());

	if (!userSnapshot.exists()) {
		const { displayName, email } = userAuth;
		const createdAt = new Date();

		try {
			await setDoc(userDocRef, {
				displayName,
				email,
				createdAt,
			});
		} catch (error) {
			console.log("Error creating the User:", error.message);
		}
	}

	return userDocRef;
};
