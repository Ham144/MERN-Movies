import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/auth/Navigation";

const App = () => {
	return (
		<>
			<ToastContainer />
			<Navigation />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default App;
