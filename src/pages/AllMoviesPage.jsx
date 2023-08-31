import { useLoaderData, Link } from "react-router-dom";

export default function AllMoviesPage() {
  const { movies } = useLoaderData()

  const movieListItems = movies.map((movie) => (
    <li key={movie.movieId}>
      <Link to={`/movies/${movie.movieId}`}>
        {movie.title}
      </Link>
    </li>
  ))

  return (
    <>
      <h1>All Movies</h1>
      <p>{movieListItems}</p>
    </>
  );
}
