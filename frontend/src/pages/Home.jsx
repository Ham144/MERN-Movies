import React, { useEffect, useState } from "react";
import {
	useGetHypeMoviesQuery,
	useGetLatestMoviesQuery,
	useGetRandomMoviesQuery,
} from "../redux/api/movie";

const Home = () => {
	//redux
	const { data: getLatestMovie, isLoading: loadingLatestMovie } =
		useGetLatestMoviesQuery();
	const { data: personalizedMovies, isLoading: loadingPersonalizedMovies } =
		useGetRandomMoviesQuery();
	const { data: popularMovies, isLoading: loadingPopularMovies } =
		useGetHypeMoviesQuery();

	console.log(popularMovies);

	function AllMovies({ movie }) {
		return (
			<div className="carousel w-full">
				<div id="slide1" className="carousel-item relative w-full">
					<img src={movie.image} className="w-full " />
					<div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
						<a href="#slide4" className="btn btn-circle">
							❮
						</a>
						<a href="#slide2" className="btn btn-circle">
							❯
						</a>
					</div>
				</div>
			</div>
		);
	}

	return (
		<>
			<div className="flex flex-1 h-screen">
				{/* //carousel film most popular */}

				<div className="w-full relative">
					<h2 className="md:absolute  top-2 left-3  drop-shadow-md p-2 self-start font-thin md:text-4xl text-2xl	z-10">
						Popular Movies
					</h2>
					{popularMovies &&
						popularMovies.data.map((movie) => (
							<AllMovies movie={movie} key={movie.id} />
						))}
				</div>
			</div>
		</>
	);
};

export default Home;
