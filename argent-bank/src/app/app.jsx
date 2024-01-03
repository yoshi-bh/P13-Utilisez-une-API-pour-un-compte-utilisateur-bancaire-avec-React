import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import PrivateRoutes from "../components/PrivateRoutes";
import MainNav from "../components/MainNav";
import Footer from "../components/Footer";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";

function App() {
	return (
		<Provider store={store}>
			<Router>
				<MainNav />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/login" element={<Login />} />
					<Route element={<PrivateRoutes />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
				<Footer />
			</Router>
		</Provider>
	);
}

export default App;
