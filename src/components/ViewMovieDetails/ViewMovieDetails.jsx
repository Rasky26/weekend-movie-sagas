// Import the core functions / hooks
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useHistory, useParams } from "react-router-dom"

// Import the used components
import MissingMovie from "./MissingMovie"

// Component that shows details for an individual movie
export default function ViewMovieDetails(movie) {

    // Get the variables out of the URL
    const { id, movieTitle } = useParams()

    // Initialize the various functions
    const dispatch = useDispatch()
    const history = useHistory()
    const movieDetails = useSelector(store => store.movieDetails)

    // Update the STATE for the specific movie, or if
    // the URL id changes
    useEffect(() => 
        dispatch({
            type: "GET_MOVIE_DETAILS",
            payload: {
                id,
                movieTitle,
            }
        }),
        [id] // Track if the `movieDetails` STATE changes
    )

    // Function that takes the user back to the previous page
    const onClickGoBack = () => {
        history.goBack()
    }

    // Check for an empty string (error checking)
    if (!movieDetails) {
        return (
            <MissingMovie />
        )
    }

    // Otherwise, build out the movie detail page
    return (
        <section>
            <button onClick={onClickGoBack} title="Previous Page">
                &larr;
            </button>
            <Link to="/" title="Return Home">Home</Link>
            <h2>{movieDetails.title}</h2>
            <img src={movieDetails.poster} alt={`${movieDetails.title} movie poster`} />
            <p>{movieDetails.description}</p>
        </section>
    )
}