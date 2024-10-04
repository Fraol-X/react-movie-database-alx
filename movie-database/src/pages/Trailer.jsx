import React, { useEffect, useState } from 'react'; // Importing React and necessary hooks
import { useParams, Link } from 'react-router-dom'; // Importing hooks for routing
import axios from 'axios'; // Importing Axios for making API requests

// My YouTube API key
const YOUTUBE_API_KEY = 'AIzaSyDI97hYnQRYKrQFqvPHWVdujyEWcnuHWT8'; // My YouTube API key for fetching trailers

const Trailer = () => {
  const { id } = useParams(); // Get the movie ID from the URL parameters
  const [TrailerId, setTrailerId] = useState(null); // State to store the YouTube video ID

  useEffect(() => {
    const fetchTrailer = async () => {
      try {
        // API call to YouTube to fetch trailer
        const response = await axios.get(
          `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=thriller&key=${YOUTUBE_API_KEY}`
        );
        const videoId = response.data.items[0]?.id?.videoId; // Get the video ID from the response
        setTrailerId(videoId); // Update state with the fetched video ID
      } catch (error) {
        console.error('Error fetching the Trailer:', error); // Log any error that occurs during the fetch
      }
    };

    fetchTrailer(); // Call the fetch function
  }, [id]); // Effect runs when the movie ID changes

  return (
    <div className="container mx-auto p-4"> {/* Main container for the trailer page */}
      <div className="mt-4">
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"> {/* Link back to the home page */}
          Back to Home
        </Link>
      </div>

      <h1 className="text-2xl font-bold mt-4">Trailer for Movie ID: {id}</h1> {/* Heading displaying the movie ID */}

      {TrailerId ? ( // Conditional rendering based on the availability of the trailer
        <div className="mt-4">
          <iframe
            width="100%"
            height="500px"
            src={`https://www.youtube.com/embed/${TrailerId}`} // Embedding the YouTube video using the fetched trailer ID
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="Movie Trailer"
          ></iframe>
        </div>
      ) : (
        <p className="mt-4 text-red-500">No Trailer available for this movie.</p> // Message if no trailer is available
      )}
    </div>
  );
};

export default Trailer; // Exporting the Trailer component for use in other parts of the application
