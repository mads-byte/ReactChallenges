import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
function MovieView() {
    const { id } = useParams();
    const [movie, setMovie] = useState({})

    useEffect(() => {
        async function fetchMovie() {
            try {
                const response = await fetch(`http://localhost:3000/movie/${id}`);
                const data = await response.json();
                setMovie({
                    poster: `https://image.tmdb.org/t/p/w300${data.poster_path}`,
                    overview: data.overview,
                    title: data.original_title,
                    releaseDate: data.release_date,
                    runtime: data.runtime,
                    budget: data.budget,
                    revenue: data.revenue,
                    genres: data.genres
                });
                //setMovie(data.original_title, data.overview, data.release_date, data.runtime, data.budget, data.revenue, [...data.genres]);
            } catch (error) {
                console.error("Error fetching movie:", error);
            }
        }

        fetchMovie();
    }, [id]);
    console.log(movie)
    return (
        <>
            <div className="details">
                <h1>{movie.title}</h1>
                <img src={movie.poster}></img>
                <p><strong>Overview:</strong> {movie.overview}</p>
                <p><strong>Release Date:</strong> {movie.releaseDate}</p>
                <p><strong>Runtime:</strong> {movie.runtime} minutes</p>
                <p><strong>Budget:</strong> ${movie.budget}</p>
                <p><strong>Revenue:</strong> ${movie.revenue}</p>
                <p><strong>Genres:</strong> {movie.genres && movie.genres.map((genre) => genre.name).join(", ")}</p>
            </div >
            <Link to="/">Back to Home</Link>
        </>)
}

export default MovieView;   