import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Import Link for navigation

const MovieCard = ({ movie, onFavorite, isFavorite }) => {
    const [isHovered, setIsHovered] = useState(false); // State to track if the movie card is hovered

    return (
        <div
            className="relative w-64 h-96 m-4"
            // Handle mouse enter and leave events to toggle the hover state
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Movie Poster */}
            <div className="relative w-full h-full rounded-lg overflow-hidden shadow-lg cursor-pointer">
                {/* Link to navigate to the detailed movie view */}
                <Link to={`/movie/${movie.imdbID}`}>
                    <img
                        src={movie.Poster} // Movie poster image
                        alt={movie.Title} // Alt text for accessibility
                        className="w-full h-full object-cover" // Ensure the image covers the entire card
                    />
                </Link>
                <div className="p-2 text-center">
                    {/* Movie title displayed within the same container as the poster */}
                    <h3 className="mt-2 text-lg font-semibold">{movie.Title}</h3>
                    <button
                        onClick={onFavorite} // Handle favorite/unfavorite action
                        className={`mt-2 py-1 px-3 text-white rounded ${isFavorite ? 'bg-red-500' : 'bg-blue-500'}`}
                    >
                        {/* Button text changes based on favorite state */}
                        {isFavorite ? 'Unfavorite' : 'Favorite'}
                    </button>
                </div>
            </div>

            {/* Popup Details (shown on hover) */}
            {isHovered && (
                <div className="absolute -top-36 left-0 w-full bg-gray-800 text-white rounded-lg p-4 z-10 shadow-lg">
                    {/* Movie title in the popup */}
                    <h3 className="text-lg font-semibold">{movie.Title}</h3>
                    {/* Movie year and genre displayed in the popup */}
                    <p className="text-sm mt-2">Year: {movie.Year}</p>
                    <p className="text-sm">Genre: {movie.Genre || 'N/A'}</p>
                </div>
            )}
        </div>
    );
};

export default MovieCard; // Export the MovieCard component for use in other parts of the application
