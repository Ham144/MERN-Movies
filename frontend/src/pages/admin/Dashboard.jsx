import React, { useState } from "react";
import {
	useCreateMovieMutation,
	useEditMovieMutation,
	useDeleteMovieMutation,
	useDeleteReviewMutation,
	useGetAllMoviesQuery,
} from "../../redux/api/movie";
import { MdArrowDropDown } from "react-icons/md";
import { Link } from "react-router-dom";

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

	//current dashboard component to show
	const [currentCompoenent, setCurrentComponent] = useState("my-dashboard");

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
		return <div>my dashboard</div>;
	}

	function MoviesManager() {
		return <div>movies manager</div>;
	}

	function UsersManager() {
		return <div>users manager</div>;
	}

	function ReviewsManager() {
		return <div>reviews manager</div>;
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
		<div className="flex flex-col">
			<div className="drawer ">
				<input
					id="my-drawer"
					type="checkbox"
					value={true}
					className="drawer-toggle"
				/>
				<div className="drawer-content ">
					<label htmlFor="my-drawer" className="text-start glass  w-full btn ">
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
			<CurrentComponent />
		</div>
	);
};

export default Dashboard;
