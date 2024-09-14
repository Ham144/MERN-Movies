import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navigation from "./pages/auth/Navigation";
import { retry } from "@reduxjs/toolkit/query";
import Menu from "./pages/Menu";

const App = () => {
	return (
		<div className={`font-sans mx-auto px-5 h-full`}>
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
