import React, { useState } from "react";
import {
	useDeleteUserMutation,
	useGetAllUsersQuery,
	useProfileMutation,
} from "../../../redux/api/user";

function UsersManager() {
	//redux
	const { data: allUsers, isLoading: isLoadingAllUsers } =
		useGetAllUsersQuery();
	const [deleteUser, { error: errorDeleteUser }] = useDeleteUserMutation();
	const [upadateUser, { error: errorUpdateUser }] = useProfileMutation();

	//states for update
	const [confirmPassword, setConfirmPassword] = useState("");
	const userData = {
		username: "",
		name: "",
		email: "",
		password: "",
		isAdmin: undefined,
		phone: "",
	};

	async function handleDeleteUser(username) {
		if (!username) {
			return toast.error("something went wrong");
		}
		deleteUser(username)
			.then(() => {
				toast.success("deleted successfully");
				refetch();
			})
			.catch((err) => toast.error("failed to delete : ", err?.data.errors));
	}

	async function handleUpdateUser(e, username) {
		e.preventDefault();
		if (!username) {
			return toast.error("something went wrong");
		}
		upadateUser(username)
			.then(() => {
				toast.success("updated successfully");
				refetch();
			})
			.catch((err) => toast.error("failed to update : ", err?.data.errors));
	}

	return (
		<div className={`flex flex-col justify-center  max-md:w-full `}>
			{!isLoadingAllUsers ? (
				allUsers?.data?.map((user) => (
					<div className="card w-96 bg-base-100 shadow-xl ">
						<div className="card-body font-bold font-serif relative">
							<h2 className="card-title items-center">
								{user.username} ~ <span className="badge">{user.name}</span>
							</h2>

							<p>Email: {user.email}</p>
							<p>Role: {user?.isAdmin}</p>
							<div className={`absolute left-3 bottom-3`}></div>
							<div className="card-actions justify-between mt-4 items-center ">
								<div>
									{user.isAdmin == "ADMIN" ? (
										<p className="text-red-500">Admin</p>
									) : (
										<p className="text-green-500">Reguler</p>
									)}
								</div>
								<button
									className="btn btn-primary"
									onClick={() =>
										document.getElementById("update_modal").showModal()
									}
								>
									Edit
								</button>
								<button
									className="btn bg-red-400"
									onClick={() => handleDeleteUser(user.username)}
								>
									Delete
								</button>
							</div>
						</div>
					</div>
				))
			) : (
				<span className="loading loading-spinner loading-lg"></span>
			)}

			<dialog id="update_modal" className="modal">
				<div className="modal-box">
					<h3 className="font-bold text-lg">Hello!</h3>
					<div className={`body gap-y-4 flex flex-col`}>
						<input
							type="text"
							placeholder="name"
							className="input input-bordered input-accent w-full max-w-xs"
						/>
						<input
							type="text"
							placeholder="email"
							className="input input-bordered input-accent w-full max-w-xs"
						/>
					</div>
					<div className="modal-action">
						<form method="dialog " onSubmit={handleUpdateUser}>
							<div className="flex gap-x-4">
								<button
									className="btn"
									onClick={() =>
										document.getElementById("update_modal").close()
									}
								>
									Close
								</button>
								<button type="submit" className="btn btn-primary">
									update
								</button>
							</div>
						</form>
					</div>
				</div>
			</dialog>
		</div>
	);
}
export default UsersManager;
