import React, { createContext, useContext, useState, useEffect } from 'react'; // Importing React and hooks for context and state management

const ThemeContext = createContext(); // Creating a context for theme management

// ThemeProvider component to wrap around application components for theme context
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // State for the current theme, default is 'light'

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    };

    // Effect to update body styles based on the current theme
    useEffect(() => {
        // Set the body styles based on the theme
        if (theme === 'dark') {
            document.body.style.backgroundColor = '#363062'; // Dark mode background color
            document.body.style.color = 'white'; // Text color for dark mode
        } else {
            document.body.style.backgroundColor = '#B9B4C7'; // Light mode background color
            document.body.style.color = 'black'; // Text color for light mode
        }
    }, [theme]); // Effect runs when the theme changes

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}> {/* Providing theme and toggle function to context */}
            {children} {/* Rendering child components */}
        </ThemeContext.Provider>
    );
};

// Custom hook for accessing the ThemeContext
export const useTheme = () => useContext(ThemeContext); // Exposing the context for use in other components
