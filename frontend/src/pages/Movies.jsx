import React from "react";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { MdFilterList } from "react-icons/md";
import { useGetAllGenreQuery } from "../redux/api/genre";
import { array } from "joi";

const Movies = () => {
	//redux
	const { data: AllMovies, isLoading: isLoadingAllMovies } =
		useGetAllMoviesQuery();
	const { data: allGenres } = useGetAllGenreQuery();

	return (
		<div className="flex flex-col  gap-y-6 mt-4 w-full ">
			<div className="flex  gap-3 ">
				<div className="drawer z-20 flex md:w-[5%]">
					<input id="my-drawer" type="checkbox" className="drawer-toggle" />
					<div className="drawer-content ">
						{/* Page content here */}
						<label
							htmlFor="my-drawer"
							className="btn btn-primary drawer-button "
						>
							<MdFilterList />
						</label>
					</div>
					<div className="drawer-side">
						<label
							htmlFor="my-drawer"
							aria-label="close sidebar"
							className="drawer-overlay"
						></label>
						<ul className="menu p-4 w-80 min-h-full bg-base-200 ">
							{/* Sidebar content here */}
							<div className="badge badge-secondary w-full">Sort By</div>
							<li>
								<p>Sort By Popularity</p>
							</li>
							<li>
								<p>Sort By Year</p>
							</li>
							<li>
								<p>Sort By Review</p>
							</li>
							<li>
								<p>Sort By Upload Date</p>
							</li>
							<li>
								<p>Sort By Alphabet</p>
							</li>

							<div className="badge badge-secondary w-full">Filter By</div>

							<div className="badge badge-secondary mt-3 self-center px-9">
								Genres
							</div>

							{allGenres &&
								allGenres.data.map((genre) => (
									<li key={genre.id}>
										<p>{genre.name}</p>
									</li>
								))}

							<div className="badge badge-secondary mt-3 self-center px-9">
								Year
							</div>

							{allGenres &&
								allGenres.data.map((genre) => (
									<li key={genre.id}>
										<p>{genre.name}</p>
									</li>
								))}
						</ul>
					</div>
				</div>
				<input
					type="text"
					placeholder="Search movie name.."
					className="input border border-spacing-2 glass font-bold text-white md:w-full  "
				/>
			</div>

			<div className="flex flex-col gap-3 overflow-y-scroll mb-12 ">
				{isLoadingAllMovies ? (
					<span className="loading loading-spinner loading-lg"></span>
				) : (
					AllMovies?.data?.map((movie) => (
						<div
							key={movie.id}
							className="flex flex-col md:grid md:grid-cols-3 "
						>
							<div className="card card-compact md:w-96 bg-base-100 shadow-xl">
								<div className="flex justify-between items-center flex-col gap-3 relative">
									<figure className={``}>
										<img
											src={movie.image}
											className="w-full px-3"
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
