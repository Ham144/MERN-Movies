import React from "react";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { MdFilterList } from "react-icons/md";

const Movies = () => {
	//redux
	const { data: AllMovies, isLoading: isLoadingAllMovies } =
		useGetAllMoviesQuery();

	return (
		<div className="flex max-md:flex-col gap-y-6 mt-4 w-full">
			<div className="md:drawer-overlay drawer z-20 px-3">
				<input id="my-drawer" type="checkbox" className="drawer-toggle" />
				<div className="drawer-content">
					{/* Page content here */}
					<label
						htmlFor="my-drawer"
						className="btn   btn-primary  drawer-button "
					>
						<MdFilterList size={25} />
					</label>
				</div>
				<div className="drawer-side">
					<ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
						<h3 className="text-2xl font-bold font-serif text-white ">
							Sort By
						</h3>
						{/* Sidebar content here */}
						<li>
							<a>sort by popularity</a>
						</li>
						<li>
							<a>sort by latest date</a>
						</li>
					</ul>
					{}
				</div>
			</div>

			<div className="flex flex-col gap-3 overflow-y-scroll mb-12 w-full">
				<input
					type="text"
					placeholder="Search movie name.."
					className="input border border-spacing-2 glass font-bold text-white md:w-[90%] w-full"
				/>
				{isLoadingAllMovies ? (
					<span className="loading loading-spinner loading-lg"></span>
				) : (
					AllMovies?.data?.map((movie) => (
						<div
							key={movie.id}
							className="flex flex-col md:grid md:grid-cols-3"
						>
							<div className="card card-compact w-96 bg-base-100 shadow-xl">
								<div className="flex justify-between items-center flex-col gap-3 relative">
									<figure className={``}>
										<img
											src={movie.image}
											className="w-full h-full px-3"
											alt="movie"
										/>
									</figure>
									<div className="badge badge-ghost absolute bottom-2 left-2">
										{movie.year}
									</div>
								</div>
								<div className="card-body">
									<h2 className="card-title">{movie.title.toUpperCase()}</h2>
									<p>{movie.description}</p>
									<div className="flex gap-x-3 items-center">
										{movie?.casts?.map((genre) => (
											<div className="badge badge-accent">{genre}</div>
										))}
									</div>
									<div className="card-actions justify-end">
										<button className="btn btn-primary">View</button>
									</div>
									<div className={`flex metadata items-center gap-x-2`}>
										<div className="badge">
											<p className="font-bold uppercase px-4 py-1 text-white">
												{movie.uploadAt.slice(0, 10)}
											</p>
										</div>
										<div className="badge">{movie.year}</div>
									</div>
								</div>
							</div>
						</div>
					))
				)}
			</div>
		</div>
	);
};

export default Movies;
