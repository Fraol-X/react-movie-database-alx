import React, { useEffect, useState } from 'react'; // Importing necessary React hooks
import { fetchMovies } from '../api'; // Import the fetchMovies function to retrieve movies based on genre
import MovieCard from '../components/MovieCard'; // Import the MovieCard component for displaying movie details

const Genre = () => {
  const [genres, setGenres] = useState([]); // State to hold available genres
  const [selectedGenre, setSelectedGenre] = useState(''); // State to hold the currently selected genre
  const [movies, setMovies] = useState([]); // State to hold the fetched movies based on selected genre
  const [error, setError] = useState(''); // State to hold any error messages encountered during fetching

  // Fetch genres on component mount
  useEffect(() => {
    // Static list of genres
    const availableGenres = [
      'Action',
      'Comedy',
      'Drama',
      'Horror',
      'Sci-Fi',
      'Thriller',
      'Romance',
      'Adventure',
      'Animation',
    ];
    setGenres(availableGenres); // Setting available genres into state
  }, []);

  // Fetch movies whenever the selected genre changes
  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      if (selectedGenre) {
        try {
          const moviesData = await fetchMovies(selectedGenre); // Fetch movies based on selected genre
          setMovies(moviesData); // Update movies state with fetched data
        } catch (err) {
          setError('Failed to load movies for the selected genre.'); // Set error message on failure
        }
      }
    };

    fetchMoviesByGenre(); // Call the function to fetch movies
  }, [selectedGenre]); // Only run when the selected genre changes

  const handleGenreChange = (e) => {
    setSelectedGenre(e.target.value); // Update the selected genre based on user input
    setMovies([]); // Clear previous movies to reflect the new selection
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Browse Movies by Genre</h1>
      <div>
        <label htmlFor="genre" className="block mt-4">Select a Genre:</label>
        <select
          id="genre"
          value={selectedGenre}
          onChange={handleGenreChange} // Handle change in genre selection
          className="mt-2 border rounded bg-gray-800 text-white border-gray-600"
        >
          <option value="">--Select a Genre--</option>
          {genres.map((genre, index) => ( // Mapping through available genres to create dropdown options
            <option key={index} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>
      <div className="mt-4">
        {error && <p className="text-red-500">{error}</p>} {/* Display error message if any */}
        {movies.length === 0 && selectedGenre && !error && ( // Check if no movies are found
          <p>No movies found for the selected genre.</p>
        )}
        <div className="flex flex-wrap">
          {movies.map((movie) => ( // Mapping through movies to render MovieCard components
            <MovieCard key={movie.imdbID} movie={movie} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Genre; // Exporting the Genre component
