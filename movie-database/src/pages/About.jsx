import React from 'react'; // Importing React to use JSX syntax

// About component to provide information about the FreshMovies platform
const About = () => {
    return (
        <div className="container mx-auto p-4"> {/* Main container for the About page with padding and centering */}
            <h1 className="text-2xl font-bold mb-4">About FreshMovies</h1> {/* Main heading for the About section */}
            <p className="text-lg mb-4">
                FreshMovies is your go-to platform for discovering the latest and greatest films from around the world.
                Our mission is to provide movie enthusiasts with an easy and enjoyable way to find and enjoy films 
                that suit their tastes.
            </p>
            <p className="text-lg mb-4">
                Whether you’re searching for the latest blockbusters, hidden gems, or timeless classics, 
                FreshMovies has got you covered. We offer detailed information on movies, including ratings, 
                genres, cast, and more to help you make informed viewing choices.
            </p>
            <p className="text-lg mb-4">
                Join our community of film lovers and dive into the world of cinema with FreshMovies!
            </p>
        </div>
    );
};

export default About; // Exporting the About component for use in other parts of the application
