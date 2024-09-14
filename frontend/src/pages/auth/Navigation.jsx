import React, { useEffect, useState } from "react";
import {
	AiOutlineHome,
	AiOutlineLogin,
	AiOutlineLogout,
	AiOutlineUserAdd,
} from "react-icons/ai";
import { MdOutlineLocalMovies } from "react-icons/md";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useLoginMutation, useLogoutMutation } from "../../redux/api/user";

const Navigation = () => {
	const [dropDownOpen, setDropOpen] = useState(false);
	const url = useLocation().pathname;
	const dispatch = useDispatch();

	//redux
	const userInfo = useSelector((state) => state.auth.userInfo);
	const [logoutApicall] = useLogoutMutation();

	function toggleDropDown() {
		setDropOpen((prev) => (prev = !prev));
	}

	async function handleLogout() {
		try {
			await logoutApicall();
			dispatch(logout());
		} catch (error) {
			toast.error(error?.data?.message || error.message);
			console.log(error?.data?.message || error.message);
		}
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
				{!userInfo ? (
					<>
						<button
							className={`${url.includes("login") && "active"} hover:glass`}
						>
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
					</>
				) : (
					<>
						<dialog
							id="confirm_logout"
							className="modal modal-bottom sm:modal-middle"
						>
							<div className="modal-box">
								<h3 className="font-bold text-lg">Logout</h3>
								<p className="py-4">Are you sure want to be signed out ? </p>
								<div className="modal-action">
									<form method="dialog" className={`flex gap-4`}>
										<button className="btn">Cancel</button>
										<button className="btn bg-red-600" onClick={handleLogout}>
											Logout
										</button>
									</form>
								</div>
							</div>
						</dialog>
						<button
							className={`active:bg-red-300 hover:glass`}
							onClick={() =>
								document.getElementById("confirm_logout").showModal()
							}
						>
							<Link
								to="/"
								className={`flex flex-1 w-full items-center mx-auto justify-center text-red-500`}
							>
								<AiOutlineLogout />
							</Link>
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default Navigation;
