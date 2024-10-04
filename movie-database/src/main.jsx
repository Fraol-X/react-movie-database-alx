import { StrictMode } from 'react'; // Importing StrictMode for highlighting potential problems in the application
import { createRoot } from 'react-dom/client'; // Importing createRoot for rendering the React app
import { BrowserRouter } from 'react-router-dom'; // Importing BrowserRouter for client-side routing
import App from './App.jsx'; // Importing the main App component
import { ThemeProvider } from './ThemeContext'; // Importing ThemeProvider to manage theme context
import './index.css'; // Importing global CSS styles

// Creating a root for the React application and rendering it
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter> {/* Enclosing the application in BrowserRouter for routing */}
      <ThemeProvider> {/* Wrapping the App with ThemeProvider to provide theme context */}
        <App /> {/* Rendering the main App component */}
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
);
