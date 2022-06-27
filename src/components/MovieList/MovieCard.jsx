// Import the `useHistory` function to navigate to a specific movie
import { useHistory } from "react-router-dom";


// Display the specific movie card from the list
export default function MovieCard({ movie }) {

    // Initialize the history function
    const history = useHistory()

    // Click listener navigate to the specific movie
    // that was clicked on
    const onClickMovieCard = () => {
        // Navigate to the specific page via the ID in the URL.
        // Movie names 
        history.push(`/details/${movie.id}/${movie.title.split(" ").join("-")}`)
    }

    // Render out the DOM elements
    return (
        <div className="movie-card" onClick={onClickMovieCard}>
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </div>
    );
}