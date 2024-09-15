import React, { useState } from "react";
import { toast } from "react-toastify";

console.log();
const GenreCreator = ({
	onCreate,
	creating,
	newGenereName,
	setNewGenereName,
}) => {
	return (
		<form
			onSubmit={(e) => onCreate(e)}
			className="form-control w-full max-w-xs gap-y-3 self-center mx-auto justify-center pr-0"
		>
			<label className="label">
				<span className="label-text">Create New Genre</span>
				{/* <span className="label-text-alt text-red-300">error</span> */}
			</label>
			<input
				value={newGenereName}
				onChange={(e) => setNewGenereName(e.target.value)}
				type="text"
				placeholder="Type here"
				className="input input-bordered w-full max-w-xs"
			/>
			<button className={`btn glass ${creating && "loading"}`} type="submit">
				Create
			</button>
		</form>
	);
};

export default GenreCreator;
