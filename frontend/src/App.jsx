import React from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/auth/Navigation";
import Menu from "./pages/Menu";

const App = () => {
	return (
		<div className={`font-sans mx-auto  h-full`}>
			<ToastContainer />
			<main>
				<Outlet />
			</main>
			<Menu />
			<Navigation />
		</div>
	);
};

export default App;
