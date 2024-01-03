import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { authSlice } from "../../pages/Login/authSlice";
import Logo from "../../assets/argentBankLogo.png";
import "../../styles/MainNav.scss";

function MainNav() {
	const dispatch = useDispatch();

	const { auth } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.user);

	return (
		<nav className="main-nav">
			<Link className="main-nav-logo" to="/">
				<img
					className="main-nav-logo-image"
					src={Logo}
					alt="Argent Bank Logo"
				/>
				<h1 className="sr-only">Argent Bank</h1>
			</Link>
			{!auth?.isConnected ? (
				<div>
					<Link className="main-nav-item" to="/login">
						<i className="fa fa-user-circle"></i>
						{" Sign In"}
					</Link>
				</div>
			) : (
				<div>
					<Link className="main-nav-item" to="/profile">
						<i className="fa fa-user-circle"></i>
						{" " + user.firstName}
					</Link>
					<Link
						className="main-nav-item"
						to="/"
						onClick={() => dispatch(authSlice.actions.logout())}
					>
						<i className="fa fa-sign-out"></i>
						{" Sign Out"}
					</Link>
				</div>
			)}
		</nav>
	);
}

export default MainNav;
