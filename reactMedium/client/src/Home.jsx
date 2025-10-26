import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

function Home() {

    const [movies, setMovies] = useState([]);

    async function getMovies(query) {
        try {
            const response = await fetch(`http://localhost:3000/movies?q=${query}`);
            const data = await response.json();


            setMovies(
                data.results.map((movie) => ({
                    title: movie.title,
                    posterPath: movie.poster_path,
                    releaseDate: movie.release_date,
                    overview: movie.overview,
                    id: movie.id,
                }))
            );
        } catch (error) {
            console.error(`Error fetching data: ${error}`);
        }
    }

    function handleSearch() {
        const query = inputRef.current.value.trim();
        if (query) {
            getMovies(query);
        }
    }

    return (
        <>
            <div className="search-bar">
                <input type="text" ref={inputRef} placeholder="Search movies..." />
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="movie-grid">
                {movies.map((movie) => (
                    <Link to={`/movie/${movie.id}`} className="movie-card">
                        <img
                            src={`https://image.tmdb.org/t/p/w154${movie.posterPath}`}
                            alt={movie.title}
                        />
                        <h2>{movie.title}</h2>
                        <p>
                            {movie.overview.length > 187
                                ? movie.overview.substring(0, 188) + "..."
                                : movie.overview}
                        </p>
                        <p>Release Date: {movie.releaseDate}</p>
                    </Link>
                ))}
            </div>
        </>
    );
}

export default Home;