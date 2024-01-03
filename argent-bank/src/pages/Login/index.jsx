import { useDispatch } from "react-redux";
import { authSlice } from "./authSlice";
import "../../styles/Login.scss";
import { useNavigate } from "react-router-dom";

// import { useGetTokenQuery } from "../../services/authApi";

// export const Fidelity = () => {
//     const { data: fidelity, isLoading } = useGetFidelityQuery()
//     return !isLoading && <div className="FidelityPoints">Vos points de fidélité s&#39;élèvent à { fidelity?.amount } points</div>
// }

function Login() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const handleSubmit = (evt) => {
		evt.preventDefault();

		fetch("http://localhost:3001/api/v1/user/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: evt.target["username"].value,
				password: evt.target["password"].value,
			}),
		})
			.then((response) => {
				return response.json();
			})
			.then((data) => {
				dispatch(authSlice.actions.login(data.body.token));
				navigate("/profile");
			})
			.catch((error) => {
				console.error(error);
			});
	};

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
					{/* <form> */}
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>
					<button className="sign-in-button">Sign In</button>
				</form>
			</section>
		</main>
	);
}

export default Login;
