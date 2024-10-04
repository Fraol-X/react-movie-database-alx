import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import { fetchRandomMovies } from '../api'; // Importing the function to fetch random movies 
import MovieCard from '../components/MovieCard'; // Importing the MovieCard component for displaying movie details

const Home = ({ favorites, onFavoriteToggle }) => {
    const [randomMovies, setRandomMovies] = useState([]); // State to hold random movies

    useEffect(() => {
        // Function to load random movies when the component mounts
        const loadRandomMovies = async () => {
            const data = await fetchRandomMovies(); // Fetching random movies from the API
            setRandomMovies(data); // Updating state with the fetched movie data 
        };

        loadRandomMovies(); // Calling the function to load movies
    }, []); // Empty dependency array ensures this runs once on mount

    return (
        <div>
            <h1 className="text-2xl font-bold mb-4">Home</h1> {/* Main heading for the Home page */}
            <h2 className="text-xl font-semibold mb-2">Random Movies</h2> {/* Subheading for random movies section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"> {/* Grid layout for movie cards */}
                {randomMovies.length === 0 ? (
                    <p>No random movies found.</p> // Message when no movies are available
                ) : (
                    randomMovies.map(movie => ( // Mapping over the array of random movies to display each MovieCard
                        <MovieCard 
                            key={movie.imdbID} // Unique key for each MovieCard
                            movie={movie} // Passing movie data to MovieCard
                            onFavorite={() => onFavoriteToggle(movie)} // Callback to toggle favorite status
                            isFavorite={favorites.some(fav => fav.imdbID === movie.imdbID)} // Checking if the movie is a favorite
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default Home; // Exporting the Home component for use in other parts of the application
