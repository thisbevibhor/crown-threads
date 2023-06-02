import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/utils.firebase";
import FormInput from "../form-input/form-input.component";
import "./sign-up-form.styles.scss";
import Button from "../button/button.component";

const defaultFormFields = {
	displayName: "",
	email: "",
	password: "",
	confirmPassword: "",
};

const SignUpForm = () => {
	const [formFields, setFormFields] = useState(defaultFormFields);
	const { displayName, email, password, confirmPassword } = formFields;

	const resetFormFields = () => {
		setFormFields(defaultFormFields);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (password != confirmPassword) {
			alert("Passwords do not match.");
			return;
		}

		try {
			const { user } = await createAuthUserWithEmailAndPassword(email, password);
			await createUserDocumentFromAuth(user, { displayName });
			resetFormFields();
		} catch (error) {
			console.log("user creation encountered an error:", error.message);
		}
	};

	const handleChange = (event) => {
		const { name, value } = event.target;

		setFormFields({ ...formFields, [name]: value });
	};
	return (
		<div className="sign-up-container ">
			<h2>Don&apos;t have an account yet?</h2>
			<span>Sign Up with your Email and Password</span>
			<form onSubmit={handleSubmit}>
				<FormInput
					label="Display Name"
					type="text"
					required
					onChange={handleChange}
					name="displayName"
					value={displayName}
				/>
				<FormInput label="Email" type="text" required onChange={handleChange} name="email" value={email} />
				<FormInput label="Passsword" type="text" required onChange={handleChange} name="password" value={password} />
				<FormInput
					label="Confirm Password"
					type="text"
					required
					onChange={handleChange}
					name="confirmPasword"
					value={confirmPassword}
				/>

				<Button type="submit">Sign Up</Button>
			</form>
		</div>
	);
};
export default SignUpForm;
