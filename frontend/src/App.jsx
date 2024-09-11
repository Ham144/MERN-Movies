import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/auth/Navigation";

const App = () => {
	return (
		<div className={`font-sans w-full h-full mx-auto min-h-screen `}>
			<ToastContainer />
			<main>
				<Outlet />
			</main>
			<Navigation />
		</div>
	);
};

export default App;
