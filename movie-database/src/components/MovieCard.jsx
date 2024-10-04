import React, { useState } from 'react'; // Importing React and useState hook for managing local component state
import { useNavigate } from 'react-router-dom'; // Importing useNavigate hook for navigation within the app
import axios from 'axios'; // Importing axios for making HTTP requests to the OMDB API

const MovieCard = ({ movie, onFavorite, isFavorite }) => {
    const [showDetails, setShowDetails] = useState(false); // Toggle to show movie details
    const [movieDetails, setMovieDetails] = useState(null); // Store fetched movie details
    const [loading, setLoading] = useState(false); // Loading state for fetching details
    const [error, setError] = useState(null); // Error state for fetching details
    const navigate = useNavigate(); // Hook for programmatic navigation

    // Function to fetch movie details from the OMDB API
    const fetchMovieDetails = async () => {
        setLoading(true); // Set loading to true when fetching details
        setError(null); // Reset error state
        try {
            const response = await axios.get(`https://www.omdbapi.com/?apikey=49184dd7&i=${movie.imdbID}`);
            setMovieDetails(response.data); // Set movie details from API response
        } catch (err) {
            setError('Failed to fetch movie details'); // Handle error
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    // Handle mouse enter to show details and fetch them if not already loaded
    const handleMouseEnter = () => {
        setShowDetails(true);
        if (!movieDetails) {
            fetchMovieDetails(); // Fetch movie details if not loaded
        }
    };

    // Handle mouse leave to hide details
    const handleMouseLeave = () => {
        setShowDetails(false);
    };

    // Navigate to the trailer page for the selected movie
    const handlePlayClick = () => {
        navigate(`/trailer/${movie.imdbID}`);
    };

    // Toggle the favorite status of the movie
    const handleFavoriteToggle = () => {
        onFavorite(movie); // Invoke callback to toggle favorite
    };

    return (
        <div
            className="relative w-64 h-96 m-4 transition-transform transform hover:scale-105"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative flex flex-col h-full rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-xl transition-shadow">
                <img
                    src={movie.Poster}
                    alt={movie.Title}
                    className="w-full h-full object-cover"
                />

                <div className="p-2 text-center">
                    <h3 className="mt-2 text-lg font-semibold text-blue-700">{movie.Title}</h3>
                    <p>Release Date: {movie.Year}</p>
                </div>

                {showDetails && (
                    <div className="absolute top-0 left-0 w-full h-3/4 bg-gray-800 text-white rounded-lg p-4 shadow-lg z-20 overflow-auto">
                        {loading && <p>Loading details...</p>} {/* Show loading text */}
                        {error && <p className="text-red-400">{error}</p>} {/* Show error message */}
                        {movieDetails && (
                            <div className="flex flex-col items-start space-y-1">
                                <h4 className="font-semibold text-lg truncate">{movieDetails.Title}</h4>
                                <p className="text-sm font-light line-clamp-3">{movieDetails.Plot || 'Plot details not available.'}</p>
                                <p className="text-sm">
                                    <span className="font-semibold">Cast: </span>{movieDetails.Actors || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Genre: </span>{movieDetails.Genre || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Release Date: </span>{movie.Year}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">IMDB Rating: </span>{movieDetails.imdbRating || 'N/A'}
                                </p>
                                <p className="text-sm">
                                    <span className="font-semibold">Rotten Tomatoes: </span>{movieDetails.Ratings?.find(rating => rating.Source === 'Rotten Tomatoes')?.Value || 'N/A'}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                <div className="absolute bottom-0 left-0 p-2">
                    <button
                        onClick={handlePlayClick}
                        className="bg-gradient-to-r from-green-400 to-blue-500 hover:bg-opacity-80 text-white text-sm rounded-lg py-1 px-2"
                    >
                        ▶ Play trailer
                    </button>
                </div>

                <div className="absolute bottom-0 right-0 p-2">
                    <button
                        onClick={handleFavoriteToggle} // Trigger favorite toggle
                        className={`flex items-center justify-center text-sm rounded-lg py-1 px-2 ${isFavorite ? 'bg-yellow-500' : 'bg-gray-500'} hover:bg-opacity-70`}
                    >
                        {isFavorite ? '⭐' : '☆'} {/* Filled star if favorite, empty if not */}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;
