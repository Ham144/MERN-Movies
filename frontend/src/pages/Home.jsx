import React, { useEffect, useState } from "react";
import {
	useGetHypeMoviesQuery,
	useGetLatestMoviesQuery,
	useGetRandomMoviesQuery,
} from "../redux/api/movie";
import { useNavigate } from "react-router-dom";
import { FaArrowDownLong } from "react-icons/fa6";

const Home = () => {
	//redux
	// const { data: getLatestMovie, isLoading: loadingLatestMovie } =
	// 	useGetLatestMoviesQuery();
	// const { data: personalizedMovies, isLoading: loadingPersonalizedMovies } =
	// 	useGetRandomMoviesQuery();
	// const { data: popularMovies, isLoading: loadingPopularMovies } =
	// 	useGetHypeMoviesQuery();

	// console.log(popularMovies);

	//states untuk home
	const navigate = useNavigate();
	const [showScrollkebawah, setShowScrollkebawah] = useState(true);

	useEffect(() => {
		new Promise((resolve, rejest) => {
			setTimeout(() => {
				resolve(setShowScrollkebawah(false));
			}, 5000);
		});
	});

	function AllMovies({ movie }) {
		return (
			<div className="carousel w-full">
				<div id="slide1" className="carousel-item relative w-full">
					<img src="/hero-background.png" className="w-full " />
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
		<div className={`mb-12`}>
			<div className="hero min-h-screen bg-base-200  overflow-clip ">
				<img
					src="/public/latar.jpg"
					alt="latar"
					className="md:w-full min-h-screen w-[160%] absolute "
				/>

				<div className="hero-content text-center bg-transparent z-10 ">
					<div className="max-w-md flex flex-col gap-y-5">
						<h1 className="md:text-5xl text-3xl font-serif uppercase font-bold text-black">
							Calm Down
						</h1>
						<p className="max-md:w-72 mx-auto text-white px-4 py-2 bg-neutral-600 opacity-45 mb-5 rounded-lg">
							Ayo kenalkan dirimu dengan versi terbaikmu sekarang juga, mari
							kita kuatkan personal mu dengan rekomendasi vibe sesuai dirimu
							yang nyata.
						</p>
						<button
							className="btn  bg-red-800 border-none drop-shadow-lg"
							onClick={() => navigate("/movies")}
						>
							More
						</button>
					</div>
				</div>
				{showScrollkebawah ? (
					<div
						className={`z-10 absolute bottom-20 opacity-30  flex justify-center flex-col items-center   gap-y-4`}
					>
						<FaArrowDownLong className={`animate-bounce`} size={40} />
						<p className={`font-bold`}>Scrolll Kebawah</p>
					</div>
				) : (
					""
				)}
			</div>
			<div className="flex self-center mx-auto md:mt-12   justify-center ">
				<div className="badge badge-accent absolute text-center mx-auto px-5 py-4 text-2xl z-10 font-bold opacity-50 translate-y-8 max-md:text-sm max-md:p-2 ">
					Personalized Movies
				</div>
				<AllMovies />
			</div>
			<div className="flex self-center mx-auto    justify-center ">
				<div className="badge badge-accent absolute text-center mx-auto px-5 py-4 text-2xl z-10 font-bold opacity-50 translate-y-8 max-md:text-sm max-md:p-2">
					Latest Movies
				</div>
				<AllMovies />
			</div>
			<div className="flex self-center mx-auto    justify-center ">
				<div className="badge badge-accent absolute text-center mx-auto px-5 py-4 text-2xl z-10 font-bold opacity-50 translate-y-8 max-md:text-sm max-md:p-2 ">
					Top and Popular Movies
				</div>
				<AllMovies />
			</div>
		</div>
	);
};

export default Home;
