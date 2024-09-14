import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { prisma } from "../../../../../backend/utils/database/prisma";
import { useProfileMutation } from "../../../redux/api/user";
import { MdUpdate } from "react-icons/md";
import { retry } from "@reduxjs/toolkit/query";

const Profile = () => {
	//redux
	const userInfo = useSelector((state) => state.auth.userInfo);
	const [profile, { isLoading }] = useProfileMutation();
	const dispatch = useDispatch();

	//states for profile
	const username = userInfo.data.username;
	const [email, setEmail] = useState("");
	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [isAdmin, setIsAdmin] = useState();
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	//others
	const errors = {
		name: [],
		email: [],
		phone: [],
		password: [],
	};

	function initializationState() {
		setEmail(userInfo.data.email);
		setName(userInfo.data.name);
		setPhone(userInfo.data.phone);
		setIsAdmin(userInfo.data.isAdmin);
	}

	async function handlePatchProfile(e) {
		e.preventDefault();

		if (!username) return toast.error("something wrong");
		else if (!name) errors.email.push("email required");
		else if (!email) errors.email.push("email required");
		if (phone) {
			if (typeof phone !== "number")
				return errors.phone.push("phone should be number");
			else if (phone.length < 5) return errors.phone.push("phone length min 5");
		}
		try {
			//patch profile
		} catch (error) {
			toast.error(error?.data?.errors || error.message);
			console.log(error?.data?.errors || error.message);
		}
	}

	useEffect(() => {
		initializationState();
	}, [userInfo.data]);

	return (
		<form
			className="card glass lg:w-[400px] w-[93%] h-[90%] mb-24 mx-auto self-center flex justify-center items-center p-4 translate-y-8"
			onSubmit={handlePatchProfile}
		>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text font-serif">username</span>
				</label>
				<input
					type="text"
					value={username}
					className="input input-bordered w-full max-w-xs"
					disabled
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text font-serif">account name</span>
					<span className="label-text-alt text-red-300">
						{errors.name.join(",") || null}
					</span>
				</label>
				<input
					value={name}
					onChange={(e) => setName(e.target.value)}
					type="text"
					placeholder="new account name"
					className="input input-bordered w-full max-w-xs"
				/>
			</div>

			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text font-serif">email</span>
					<span className="label-text-alt text-red-300">
						{errors.email.join(", ") || null}
					</span>
				</label>
				<input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					type="email"
					placeholder="new account name"
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text font-serif">phone</span>
					<span className="label-text-alt text-red-300">
						{errors.phone.join(", ") || null}
					</span>
				</label>
				<input
					value={phone}
					onChange={(e) => setPhone(e.target.value)}
					type="text"
					inputMode="numeric"
					placeholder="628....."
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text font-serif">change password?</span>
					<span className="label-text-alt text-red-300">
						{errors.password.join(", ") || null}
					</span>
				</label>
				<input
					value={password}
					onChange={(e) => setPassword(e.target.value)}
					type="text"
					placeholder="input new password"
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<div className="form-control w-full max-w-xs">
				<label className="label">
					<span className="label-text font-serif">confirm new password</span>
					<span className="label-text-alt text-red-300">
						{errors.password.join(", ") || null}
					</span>
				</label>
				<input
					value={confirmPassword}
					onChange={(e) => setConfirmPassword(e.target.value)}
					type="text"
					placeholder="type again password"
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<select className="select select-bordered w-full max-w-xs mt-5">
				<option
					value="ADMIN"
					selected={userInfo.data.isAdmin == "ADMIN" && true}
				>
					ADMIN
				</option>
				<option
					value="REGULER"
					selected={userInfo.data.isAdmin == "REGULER" && true}
				>
					REGULER
				</option>
			</select>
			<button className="btn mt-5">
				Update
				<div className="badge">
					<MdUpdate />
				</div>
			</button>
		</form>
	);
};

export default Profile;
