import React, { useState } from "react";
import { MdLogin } from "react-icons/md";
import { toast } from "react-toastify";
import { useLoginMutation } from "../../redux/api/user";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { useNavigate } from "react-router";

const Login = () => {
	//required filed for login
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	//redux
	const dispatch = useDispatch();
	const [login, { isLoading }] = useLoginMutation();
	const userInfo = useSelector((state) => state.auth.userInfo);

	//others
	const navigate = useNavigate();

	if (userInfo) return navigate("/movies");

	async function handleLogin(e) {
		e.preventDefault();
		try {
			const user = await login({
				email,
				password,
			}).unwrap();

			dispatch(setCredentials({ ...user }));
			toast.success("Logged in success");
			navigate("/movies");
		} catch (error) {
			toast.error(error?.data?.errors || error?.message);
			console.log(error?.data?.errors || error?.message);
		}
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
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
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
				<div className="py-5">
					<button className={`btn ${isLoading && "loading"}`} type="submit">
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
