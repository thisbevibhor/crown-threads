import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";
import { onAuthStateChangedListener, createUserDocumentFromAuth } from "../utils/firebase/utils.firebase";

// see this as the value you wish to share/access

export const UserContext = createContext({
	currentUser: null,
	setCurrentUser: () => null,
});

//this is the provider anthe actual c omponent

export const UserProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(null);
	const value = { currentUser, setCurrentUser };

	useEffect(() => {
		const unsubscribe = onAuthStateChangedListener((user) => {
			if (user) {
				createUserDocumentFromAuth(user);
			}
			setCurrentUser(user);
		});

		return unsubscribe;
		// ! useEffect will run unsubscribe(the fn onAuthStateChanged returns for unsubscribing) as cleanup code as useEffect does
	}, []);

	return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

UserProvider.propTypes = {
	children: PropTypes.node.isRequired,
};
