import React, { useEffect, useLayoutEffect, useState } from "react";
import {
	useCreateMovieMutation,
	useEditMovieMutation,
	useDeleteMovieMutation,
	useDeleteReviewMutation,
	useGetAllMoviesQuery,
	useGetAllReviewsQuery,
} from "../../redux/api/movie";
// import {data: allUsers, isLoading: isLoadingAllUsers} = useget
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";
import { AiFillStar } from "react-icons/ai";
import { useGetAllUsersQuery } from "../../redux/api/user";
import { toast } from "react-toastify";
import { useGetAllGenreQuery } from "../../redux/api/genre";

const Dashboard = () => {
	//redux
	const { data: movies, isLoading: isLoadingMovies } = useGetAllMoviesQuery();
	const [createMovie, { isLoading: isLoadingCreateMovie }] =
		useCreateMovieMutation();
	const [editMovie, { isLoading: isLoadingEditMovie }] = useEditMovieMutation();
	const [deleteMovie, { isLoading: isLoadingDeleteMovie }] =
		useDeleteMovieMutation();
	const [deleteReview, { isLoading: isLoadingDeleteReview }] =
		useDeleteReviewMutation();
	const { data: allReviews, isLoading: isLoadingAllReviews } =
		useGetAllReviewsQuery({});
	const { data: allUsers, isLoading: isLoadingAllUsers } = useGetAllUsersQuery(
		{}
	);
	const { data: allGenres } = useGetAllGenreQuery();
	//current dashboard component to show
	const [currentCompoenent, setCurrentComponent] = useState("movies-manager"); //default: my-dashboard

	//states for movies
	const [newMovies, setNewMovies] = useState({
		title: "",
		description: "",
		genres: [],
		image: "",
		casts: [],
		year: "",
	});

	if (
		isLoadingMovies ||
		isLoadingCreateMovie ||
		isLoadingEditMovie ||
		isLoadingDeleteMovie ||
		isLoadingDeleteReview
	)
		return (
			<div>
				<span className="loading loading-spinner loading-lg"></span>
			</div>
		);

	function handleOnChangeNewMovie(e) {
		e.preventDefault();
		const { name, value } = e.target;
		if (name == "genres" || name == "casts") {
			setNewMovies((prev) => ({
				...prev,
				[name]: value.split(","),
			}));
		}
		setNewMovies((prev) => ({ ...prev, [name]: value }));
	}

	function handleCreateNewMovie(e) {
		e.preventDefault();
		console.log(newMovies);
		// createMovie(newMovies);
		setNewMovies({
			title: "",
			description: "",
			genres: [],
			image: "",
			casts: [],
			year: "",
		});
	}

	function MyDashboard() {
		return (
			<div className={`flex flex-col gap-y-9 `}>
				<div className="flex max-md:flex-col  gap-3 justify-center ">
					<div className={`flex flex-col lg:w-1/2 w-full `}>
						<button className="btn w-full">
							<h2>Registered Users</h2>
							<div className="badge badge-secondary">+99</div>
						</button>
						<div className="comment">{}</div>
						<button className="btn">
							More
							<MdArrowDropDown />
						</button>
					</div>
					<div className={`flex flex-col lg:w-1/2 w-full`}>
						<button className="btn w-full">
							<h2>Latest Reviews</h2>
							<div className="badge badge-secondary">+99</div>
						</button>
						<div className="comment">//</div>
						<button className="btn">
							More
							<MdArrowDropDown />
						</button>
					</div>
				</div>
				<div className="flex  max-md:flex-col gap-3 justify-center">
					<div className={`flex flex-col lg:w-1/2 w-full`}>
						<button className="btn w-full">
							<h2>Created Movies</h2>
							<div className="badge badge-secondary">+99</div>
						</button>
						<div className="comment">//limited latest comment</div>
						<button className="btn">
							More
							<MdArrowDropDown />
						</button>
					</div>
					<div className={`flex flex-col lg:w-1/2 w-full`}>
						<button className="btn w-full">
							<h2>Latest comments</h2>
							<div className="badge badge-secondary">+99</div>
						</button>
						<div className="comment">//</div>
						<button className="btn">
							More
							<MdArrowDropDown />
						</button>
					</div>
				</div>
			</div>
		);
	}

	function MoviesManager() {
		return (
			<div className={` flex-col gap-y-4`}>
				<form
					onSubmit={handleCreateNewMovie}
					className={`w-96 mx-auto  justify-center mt-5 p-3 border rounded-md glass`}
				>
					<label className="w-full ">
						Title
						<input
							value={newMovies.title}
							onChange={handleOnChangeNewMovie}
							name="title"
							type="text"
							placeholder=""
							className="input  input-bordered w-full max-w-xs "
						/>
					</label>
				</form>
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
		);
	}

	function UsersManager() {
		return (
			<div className={`flex flex-col justify-center  max-md:w-full `}>
				{!isLoadingAllUsers ? (
					allUsers.data.map((user) => (
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
										{user.admin ? (
											<p className="text-red-500">Admin</p>
										) : (
											<p className="text-green-500">User</p>
										)}
									</div>
									<button className="btn btn-primary">Edit</button>
									<button className="btn bg-red-400">Delete</button>
								</div>
							</div>
						</div>
					))
				) : (
					<span className="loading loading-spinner loading-lg"></span>
				)}
			</div>
		);
	}

	function ReviewsManager() {
		return (
			<div>
				{allReviews ? (
					allReviews?.data?.map((review) => (
						<div className="card w-96 bg-primary lg:mt-4 mt-2 text-primary-content ">
							<div className="card-body">
								<h2 className="card-title badge align-middle p-3">
									{review.userName}
								</h2>
								<h3 className="font-bold">
									commented on :{" "}
									{
										movies.data.find((movie) => movie.id === review.movieId)
											?.title
									}
								</h3>
								<p>{review.comment}</p>
								<span className="flex gap-x-2 items-center">
									{Array.from({ length: review.rating }, (_, i) => (
										<AiFillStar key={i} className="text-warning" />
									))}{" "}
									stars
								</span>
								<div className="flex justify-between items-center">
									<div className="card-actions justify-end">
										<button className="btn bg-red-400">Delete</button>
									</div>
									<div className={``}>
										<span className={`badge-accent rounded-md px-4 mr-4`}>
											Created At:{" "}
										</span>
										<span>{review.createdAt.slice(0, 10)}</span>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<span className="loading loading-ring loading-lg"></span>
				)}
			</div>
		);
	}

	function CurrentComponent() {
		switch (currentCompoenent) {
			case "my-dashboard":
				return <MyDashboard />;
				break;
			case "movies-manager":
				return <MoviesManager />;
				break;
			case "reviews-manager":
				return <ReviewsManager />;
				break;
			case "users-manager":
				return <UsersManager />;
				break;
			default:
				break;
		}
	}

	return (
		<div className="flex flex-col  ">
			<div className="drawer z-20 ">
				<input
					id="my-drawer"
					type="checkbox"
					value={true}
					className="drawer-toggle"
				/>
				<div className="drawer-content w-full ">
					<label htmlFor="my-drawer" className="btn w-full text-start glass  ">
						Dashboard
						<MdArrowDropDown size={30} />
					</label>
				</div>
				<div className="drawer-side">
					<label
						htmlFor="my-drawer"
						aria-label="close sidebar"
						className="drawer-overlay"
					></label>
					<ul className="menu p-4 w-80 gap-y-3 min-h-full bg-base-200 text-base-content">
						{/* Sidebar content here */}
						<li>
							<button
								className="btn btn-accent"
								onClick={() => setCurrentComponent("my-dashboard")}
							>
								My dashboard
							</button>
						</li>
						<li>
							<button
								className="btn btn-accent"
								onClick={() => setCurrentComponent("movies-manager")}
							>
								Movies manager
							</button>
						</li>
						<li>
							<button
								className="btn btn-accent"
								onClick={() => setCurrentComponent("reviews-manager")}
							>
								Reviews Manager
							</button>
						</li>
						<li>
							<button
								className="btn btn-accent"
								onClick={() => setCurrentComponent("users-manager")}
							>
								Users manager
							</button>
						</li>
					</ul>
				</div>
			</div>
			<div className="block gap-y-3   ">
				<CurrentComponent />
			</div>
		</div>
	);
};

export default Dashboard;
