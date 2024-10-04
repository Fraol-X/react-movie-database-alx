import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import { fetchMovies } from '../api'; // Import the function to fetch movies from the API
import MovieCard from '../components/MovieCard'; // Import the MovieCard component for displaying movie details

function TopRated() {
  const [topRatedMovies, setTopRatedMovies] = useState([]); // State to hold top-rated movies
  const [error, setError] = useState(''); // State to hold error messages

  // Fetch top-rated movies when the component mounts
  useEffect(() => {
    const fetchTopRatedMovies = async () => {
      try {
        const moviesData = await fetchMovies('top rated'); // Fetch top-rated movies from the API
        setTopRatedMovies(moviesData); // Set the fetched movies into state
      } catch (err) {
        setError('Failed to load top-rated movies.'); // Set error message on failure
      }
    };

    fetchTopRatedMovies(); // Call the function to fetch movies
  }, []); // Run this effect once when the component mounts

  return (
    <div>
      <h1 className="text-2xl font-bold">Top Rated Movies</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
      <div className="flex flex-wrap mt-4">
        {topRatedMovies.length === 0 && !error && ( // Check if no top-rated movies are found
          <p>No top-rated movies found.</p>
        )}
        {topRatedMovies.map((movie) => ( // Mapping through top-rated movies to render MovieCard components
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default TopRated; // Exporting the TopRated component
