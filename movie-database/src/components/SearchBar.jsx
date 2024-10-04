import React, { useState } from 'react'; // Import React and useState hook
import axios from 'axios'; // Import Axios for API calls
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import MovieCard from './MovieCard'; // Import MovieCard component

const SearchBar = ({ onSearch, onFavoriteToggle, favorites, isDarkMode }) => {
    const [searchTerm, setSearchTerm] = useState(''); // State for storing the search term
    const [movies, setMovies] = useState([]); // State for storing fetched movies
    const [error, setError] = useState(null); // State for storing error messages
    const navigate = useNavigate(); // Initialize useNavigate hook for navigation
    
    const API_KEY = '49184dd7'; // This is my OMDb API key

    // Function to handle the search action
    const handleSearch = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        if (!searchTerm) return; // Exit if search term is empty

        try {
            // Make an API call to fetch movies based on search term
            const response = await axios.get(`https://www.omdbapi.com/?s=${searchTerm}&apikey=${API_KEY}`);
            if (response.data.Response === 'True') {
                setMovies(response.data.Search); // Set movies state with fetched data
                setError(null); // Clear any existing error
                onSearch(response.data.Search); // Call the passed onSearch prop to pass fetched movies
            } else {
                setMovies([]); // Clear movies if the response is false
                setError(response.data.Error); // Set error message
            }
        } catch (err) {
            console.error(err); // Log error to console
            setError('Error fetching data. Please try again later.'); // Set a user-friendly error message
            setMovies([]); // Clear movies in case of error
        }
    };

    // Function to handle back navigation
    const handleBackClick = () => {
        navigate('/'); // Navigate to the home page
        setMovies([]); // Clear movies on back
    };

    return (
        <div className="search-bar">
            <form onSubmit={handleSearch}> {/* Form for searching movies */}
                <input
                    type="text"
                    value={searchTerm} // Bind input value to searchTerm state
                    onChange={(e) => setSearchTerm(e.target.value)} // Update searchTerm on input change
                    placeholder="Search for a movie..." // Placeholder text
                    className={`border rounded py-2 px-4 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`} // Conditional styling based on dark mode
                />
                <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 ml-2">
                    Search {/* Search button */}
                </button>
            </form>

            {/* Conditionally render the back button based on whether there are search results */}
            {movies.length > 0 && (
                <button onClick={handleBackClick} className="mt-4 bg-gray-300 text-black rounded py-2 px-4">
                    Back to Home {/* Button to navigate back to home */}
                </button>
            )}

            {error && <p className="text-red-500">{error}</p>} {/* Display error message if exists */}
            <div className="flex flex-wrap">
                {/* Map over the movies array and render MovieCard for each movie */}
                {movies.map((movie) => (
                    <MovieCard 
                        key={movie.imdbID} // Unique key for each movie card
                        movie={movie} // Pass movie data to MovieCard
                        onFavorite={onFavoriteToggle} // Use the passed onFavoriteToggle prop
                        isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)} // Check if movie is a favorite
                    />
                ))}
            </div>
        </div>
    );
};

export default SearchBar; // Export the SearchBar component
