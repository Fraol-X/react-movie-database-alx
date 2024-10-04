import { useState, useEffect } from 'react'; // Import hooks from React
import { Routes, Route, useLocation } from 'react-router-dom'; // Import routing components
import { fetchMovies, fetchMovieDetails } from './api'; // Import API functions for fetching movies
import SearchBar from './components/SearchBar'; // Import SearchBar component
import MovieDetails from './components/MovieDetails'; // Import MovieDetails component
import Home from './pages/Home'; // Import Home page component
import Favorites from './pages/Favorites'; // Import Favorites page component
import Genre from './pages/Genre'; // Import Genre page component
import TopRated from './pages/TopRated'; // Import TopRated page component
import Upcoming from './pages/Upcoming'; // Import Upcoming page component
import Trailer from './pages/Trailer'; // Import Trailer page component
import About from './pages/About'; // Import About page component
import Navbar from './components/Navbar'; // Import Navbar component

function App() {
    const [movies, setMovies] = useState([]); // State for storing movie list
    const [selectedMovie, setSelectedMovie] = useState(null); // State for storing selected movie details
    const [favorites, setFavorites] = useState([]); // State for storing favorite movies

    const location = useLocation(); // Get current location for conditional rendering

    // Load favorites from localStorage on app initialization
    useEffect(() => {
        const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []; // Parse favorites from localStorage
        setFavorites(storedFavorites); // Update favorites state
    }, []);

    // Handles search results from the SearchBar component
    const handleSearch = (searchResults) => {
        setMovies(searchResults); // Update movies state with search results
    };

    // Fetches movie details for the selected movie when clicked
    const handleMovieClick = async (id) => {
        const data = await fetchMovieDetails(id); // Fetch movie details
        setSelectedMovie(data); // Update selected movie state
    };

    // Toggles favorite status of a movie and updates the state and localStorage
    const handleFavoriteToggle = (movie) => {
        const isFavorite = favorites.some(fav => fav.imdbID === movie.imdbID); // Check if movie is already a favorite
        let updatedFavorites;

        if (isFavorite) {
            // Remove movie from favorites
            updatedFavorites = favorites.filter(fav => fav.imdbID !== movie.imdbID); // Filter out the movie
        } else {
            // Add movie to favorites
            updatedFavorites = [...favorites, movie]; // Add movie to favorites array
        }

        // Update favorites in both state and localStorage
        setFavorites(updatedFavorites); // Update favorites state
        localStorage.setItem('favorites', JSON.stringify(updatedFavorites)); // Update localStorage
    };

    // Checks if a movie is in the favorites list
    const isMovieFavorite = (movie) => {
        return favorites.some(fav => fav.imdbID === movie.imdbID); // Return true if movie is a favorite
    };

    return (
        <div className="container mx-auto p-4">
            <div className="mb-4">
                <Navbar /> {/* Navbar rendered consistently across all pages */}
            </div>

            {location.pathname === '/' && (
                <SearchBar 
                    onSearch={handleSearch} // Pass search handler to SearchBar
                    onFavoriteToggle={handleFavoriteToggle} // Pass favorite toggle handler to SearchBar
                    favorites={favorites} // Pass favorites to SearchBar for managing favorites
                />
            )}

            {/* Renders movie details if a movie is selected, otherwise renders routes */}
            {selectedMovie ? (
                <MovieDetails movie={selectedMovie} /> // Show selected movie details
            ) : (
                <Routes>
                    <Route 
                        path="/" 
                        element={
                            <Home 
                                favorites={favorites} // Pass favorites to Home page
                                onFavoriteToggle={handleFavoriteToggle} // Pass favorite toggle handler to Home page
                                movies={movies} // Pass movies to Home page
                                isMovieFavorite={isMovieFavorite} // Check if movie is a favorite in Home
                            />} 
                    />
                    <Route 
                        path="/favorites" 
                        element={
                            <Favorites 
                                favorites={favorites} // Pass favorites to Favorites page
                                onFavoriteToggle={handleFavoriteToggle} // Pass favorite toggle handler to Favorites page
                            />} 
                    />
                    <Route path="/about" element={<About />} /> {/* About page route */}
                    <Route path="/genre" element={<Genre />} /> {/* Genre page route */}
                    <Route path="/top-rated" element={<TopRated />} /> {/* Top Rated page route */}
                    <Route path="/upcoming" element={<Upcoming />} /> {/* Upcoming movies page route */}
                    <Route path="/trailer/:id" element={<Trailer />} /> {/* Trailer page route */}
                </Routes>
            )}
        </div>
    );
}

export default App; // Export the App component for use in the index file
