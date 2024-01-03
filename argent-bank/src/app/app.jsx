import {
	BrowserRouter as Router,
	Routes,
	Route,
} from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
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
					<Route path="/profile" element={<Profile />} />
					{/* <Route path="*" element={<Navigate to="/user/12" />} /> */}
				</Routes>
				<Footer />
			</Router>
		</Provider>
	);
}

export default App;
