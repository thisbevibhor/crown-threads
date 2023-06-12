import { Outlet, Link } from "react-router-dom";
import { useContext } from "react";
import CrwnLogo from "../../assets/crown.png";
import "./navigation.styles.scss";
import { UserContext } from "../../contexts/user.context";
import { signOutUser } from "../../utils/firebase/utils.firebase";

export default function Navigation() {
	const { currentUser, setCurrentUser } = useContext(UserContext);
	const signOutHandler = async () => {
		await signOutUser();
		setCurrentUser(null);
	};
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<img src={CrwnLogo} className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						Shop
					</Link>

					{currentUser ? (
						<span className="nav-link" onClick={signOutHandler}>
							Sign Out
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							Sign In
						</Link>
					)}
				</div>
			</div>
			<Outlet />
		</>
	);
}
