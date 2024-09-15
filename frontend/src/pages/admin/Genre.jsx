import React, { useEffect, useState } from "react";
import {
	useCreateGenreMutation,
	useDeleteGenreMutation,
	useGetAllGenreQuery,
	useUpdateGenreMutation,
} from "../../redux/api/genre";
import { useNavigate } from "react-router";
import GenreCreator from "../../components/GenreCreator";
import GenreModal from "../../components/GenreModal";
import { toast } from "react-toastify";

const Genre = () => {
	//redux
	const [createGenre, { isLoading: creating }] = useCreateGenreMutation();
	const [updateGenre, { isLoading: updating }] = useUpdateGenreMutation();
	const [deleteGenre, { isLoading: deleting }] = useDeleteGenreMutation();
	const { data, isLoading: getting, refetch } = useGetAllGenreQuery();

	//states for modal
	const [selectedName, setSelectedName] = useState();
	const [selectedId, setSelectedId] = useState();

	//state for creating new genre
	const [newGenereName, setNewGenereName] = useState("");

	//others
	const navigate = useNavigate();

	async function handleUpdateGenre(e, newName) {
		e.preventDefault();
		if (!newName) {
			return toast.warn("genre name should be filled");
		} else if (newName.length > 35) {
			return toast.warn("genre name should be less than 35 characters");
		}

		try {
			const result = await updateGenre({
				id: selectedId,
				name: newName,
			}).unwrap();
			if (result.erorr) {
				return toast.error(result.erorr);
			}
			refetch();
			toast.success("genre updated successfully");
		} catch (error) {
			toast.error(error?.data?.errors || error.message);
			console.log(error?.data?.erorrs || error.message);
		}
	}

	async function handleDeleteGenre(id) {
		setSelectedId(id);
		try {
			await deleteGenre({
				id: selectedId,
			}).unwrap();
			refetch();
			toast.success("genre deleted successfully");
		} catch (error) {
			toast.error(error?.data?.errors || error.message);
			console.log(error?.data?.errors || error.message);
		}
	}

	async function handleCreateGenre(e) {
		e.preventDefault();
		if (!newGenereName) {
			return toast.warn("newGenereName should be filled");
		} else if (newGenereName.length > 35) {
			return toast.warn("newGenereName should be less than 35 characters");
		} else if (newGenereName.length <= 3) {
			return toast.warn("newGenereName should be more than 3 characters");
		} else if (newGenereName.split("").some((char) => !isNaN(char))) {
			return toast.warn("newGenereName should be string");
		} else {
			try {
				const result = await createGenre({
					name: newGenereName.toLowerCase(),
				}).unwrap(); //unwrap penting kali untuk bisa keluar error.data.errors dibawah
				if (result.error) {
					return toast.error(result.error);
				}
				refetch();
				setNewGenereName("");
				toast.success("genre created successfully");
			} catch (error) {
				toast.error(error?.data?.errors || error.message);
				console.log(error?.data?.errors || error.message);
			}
		}
	}

	function handleEditGenre(id, name) {
		setSelectedId(id);
		setSelectedName(name);
		document.getElementById("genremodal").showModal();
	}

	function GenreItem({ id, name }) {
		return (
			<div className="card w-96 mx-auto bg-primary text-primary-content  hover:bg-secondary duration-200">
				<button
					className="btn btn-neutral self-end m-2 absolute text-red-400"
					onClick={() => document.getElementById("confirmDelete").showModal()}
				>
					Delete
				</button>
				<dialog id="confirmDelete" className="modal">
					<div className="modal-box">
						<h3 className="font-bold text-lg text-white">Delete</h3>
						<p className="py-4 text-white">Are You suer want to delete?</p>
						<div className="modal-action">
							<form method="dialog" className="flex gap-x-4">
								<button className="btn">Close</button>
								<button className="btn btn-primary " type="submit">
									Delete
								</button>
							</form>
						</div>
					</div>
				</dialog>
				<div className="card-body ">
					<h2 className="card-title">{name}</h2>
					<div className="card-actions justify-between ">
						<button
							onClick={() => handleEditGenre(id, name)}
							className="btn btn-circle btn-outline hover:scale-110 "
						>
							Edit
						</button>
						<button
							className="btn"
							onClick={() => navigate("/movies?genre=" + id + "")}
						>
							All movies with this genre
						</button>
					</div>
					<GenreModal
						id={selectedId}
						name={selectedName}
						onDelete={handleDeleteGenre}
						onUpdate={handleUpdateGenre}
						updating={updating}
						deleting={deleting}
						setSelectedName={(e) => setSelectedName(e.target.value)}
						key={id}
					/>
				</div>
			</div>
		);
	}

	return (
		<div className="flex flex-col justify-center items-center gap-5 mx-auto ">
			<div
				className={`max-md:flex lg:grid grid-cols-3 mx-auto items-center justify-center  flex-col mt-5 gap-y-6 mb-32 gap-5 text-center `}
			>
				<GenreCreator
					onCreate={handleCreateGenre}
					creating={creating}
					newGenereName={newGenereName}
					setNewGenereName={(string) => setNewGenereName(string)}
				/>
				{getting ? (
					<span className="loading loading-spinner loading-lg mx-auto self-center text-center absolute"></span>
				) : (
					data?.data
						.slice(0)
						.reverse()
						.map((genre) => (
							<GenreItem key={genre.id} id={genre.id} name={genre.name} />
						))
				)}
			</div>
		</div>
	);
};

export default Genre;
