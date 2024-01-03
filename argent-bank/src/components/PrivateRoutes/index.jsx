import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
	const { auth } = useSelector((state) => state.auth);

	if (!auth?.isConnected) {
		return <Navigate to="/login" />;
	} else {
		return <Outlet />;

		// fetch("http://localhost:3001/api/v1/user/profile", {
		// 	method: "POST",
		// 	headers: {
		// 		"Content-Type": "application/json",
		// 		Authorization: "Bearer " + auth.token,
		// 	},
		// })
		// 	.then((response) => {
		// 		return response.json();
		// 	})
		// 	.then((data) => {
		// 		console.log(data?.body?.id ? "YES" : "NO");
		// 		const isValid = data?.body?.id ? true : false;
		// 		if (isValid) {
		// 			console.log("GOOD");
		// 			return <Outlet />;
		// 		} else {
		// 			console.log("BAD");
		// 			return <Navigate to="/login" />;
		// 		}
		// 	})
		// 	.catch((error) => {
		// 		console.error(error);
		// 	});
	}
};

export default PrivateRoutes;
