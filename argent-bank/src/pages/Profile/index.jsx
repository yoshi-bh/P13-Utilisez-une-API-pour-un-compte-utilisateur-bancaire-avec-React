import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { userSlice } from "./userSlice";
import Account from "../../components/Account";
import "../../styles/Profile.scss";

function Profile() {
	const dispatch = useDispatch();

	const [isEditing, setIsEditing] = useState(false);

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
	}, [auth?.isConnected, auth?.token, user, dispatch]);

	const updateName = () => {
		const firstName = document.querySelector("#firstName").value;
		const lastName = document.querySelector("#lastName").value;

		fetch("http://localhost:3001/api/v1/user/profile", {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: "Bearer " + auth.token,
			},
			body: JSON.stringify({
				firstName,
				lastName,
			}),
		})
			.then((response) => {
				if (response.ok) {
					setIsEditing(false);
				}
			})
			// .then(() => {
			// 	dispatch(
			// 		userSlice.actions.updateUser({
			// 			firstName,
			// 			lastName,
			// 		})
			// 	);
			// })
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<main className="main bg-dark">
			<div className="header">
				{isEditing ? (
					<div>
						<h1>Welcome back</h1>
						<div className="input-wrapper">
							<input type="text" id="firstName" defaultValue={user.firstName} />
							<input type="text" id="lastName" defaultValue={user.lastName} />
						</div>
						<button className="edit-button" onClick={() => updateName()}>
							Save
						</button>
						<button className="edit-button" onClick={() => setIsEditing(false)}>
							Cancel
						</button>
					</div>
				) : (
					<div>
						<h1>
							Welcome back
							<br />
							{user?.firstName ? user.firstName : "firstName"}{" "}
							{user?.lastName ? user.lastName : "lastName"}!
						</h1>
						<button className="edit-button" onClick={() => setIsEditing(true)}>
							Edit Name
						</button>
					</div>
				)}
			</div>
			<h2 className="sr-only">Accounts</h2>
			<Account title={"Argent Bank Checking (x8349)"} amount={"$2,082.79"} />
			<Account title={"Argent Bank Savings (x6712)"} amount={"$10,928.42"} />
			<Account title={"Argent Bank Credit Card (x8349)"} amount={"$184.30"} />
		</main>
	);
}

export default Profile;
