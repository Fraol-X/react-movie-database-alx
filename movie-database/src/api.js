import axios from 'axios'; // Import Axios for making HTTP requests

const API_KEY = '49184dd7'; // This is my OMDb API key
const API_URL = `https://www.omdbapi.com/?apikey=${API_KEY}`; // Base URL for the OMDb API with the API key

// Fetch a random set of movies
export const fetchRandomMovies = async () => {
  try {
    const response = await axios.get(`${API_URL}&s=random`); // Make a GET request for random movies
    const data = response.data; // Extract the data from the response
    return data.Search || []; // Return the array of movies or an empty array if not found
  } catch (error) {
    throw new Error('Failed to fetch movies'); // Throw an error if the request fails
  }
};

// Fetch movies based on a search query
export const fetchMovies = async (query) => {
  try {
    const response = await axios.get(`${API_URL}&s=${encodeURIComponent(query)}`); // Make a GET request for movies matching the query
    const data = response.data; // Extract the data from the response

    if (data.Response === "False") {
      console.error(data.Error); // Log the error message if no movies are found
      return []; // Return an empty array if no movies are found
    }

    return data.Search || []; // Return the array of movies found
  } catch (error) {
    throw new Error('Failed to fetch movies'); // Throw an error if the request fails
  }
};

// Fetch details for a specific movie by ID
export const fetchMovieDetails = async (id) => {
  try {
    const response = await axios.get(`${API_URL}&i=${id}`); // Make a GET request for movie details by ID
    const data = response.data; // Extract the data from the response
    return data; // Return movie details
  } catch (error) {
    throw new Error('Failed to fetch movie details'); // Throw an error if the request fails
  }
};

// Fetch a hardcoded list of genres
export const fetchGenres = async () => {
  // Return a predefined list of genres as an array of objects
  return [
    { id: '28', name: 'Action' },
    { id: '12', name: 'Adventure' },
    { id: '16', name: 'Animation' },
    { id: '35', name: 'Comedy' },
    { id: '80', name: 'Crime' },
    { id: '99', name: 'Documentary' },
    { id: '18', name: 'Drama' },
    { id: '10751', name: 'Family' },
    { id: '14', name: 'Fantasy' },
    { id: '27', name: 'Horror' },
    { id: '9648', name: 'Mystery' },
    { id: '878', name: 'Science Fiction' },
    { id: '10749', name: 'Romance' },
    { id: '53', name: 'Thriller' },
    { id: '10752', name: 'War' },
    { id: '37', name: 'Western' },
  ];
};

// New function to fetch movies by genre
export const fetchMoviesByGenre = async (genre) => {
  try {
    const response = await axios.get(`${API_URL}&s=${encodeURIComponent(genre)}`); // Make a GET request for movies matching the genre
    const data = response.data; // Extract the data from the response
    return data.Search || []; // Return the array of movies found or an empty array
  } catch (error) {
    throw new Error('Failed to fetch movies by genre'); // Throw an error if the request fails
  }
};
