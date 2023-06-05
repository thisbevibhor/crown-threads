import { Outlet, Link } from "react-router-dom";

import CrwnLogo from "../../assets/crown.png";
import "./navigation.styles.scss";
export default function Navigation() {
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
					<Link className="nav-link" to="/auth">
						Sign In
					</Link>
				</div>
			</div>
			<Outlet />
		</>
	);
}
