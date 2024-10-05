# Movie Database 🎬🎥

A responsive, dynamic Movie Database web application that allows users to search for movies, view details, and interact with various movie categories like top-rated and upcoming releases. The app is built using **React**, **Vite**, **Tailwind CSS**, **OMDb API**, **YouTube API**, **React Router DOM**, and **Axios**. Users can also favorite movies and view trailers, and the app supports both light and dark themes using a custom `ThemeContext`.

### 🌍 [Live Demo](https://react-movie-database-alx.vercel.app/)

### 📐 [Figma Design](https://www.figma.com/design/IWao7gu17xvrnSoqFW97Gf/Movie-Database?node-id=0-1&t=Z7f1BrPbbb1QaVDg-1)

## 🚀 Features

- **Movie Search**: Search for movies by title using the OMDb API.
- **Movie Details**: Detailed movie information, including plot, genre, cast, and release year.
- **Movie Trailer**: Watch movie trailers via YouTube integration.
- **Favorites**: Add movies to a favorites list, stored locally using Local Storage.
- **Genres**: Filter movies by genre.
- **Top Rated**: Explore top-rated movies.
- **Upcoming**: Discover upcoming movie releases.
- **Light/Dark Mode**: Toggle between light and dark themes using the Theme Context.
- **Responsive Design**: Mobile-first approach with Tailwind CSS for seamless UI across all devices.
  
## 🛠️ Tech Stack

- **Vite**: Fast development environment.
- **React**: For building dynamic, component-based UI.
- **Tailwind CSS**: For responsive, utility-first styling.
- **OMDb API**: For retrieving movie data.
- **YouTube API**: For embedding movie trailers.
- **React Router DOM**: For client-side routing between different pages.
- **Axios**: For handling HTTP requests to the APIs.

## 📄 Pages

- **Home**: Displays random movies or suggestions.
- **Favorites**: View a list of favorited movies.
- **Genre**: Browse movies by genre.
- **Top Rated**: Browse top-rated movies.
- **Upcoming**: Explore upcoming movie releases.
- **About**: Learn more about the Movie Database project.
- **Trailer**: Watch trailers.

## 🎬 Components

- **MovieCard**: A card displaying movie information like title, poster, and rating.
- **MovieDetails**: A page showing(on hover) detailed information about a selected movie.
- **SearchBar**: A component that allows users to search for movies by title.
- **NavBar**: The main navigation bar for routing between pages.

## 🌐 API Integration

- **OMDb API**: Used for searching movies and fetching details like title, plot, poster, and ratings.
- **YouTube API**: Integrated to show movie trailers on the trailer page.



