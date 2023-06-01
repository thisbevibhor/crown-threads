import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/utils.firebase";
import Button from "@mui/material/Button";

// Component for the Sign In page
const SignIn = () => {
	// Function to handle sign in with Google
	const logGoogleUser = async () => {
		// Call the signInWithGooglePopup function from Firebase
		const { user } = await signInWithGooglePopup();
		const userdocref = await createUserDocumentFromAuth(user); // Log the response from the sign-in process
	};

	return (
		<>
			<h1>Sign In Page</h1>
			<Button onClick={logGoogleUser} variant="contained" color="error">
				Sign In with Google
			</Button>
		</>
	);
};

export default SignIn;
