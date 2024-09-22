import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
	useCreateMovieMutation,
	useGetAllMoviesQuery,
} from "../../../redux/api/movie";
import { useGetAllGenreQuery } from "../../../redux/api/genre";
const MoviesManager = React.memo(() => {
	//redux
	const { data: movies, isLoading: isLoadingMovies } = useGetAllMoviesQuery();
	const { data: allGenres } = useGetAllGenreQuery();
	const [createMovie, { isLoading: isLoadingCreateMovie }] =
		useCreateMovieMutation();

	//states for new movie
	const [newMovies, setNewMovies] = useState({
		title: "",
		description: "",
		genres: [],
		image: undefined,
		casts: [],
		year: "",
	});
	const [imagePreviewUrl, setImagePreviewUrl] = useState();
	const [selectedImage, setSelectedImage] = useState();

	async function handleCreateNewMovie(e) {
		e.preventDefault();
		console.log(newMovies);
		// await createMovie(newMovies);
		// setNewMovies({
		// 	title: "",
		// 	description: "",
		// 	genres: [],
		// 	image: "",
		// 	casts: [],
		// 	year: "",
		// });
	}

	function handleChangeNewMovie(e) {
		e.preventDefault();
		const { name, value } = e.target;

		if (name == "casts") {
			newMovies.genres.push(value);
		}

		if (name == "year" && isNaN(value)) {
			toast.error("year should be number");
			setNewMovies((prev) => ({
				...prev,
				year: null,
			}));
		}
		if (name === "genres") {
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
		}

		if (name == "image") {
			const file = e.target.files[0];
			if (file) {
				const reader = new FileReader();
				reader.readAsDataURL(file); // Read the file as a data URL
				reader.onloadend = () => {
					setImagePreviewUrl(reader.result);
				};

				setSelectedImage(file);
				toast.success(selectedImage);
			}
		}

		setNewMovies((prev) => ({
			...prev,
			[name]: value,
		}));
		// createMovie(newMovies);
	}

	return (
		<div className={`flex max-md:flex-col  gap-y-4 `}>
			<form
				onSubmit={handleCreateNewMovie}
				className={`flex flex-col items-center w-96 mx-auto  justify-center mt-5 p-3 border rounded-md glass `}
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
						type="text"
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

					<div className={`flex mx-auto gap-x-2 justify-start`}>
						{allGenres &&
							allGenres.data.map((genre) => (
								<>
									<input
										type="checkbox"
										name="genres"
										value={genre.id}
										onChange={handleChangeNewMovie}
										className="checkbox"
									/>
									<p>{genre.name}</p>
								</>
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
				/>

				<div className={`w-full max-w-xs`}>
					{newMovies.image && (
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
					className={`btn btn-neutral ${isLoadingCreateMovie && "loading"}`}
				>
					Create
				</button>
			</form>
			<div className="flex flex-col">
				{movies ? (
					movies?.data?.map((movie) => (
						<div className="card card-side bg-base-100 shadow-xl lg:mt-5 mt-3">
							<div className={`button absolute flex w-full justify-between`}>
								<button className="btn bg-red-400 px-3">Delete</button>
								<button className="btn ">Edit</button>
							</div>
							<figure>
								<img src={movie.image} alt="Movie" />
							</figure>
							<div className="card-body">
								<h2 className="card-title">{movie.title}</h2>
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
								<div className="card-actions justify-end">
									<button className="btn btn-primary">Watch</button>
								</div>
								<div className="meta-data lg:pt-9 pt-4 text-white">
									<span className={`badge`}>{movie.year}</span>
									<span className={`badge`}>upload: {movie.uploadAt}</span>
									<span className={`badge`}>
										latest updated: {movie.updatedAt}
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
