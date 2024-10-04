import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import { fetchMovies } from '../api'; // Import the function to fetch movies from the API
import MovieCard from '../components/MovieCard'; // Import the MovieCard component for displaying movie details

function Upcoming() {
  const [upcomingMovies, setUpcomingMovies] = useState([]); // State to hold upcoming movies
  const [error, setError] = useState(''); // State to hold error messages

  // Fetch upcoming movies when the component mounts
  useEffect(() => {
    const fetchUpcomingMovies = async () => {
      try {
        const moviesData = await fetchMovies('upcoming'); // Fetch upcoming movies from the API
        setUpcomingMovies(moviesData); // Set the fetched movies into state
      } catch (err) {
        setError('Failed to load upcoming movies.'); // Set error message on failure
      }
    };

    fetchUpcomingMovies(); // Call the function to fetch movies
  }, []); // Run this effect once when the component mounts

  return (
    <div>
      <h1 className="text-2xl font-bold">Upcoming Movies</h1>
      {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
      <div className="flex flex-wrap mt-4">
        {upcomingMovies.length === 0 && !error && ( // Check if no upcoming movies are found
          <p>No upcoming movies found.</p>
        )}
        {upcomingMovies.map((movie) => ( // Mapping through upcoming movies to render MovieCard components
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </div>
  );
}

export default Upcoming; // Exporting the Upcoming component
