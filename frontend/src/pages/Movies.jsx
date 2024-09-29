import React from "react";
import { useGetAllMoviesQuery } from "../redux/api/movie";
import { AiFillStar } from "react-icons/ai";

const Movies = () => {
	const { data: AllMovies, isLoading: isLoadingAllMovies } =
		useGetAllMoviesQuery();

	return (
		<div className="flex flex-col gap-y-6 justify-center items-center mt-4">
			<input
				type="text"
				placeholder="Search movie name.."
				className="input border border-spacing-2 glass font-bold text-white md:w-[90%] w-full"
			/>
			{isLoadingAllMovies ? (
				<span className="loading loading-spinner loading-lg"></span>
			) : (
				AllMovies?.data?.map((movie) => (
					<div key={movie.id} className="flex flex-col md:grid md:grid-cols-3">
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
	);
};

export default Movies;
