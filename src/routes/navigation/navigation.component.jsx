import { Outlet, Link } from "react-router-dom";

// import CrwnLogo from "../../assets/crown.svg";
import "./navigation.styles.scss";
export default function Navigation() {
	return (
		<>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<h3 className="logo">Logo</h3>
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						Shop
					</Link>
					<Link className="nav-link" to="/signIn">
						Sign In
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
}
