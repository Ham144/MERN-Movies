import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import { toast } from "react-toastify";

const Login = () => {
	function handleLogin(e) {
		e.preventDefault();

		toast.error("fix the fields usestate");
	}

	return (
		<>
			<form
				onSubmit={handleLogin}
				className="card  glass lg:w-[400px] w-[93%] mx-auto self-center flex justify-center items-center p-4 translate-y-8"
			>
				<h3 className="card-title self-start py-4">Sign in</h3>
				<div className="form-control w-full max-w-xs">
					<label className="label">email?</label>
					<input
						type="text"
						placeholder="alextaylor@me.com"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="form-control w-full max-w-xs">
					<label className="label">password?</label>
					<input
						type="password"
						placeholder="password"
						className="input input-bordered w-full max-w-xs"
					/>
				</div>
				<div className="py-5">
					<button className="btn" type="submit">
						Login
						<div className="badge">
							<MdLogin />
						</div>
					</button>
				</div>
			</form>
		</>
	);
};

export default Login;
