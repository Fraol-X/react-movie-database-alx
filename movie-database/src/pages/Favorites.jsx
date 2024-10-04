import React, { useState, useEffect } from 'react'; // Importing React and necessary hooks
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation between routes
import MovieCard from '../components/MovieCard'; // Importing the MovieCard component to display favorite movies

const Favorites = () => {
    const navigate = useNavigate(); // Hook for navigation
    const [favorites, setFavorites] = useState([]); // State to hold favorite movies

    // Load favorites from localStorage when the component mounts
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // Get favorites from localStorage
        setFavorites(storedFavorites); // Update state with stored favorites
    }, []); // Empty dependency array ensures this runs only once on mount

    // Toggle favorite status (remove from favorites if already there)
    const toggleFavorite = (movie) => {
        const updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID); // Remove the movie from favorites
        setFavorites(updatedFavorites); // Update state with the new favorites list
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Store updated favorites in localStorage
    };

    // Back navigation function
    const handleBackClick = () => {
        navigate('/'); // Navigate to the home page
    };

    // Render message if no favorites are found
    if (favorites.length === 0) {
        return (
            <div className="favorites-container">
                <button
                    onClick={handleBackClick}
                    className="mb-4 bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-200"
                >
                    Back to Home
                </button>
                <p>No favorites yet!</p> {/* Message when there are no favorite movies */}
            </div>
        );
    }

    // Render favorite movies if available
    return (
        <div className="favorites-container">
            <button
                onClick={handleBackClick}
                className="mb-4 bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600 transition duration-200"
            >
                Back to Home
            </button>

            <div className="flex flex-wrap"> {/* Flex container for wrapping movie cards */}
                {favorites.map((movie) => ( // Map through favorites to create MovieCard for each
                    <MovieCard
                        key={movie.imdbID} // Unique key for each MovieCard
                        movie={movie} // Passing movie data to MovieCard
                        onFavorite={toggleFavorite} // Pass toggleFavorite function to handle favorite status
                        isFavorite={true} // Indicate this movie is in favorites
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorites; // Exporting the Favorites component for use in other parts of the application
