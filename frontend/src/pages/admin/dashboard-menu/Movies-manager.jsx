import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	useCreateMovieMutation,
	useDeleteMovieMutation,
	useGetAllMoviesQuery,
} from "../../../redux/api/movie";
import { useGetAllGenreQuery } from "../../../redux/api/genre";
import {
	useDeleteImageMutation,
	useUploadImageMutation,
} from "../../../redux/api/upload";
import { MdStar } from "react-icons/md";

const MoviesManager = React.memo(() => {
	//redux
	const {
		data: movies,
		isLoading: isLoadingMovies,
		refetch,
	} = useGetAllMoviesQuery();
	const { data: allGenres } = useGetAllGenreQuery();
	const [createMovie, { isLoading: isLoadingCreateMovie, error: errorMovie }] =
		useCreateMovieMutation();
	const [
		uploadImage,
		{ isLoading: isLoadingUploadImg, error: uploadImgError },
	] = useUploadImageMutation();
	const [deleteMovie, { error: errorDeleteMovie }] = useDeleteMovieMutation();
	const [deleteImage, { error: errorDeleteImage }] = useDeleteImageMutation();

	//states for new movie
	const [newMovies, setNewMovies] = useState({
		title: "",
		description: "",
		genres: [],
		image: undefined,
		casts: [],
		year: undefined,
	});
	const [imagePreviewUrl, setImagePreviewUrl] = useState();

	async function handleCreateNewMovie(e) {
		e.preventDefault();

		if (typeof newMovies.casts != "object") {
			if (newMovies.casts.includes(",")) {
				newMovies.casts = newMovies.casts.split(",");
			} else {
				newMovies.casts = [newMovies.casts];
			}
		}

		if (typeof newMovies.year == "string") {
			setNewMovies((prev) => ({
				...prev,
				year: parseInt(newMovies.year),
			}));
		}

		try {
			if (
				!newMovies.title ||
				!newMovies.casts ||
				!newMovies.description ||
				!newMovies.year
			) {
				return toast.error("all fields are required");
			}
			if (!newMovies.genres) {
				return toast.error("genre is required");
			}

			if (!newMovies.image) {
				return toast.warn("image is required");
			}

			if (
				!newMovies.image ||
				!newMovies.casts.length ||
				!newMovies.year ||
				!newMovies.description ||
				!newMovies.genres.length ||
				!newMovies.title
			) {
				return toast.error("all fields are required");
			}

			const createResult = await createMovie(newMovies);
			if (createResult.error) {
				return toast.error(createResult.error || createResult.message);
			}
			refetch();
			console.log(createResult);
			toast.success("movie created successfully");
		} catch (error) {
			console.log(uploadImgError.message);
			return toast.error(uploadImgError.message);
		}
	}

	async function handleChangeNewMovie(e) {
		e.preventDefault();
		const { name, value } = e.target;

		if (name == "year") {
			const intValue = parseInt(value);
			if (isNaN(intValue)) {
				setNewMovies((prev) => ({
					...prev,
					year: null,
				}));
				return toast.error("year should be number");
			} else {
				setNewMovies((prev) => ({
					...prev,
					year: +value,
				}));
			}
		} else if (name === "genres") {
			if (e.target.checked) {
				setNewMovies((prev) => ({
					...prev,
					genres: [...prev.genres, +value],
				}));
			} else {
				setNewMovies((prev) => ({
					...prev,
					genres: prev.genres.filter((genre) => genre !== +value),
				}));
			}
			return;
		} else if (name == "image") {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.readAsDataURL(file); // Read the file as a data URL
				reader.onloadend = () => {
					setImagePreviewUrl(reader.result);
				};
			}

			try {
				const formData = new FormData();
				formData.append("image", file);

				const uploadImgResult = await uploadImage(formData);
				if (uploadImgResult.data) {
					setNewMovies((prev) => ({
						...prev,
						image: uploadImgResult.data.data,
					}));
					toast.success("image is ready!");
				}
			} catch (error) {
				console.log(error);
				toast.error(error.message);
			}
		} else {
			return setNewMovies((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	}

	function handleDeleteMovie(id, path) {
		if (!id || !path) {
			return toast.error("something went wrong");
		}
		deleteMovie({ id })
			.then(async () => {
				await deleteImage(JSON.stringify({ path }));
			})
			.then(() => {
				toast.success("deleted successfully");
				refetch();
			})
			.catch((err) => toast.error("failed to delete : ", err.data.errors));
	}

	function GenerateStars() {
		return (
			<>
				<MdStar />
				<MdStar />
				<MdStar />
				<MdStar />
			</>
		);
	}

	return (
		<div
			className={`flex max-md:flex-col   gap-y-4 min-h-screen overflow-y-scroll  pb-20`}
		>
			<form
				onSubmit={handleCreateNewMovie}
				className={`flex flex-col items-center p-4 mx-auto  justify-center mt-5  border rounded-md glass `}
			>
				<label className="w-full block ">
					<p>Title</p>
					<input
						value={newMovies.title}
						onChange={handleChangeNewMovie}
						name="title"
						type="text"
						placeholder="title.."
						className="input  input-bordered w-full max-w-xs "
					/>
				</label>

				<label className="w-full block ">
					<p>Year</p>
					<input
						value={newMovies.year}
						onChange={handleChangeNewMovie}
						name="year"
						type="number"
						placeholder="year.."
						inputMode="numeric"
						className="input  input-bordered w-full max-w-xs "
					/>
				</label>

				<label className="w-full ">
					Description
					<textarea
						value={newMovies.description}
						onChange={handleChangeNewMovie}
						name="description"
						type="text"
						placeholder="description.."
						className="input  input-bordered w-full max-w-xs "
					/>
				</label>

				<label className="w-full text-start block">
					<p>Genres</p>

					<div className={`grid grid-cols-3 self-center   justify-center  `}>
						{allGenres &&
							allGenres.data.map((genre) => (
								<div className="block text-center py-3 hover:glass rounded-sm">
									<input
										type="checkbox"
										name="genres"
										value={genre.id}
										onChange={handleChangeNewMovie}
										className="checkbox"
									/>
									<p>{genre.name}</p>
								</div>
							))}
					</div>
				</label>

				<label className="w-full text-start">
					<p>Casts ("please use comma for separate")</p>
					<input
						value={newMovies.casts}
						onChange={handleChangeNewMovie}
						name="casts"
						type="text"
						placeholder="casts.."
						className="input  input-bordered w-full max-w-xs "
					/>
				</label>

				<input
					type="file"
					accept="image/*"
					name="image"
					onChange={handleChangeNewMovie}
					placeholder="image"
					className="py-3"
				/>

				<div className={`w-full max-w-xs`}>
					{imagePreviewUrl && (
						<img
							src={imagePreviewUrl}
							alt="image"
							className={`w-full h-36 object-cover`}
						/>
					)}
				</div>

				{/* ========= */}
				<button
					type="submit"
					disabled={
						isLoadingCreateMovie ||
						isLoadingUploadImg ||
						!newMovies.image ||
						!newMovies.genres.length > 0 ||
						!newMovies.title ||
						!newMovies.description
					}
					className={`btn btn-neutral mt-2 ${
						isLoadingCreateMovie && "loading"
					}`}
				>
					Create
				</button>
			</form>
			<div className="flex flex-col">
				{movies ? (
					movies?.data?.map((movie) => (
						<div className="card card-side bg-base-100 shadow-xl lg:mt-5 mt-3 rounded-l-lg max-md:flex max-md:flex-col ">
							<div
								className={`button absolute md:flex w-full block z-10 justify-end  gap-x-3 p-3`}
							>
								<button
									className="btn border-red-300 bg-transparent hover:bg-red-300 px-3 max-md:mr-3"
									onClick={() => handleDeleteMovie(movie.id, movie.image)}
								>
									Delete
								</button>
								<button className="btn ">Edit</button>
							</div>
							<figure>
								<img src={movie.image} alt="Movie" className="w-96" />
							</figure>
							<div className="card-body">
								<div className="flex flex-col self-start  gap-x-4  gap-y-2 w-full">
									<h2 className="card-title ">
										{movie.title[0].toUpperCase() + movie.title.slice(1)}
									</h2>
									<span
										className={` flex items-center gap-x-3 badge-primary  p-2 rounded-md  `}
									>
										{movie.year}
										<GenerateStars />
									</span>
								</div>

								<p>{movie.description}</p>
								{/* //genres */}
								<span className={`flex gap-x-3`}>
									{movie.genres?.map((genre) => (
										<div className="badge badge-primary">{genre.name}</div>
									))}
								</span>
								{/* //casts */}
								<span className="flex gap-x-3">
									{movie.casts?.map((cast) => (
										<div className="badge badge-primary">{cast}</div>
									))}
								</span>
								<div className="card-actions justify-end max-md:absolute right-3">
									<button className="btn btn-primary">Watch</button>
								</div>
								<div className="meta-data lg:pt-9 pt-4 text-white">
									<span className={`badge`}>
										Upload : {new Date(movie.uploadAt).toDateString()}
									</span>
									<span className={`badge`}>
										latest updated: {new Date(movie.updatedAt).toDateString()}
									</span>
									<span className={`badge`}>
										Revies count: {movie?.reviews?.length || 0}
									</span>
								</div>
							</div>
						</div>
					))
				) : (
					<span className="loading loading-spinner loading-lg"></span>
				)}
			</div>
		</div>
	);
});

export default MoviesManager;
