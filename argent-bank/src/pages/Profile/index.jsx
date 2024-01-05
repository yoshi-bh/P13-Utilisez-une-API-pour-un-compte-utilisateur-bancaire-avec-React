import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserThunk, updateUserThunk } from "./userSlice";
import Account from "../../components/Account";
import "../../styles/Profile.scss";

function Profile() {
	const dispatch = useDispatch();

	const [isEditing, setIsEditing] = useState(false);

	const { auth } = useSelector((state) => state.auth);
	const { user } = useSelector((state) => state.user);

	useEffect(() => {
		if (!auth?.isConnected) return;

		dispatch(getUserThunk(auth.token));
	}, [isEditing]);

	const updateName = () => {
		const firstName = document.querySelector("#firstName").value;
		const lastName = document.querySelector("#lastName").value;

		dispatch(updateUserThunk({ token: auth.token, firstName, lastName })).then(
			() => {
				setIsEditing(false);
			}
		);
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
