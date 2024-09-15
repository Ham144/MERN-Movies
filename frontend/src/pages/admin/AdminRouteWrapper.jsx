import { Navigate, Outlet } from "react-router";

import { useSelector } from "react-redux";

import React from "react";
import { toast } from "react-toastify";

const AdminRouteWrapper = () => {
	const userInfo = useSelector((state) => state.auth.userInfo);

	if (!userInfo) {
		toast.warn("Please login first");
		return <Navigate to={"/login"} replace={true} />;
	} else if (userInfo?.data?.isAdmin !== "ADMIN") {
		toast.warn("You should be an Admin to visit certain page ");
		return <Navigate to={"/profile"} replace={true} />;
	} else {
		return <Outlet />;
	}
};

export default AdminRouteWrapper;
