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
import MoviesManager from "./dashboard-menu/Movies-manager";

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

	const CurrentComponent = () => {
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
		}
	};

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
