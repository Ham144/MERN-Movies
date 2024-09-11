import React, { useState } from "react";
import {
	AiOutlineHome,
	AiOutlineLogin,
	AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";

const Navigation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const url = window.location.pathname;

	const userInfo = useSelector((state) => state.auth.userInfo);

	const [dropDownOpen, setDropOpen] = useState(false);

	function toggleDropDown() {
		setDropOpen((prev) => (prev = !prev));
	}

	return (
		<div className={`fixed`}>
			<div className="btm-nav">
				<button className={`${url.length < 2 && "active"} hover:glass`}>
					<Link
						to="/"
						className={`flex flex-1 w-full items-center mx-auto justify-center`}
					>
						<AiOutlineHome />
					</Link>
				</button>
				<button className={`${url.includes("movies") && "active"} hover:glass`}>
					<Link
						to="/movies"
						className={`flex flex-1 w-full items-center mx-auto justify-center`}
					>
						<MdOutlineLocalMovies />
					</Link>
				</button>
				<button className={`${url.includes("login") && "active"} hover:glass`}>
					<Link
						to="/login"
						className={`flex flex-1 w-full items-center mx-auto justify-center`}
					>
						<AiOutlineLogin />
					</Link>
				</button>
				<button
					className={`${url.includes("register") && "active"} hover:glass`}
				>
					<Link
						to="/register"
						className={`flex flex-1 w-full items-center mx-auto justify-center`}
					>
						<AiOutlineUserAdd />
					</Link>
				</button>
			</div>
		</div>
	);
};

export default Navigation;
