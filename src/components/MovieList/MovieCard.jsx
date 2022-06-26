// Display the specific movie card from the list
export default function MovieCard({ movie }) {

    // Render out the DOM elements
    return (
        <div className="movie-card">
            <h3>{movie.title}</h3>
            <img src={movie.poster} alt={movie.title}/>
        </div>
    );
}