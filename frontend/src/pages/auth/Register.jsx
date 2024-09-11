import React, { useState } from "react";
import { MdAppRegistration } from "react-icons/md";
import { toast } from "react-toastify";

const Register = () => {
	//required field for registration
	const [username, setUsername] = useState("");
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [error, setError] = useState([]);

	//redux

	function handleRegister(e) {
		e.preventDefault();

		if (!username || !name || !email || !password || !confirmPassword) {
			return toast.error("All fields are required");
		} else if (password !== confirmPassword) {
			return setError((error) => [...error, "passwords not match"]);
		} else {
			setError([]);
			toast.success("registered continue");
		}
	}

	return (
		<>
			<form
				onSubmit={handleRegister}
				className="card  glass lg:w-[400px] w-[93%] mx-auto self-center flex justify-center items-center p-4 translate-y-8"
			>
				<h3 className="card-title self-start py-4">Register</h3>
				<div className="form-control w-full max-w-xs">
					<label className="label">username?</label>
					<input
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						type="text"
						placeholder="alex24"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">nick name?</label>
					<input
						value={name}
						onChange={(e) => setName(e.target.value)}
						type="text"
						placeholder="alex taylor"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">email?</label>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="email"
						placeholder="alextaylor@me.com"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">password?</label>
					<input
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						type="password"
						placeholder="password"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">
						confirm password?
						{error.find((err) => err == "passwords not match") && (
							<label className="badge bg-red-500">password not match</label>
						)}
					</label>

					<input
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						type="password"
						placeholder="confirm password"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="py-5">
					<button className="btn" type="submit">
						Register
						<div className="badge">
							<MdAppRegistration />
						</div>
					</button>
				</div>
			</form>
		</>
	);
};

export default Register;
