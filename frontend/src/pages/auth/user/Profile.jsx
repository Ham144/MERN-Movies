import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { toast } from "react-toastify";
import { useProfileMutation } from "../../../redux/api/user";
import { MdUpdate } from "react-icons/md";
import { setCredentials } from "../../../redux/features/auth/authSlice";
import bcrypt from "bcryptjs";

const Profile = () => {
	//redux
	const userInfo = useSelector((state) => state.auth.userInfo);
	const [updateProfile, { isLoading }] = useProfileMutation();
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
	const [errors, setErrors] = useState({
		name: [],
		email: [],
		phone: [],
		password: [],
	});

	function initializationState() {
		setEmail(userInfo.data.email);
		setName(userInfo.data.name);
		setPhone(userInfo.data.phone);
		setIsAdmin(userInfo.data.isAdmin);
	}

	async function handlePatchProfile(e) {
		e.preventDefault();
		setErrors({ name: [], email: [], phone: [], password: [] });
		if (!username) toast.error("something wrong");
		if (!name) setErrors((errors) => ({ ...errors, name: ["name required"] }));
		if (!email)
			setErrors((errors) => ({ ...errors, email: ["email required"] }));

		if (phone) {
			if (phone.split("").some((item) => isNaN(item)))
				return setErrors((errors) => ({
					...errors,
					phone: ["phone must be number"],
				}));
			else if (phone.length <= 5)
				return setErrors((errors) => ({
					...errors,
					phone: ["phone must be greater than 5"],
				}));
		}
		if (password) {
			if (password !== confirmPassword)
				return setErrors((errors) => ({
					...errors,
					password: ["new password not match"],
				}));
		}
		const hashedPassword = bcrypt.hashSync(password, 10);
		try {
			//patch profile
			const result = await updateProfile({
				username,
				email,
				name,
				phone,
				isAdmin,
				password: hashedPassword,
			}).unwrap();
			dispatch(setCredentials({ ...result }));
			toast.success(result.message);
		} catch (error) {
			toast.error(error?.data?.errors || error.message);
			console.log(error?.data?.errors || error.message);
		}
	}

	console.log(errors);

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
					type="password"
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
					type="password"
					placeholder="type again password"
					className="input input-bordered w-full max-w-xs"
				/>
			</div>
			<select
				className={`select select-bordered w-full max-w-xs mt-5 ${
					userInfo?.data?.isAdmin == "REGULER" && "animate-pulse"
				}`}
				onChange={(e) => setIsAdmin(e.target.value)}
			>
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
			<button
				className={`btn mt-5 ${isLoading && "loading"}`}
				disabled={isLoading}
			>
				Update
				<div className="badge">
					<MdUpdate />
				</div>
			</button>
		</form>
	);
};

export default Profile;
