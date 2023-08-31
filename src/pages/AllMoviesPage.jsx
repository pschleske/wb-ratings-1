import { useLoaderData, Link } from "react-router-dom";

export default function AllMoviesPage() {
  const { movies } = useLoaderData();

  const movieListItems = movies.map(({ movieId, title }) => (
    <li key={movieId}>
      <Link to={`/movies/${movieId}`}>
        {title}
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
