import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "./userSlice";
import "../../styles/Profile.scss";

function Profile() {
	const dispatch = useDispatch();

	const { auth } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (!auth?.isConnected) return;

		fetch("http://localhost:3001/api/v1/user/profile", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.token,
			},
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				dispatch(
					userSlice.actions.updateUser({
						firstName: data.body.firstName,
						lastName: data.body.lastName,
					})
				);
			})
			.catch((error) => {
				console.error(error);
			});
	}, [auth?.isConnected, auth?.token, dispatch]);

	return (
		<main className="main bg-dark">
			<div className="header">
				<h1>
					Welcome back
					<br />
					{user?.firstName ? user.firstName : "firstName"}{" "}
					{user?.lastName ? user.lastName : "lastName"}!
				</h1>
				<button className="edit-button">Edit Name</button>
			</div>
			<h2 className="sr-only">Accounts</h2>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Checking (x8349)</h3>
					<p className="account-amount">$2,082.79</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Savings (x6712)</h3>
					<p className="account-amount">$10,928.42</p>
					<p className="account-amount-description">Available Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
			<section className="account">
				<div className="account-content-wrapper">
					<h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
					<p className="account-amount">$184.30</p>
					<p className="account-amount-description">Current Balance</p>
				</div>
				<div className="account-content-wrapper cta">
					<button className="transaction-button">View transactions</button>
				</div>
			</section>
		</main>
	);
}

export default Profile;
