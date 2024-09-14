import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router";

const PrivateRouteWrapper = () => {
	//redux
	const userInfo = useSelector((state) => state.auth.userInfo);

	//others
	const navigate = useNavigate();

	return userInfo ? <Outlet /> : <Navigate to={"/login"} replace />;
};

export default PrivateRouteWrapper;
