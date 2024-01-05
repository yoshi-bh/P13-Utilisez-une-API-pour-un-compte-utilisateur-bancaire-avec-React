import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

const PrivateRoutes = () => {
	const { auth } = useSelector((state) => state.auth);

	if (!auth?.isConnected) {
		return <Navigate to="/login" />;
	} else {
		return <Outlet />;
	}
};

export default PrivateRoutes;
