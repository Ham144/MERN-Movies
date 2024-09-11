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

const Navigation = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { userInfo } = useSelector((state) => state.auth);

	const [dropDownOpen, setDropOpen] = useState(false);

	//redux api

	function toggleDropDown() {
		setDropOpen((prev) => (prev = !prev));
	}

	return (
		<div className={`fixed`}>
			<section className="flex justify-center items-center">
				<div className="flex">
					<Link to={"/"} className="">
						<AiOutlineHome size={25} />
						<span>Home</span>
					</Link>
				</div>
			</section>
		</div>
	);
};

export default Navigation;
