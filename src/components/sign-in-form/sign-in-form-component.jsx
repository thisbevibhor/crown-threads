import { useState } from "react";
import { signInWithGooglePopup, createUserDocumentFromAuth, signInAuthUserWithEmailAndPassword } from "../../utils/firebase/utils.firebase";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";
import "./sign-in-form.styles.scss";
import "../button/button.styles.scss";

const defaultFormFields = {
	email: "",
	password: "",
};

const SignInForm = () => {
	//state remembers the state of the form field
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { email, password } = formFields;

	// Function to reset form fields to their default values
	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	// Function to sign in with Google account
	const signInWithGoogle = async () => {
		await signInWithGooglePopup();
	};

	// Function to handle form submission
	const handleSubmit = async (event) => {
		event.preventDefault();

		try {
			const { user } = await signInAuthUserWithEmailAndPassword(email, password);
			resetFormFields();
		} catch (error) {
			switch (error.code) {
				case "auth/wrong-password":
					alert("Entered password is incorrect");
					break;

				case "auth/user-not-found":
					alert("No user associated with this email address.");
					break;

				default:
					console.log(error);
			}
		}
	};

	// Function to handle input field changes
	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};

	return (
		<div className="sign-up-container ">
			{/* Title */}
			<h2>Already have an account?</h2>
			{/* Subtitle */}
			<span>Sign In with your Email and Password</span>
			<form onSubmit={handleSubmit}>
				{/* Email input field */}
				<FormInput label="Email" type="email" required onChange={handleChange} name="email" value={email} />
				{/* Password input field */}
				<FormInput label="Passsword" type="password" required onChange={handleChange} name="password" value={password} />
				<div className="buttons-container">
					{/* Sign In button */}
					<Button type="submit">Sign In</Button>
					{/* Google Sign In button */}
					<Button type="button" buttonType="google" onClick={signInWithGoogle}>
						Google Sign In
					</Button>
				</div>
			</form>
		</div>
	);
};

export default SignInForm;
