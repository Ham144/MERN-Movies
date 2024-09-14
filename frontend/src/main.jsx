import { createRoot } from "react-dom/client";
import "./index.css";
import store from "./redux/store.js";
import { Provider } from "react-redux";
import { Route, RouterProvider, createRoutesFromElements } from "react-router";
import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";
import Movies from "./pages/Movies.jsx";
import PrivateRouteWrapper from "./pages/auth/PrivateRouteWrapper.jsx";
import Profile from "./pages/auth/user/Profile.jsx";

//Auth

//Restricted User

const router = createBrowserRouter(
	createRoutesFromElements(
		<Route path="/" element={<App />}>
			<Route index={true} path="/" element={<Home />} />
			<Route path="/movies" element={<Movies />} />
			<Route index path="/login" element={<Login />} />
			<Route path="/register" element={<Register />} />

			<Route path="" element={<PrivateRouteWrapper />}>
				//privates pages
				<Route path="/profile" element={<Profile />} />
			</Route>
		</Route>
	)
);

createRoot(document.getElementById("root")).render(
	<Provider store={store}>
		<RouterProvider router={router} />
	</Provider>
);
