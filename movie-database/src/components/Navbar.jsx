import React, { useState } from 'react'; // Import React and useState hook
import { Link } from 'react-router-dom'; // Import Link for navigation
import { useTheme } from '../ThemeContext'; // Import useTheme for theme management

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false); // State to manage the mobile menu open/close status
    const { toggleTheme, theme } = useTheme(); // Get the toggleTheme function and current theme from context

    // Function to toggle the mobile menu
    const toggleMenu = () => {
        setIsOpen(!isOpen); // Toggle the isOpen state
    };

    return (
        <nav className="bg-gradient-to-r from-purple-500 to-blue-500 text-white shadow-md rounded-b-lg">
            {/* Navbar container with flexbox for layout */}
            <div className="container mx-auto flex justify-between items-center p-4">
                {/* Logo that links to home */}
                <Link to="/" className="flex-grow text-center">
                    <span className="text-5xl font-semibold text-green-500">F</span>
                    <span className="text-5xl font-semibold">resh</span>
                    <span className="text-5xl font-semibold text-yellow-500">M</span>
                    <span className="text-5xl font-semibold">ovies</span>
                </Link>

                {/* Button to toggle the mobile menu */}
                <button
                    onClick={toggleMenu}
                    className="md:hidden focus:outline-none"
                    aria-label="Toggle navigation"
                >
                    {/* SVG for menu icon; changes based on menu state */}
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {isOpen ? (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12" // Cross icon when menu is open
                            />
                        ) : (
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16m-7 6h7" // Hamburger icon when menu is closed
                            />
                        )}
                    </svg>
                </button>
            </div>

            {/* Button to switch between light and dark mode */}
            <div className="flex justify-end p-2">
                <button
                    onClick={toggleTheme}
                    className="p-2 rounded bg-blue-500 text-white hover:bg-blue-600 transition duration-200"
                >
                    Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode {/* Button text changes based on current theme */}
                </button>
            </div>

            {/* Navigation links, shown or hidden based on mobile menu state */}
            <div
                className={`md:flex md:items-center md:justify-center ${isOpen ? 'block' : 'hidden'}`} // Toggle visibility based on isOpen state
            >
                <div className="flex flex-col md:flex-row md:space-x-8 p-4 md:p-0">
                    {/* Mapping through an array of paths to create navigation links */}
                    {['/', '/favorites', '/genre', '/top-rated', '/upcoming', '/about'].map((path, index) => (
                        <Link
                            key={index}
                            to={path}
                            className="hover:bg-purple-700 hover:text-white transition duration-200 p-2 rounded-lg"
                        >
                            {/* Display the corresponding label for each link */}
                            {path === '/' ? 'Home' :
                             path === '/favorites' ? 'Favorites' :
                             path === '/genre' ? 'Genre' :
                             path === '/top-rated' ? 'Top Rated' :
                             path === '/upcoming' ? 'Upcoming' :
                             'About'}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    );
};

export default Navbar; // Export the Navbar component for use in other parts of the application
