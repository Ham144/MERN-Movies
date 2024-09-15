import { setupListeners } from "@reduxjs/toolkit/query";
import React, { useState } from "react";
import { toast } from "react-toastify";

const GenreModal = ({ id, name, onUpdate, onDelete, updating, deleting }) => {
	const [newName, setNewname] = useState(name);

	return (
		<dialog className="modal">
			<dialog id="genremodal" className="modal">
				<form
					onSubmit={(e) => onUpdate(e, newName)}
					className="modal-box w-11/12 max-w-5xl "
				>
					<div className={`flex justify-between px-4`}>
						<h3 className="font-bold text-2xl mb-4 text-white">
							Editing The Genre
						</h3>
						<div className="badge badge-accent">id: {id}</div>
					</div>
					<label htmlFor="name" className="label text-white">
						Name
					</label>
					<input
						value={newName}
						onChange={(e) => setNewname(e.target.value)}
						id="name"
						type="text"
						placeholder=""
						className="input input-bordered w-full text-white "
					/>
					<div className="modal-action justify-between">
						<form method="dialog" className={`flex justify-between  w-full`}>
							<button
								type="button"
								className={`btn btn-outline text-red-300 ${
									deleting && "loading"
								}`}
								onClick={onDelete}
							>
								Delete
							</button>
							<div className={`flex gap-x-4 self-end`}>
								<button className="btn">Close</button>
								<button
									type="submit"
									className={`btn btn-primary ${updating && "loading"}`}
								>
									Update
								</button>
							</div>
						</form>
					</div>
				</form>
			</dialog>
		</dialog>
	);
};

export default GenreModal;
