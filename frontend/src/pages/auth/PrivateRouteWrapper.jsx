import React from "react";
import { ReactReduxContext, useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router";
import { toast } from "react-toastify";

const PrivateRouteWrapper = () => {
	//redux
	const userInfo = useSelector((state) => state.auth.userInfo);

	if (!userInfo) {
		toast.warn("Please login first");
	}

	return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRouteWrapper;
