// Import the core functions / hooks
import { Link } from "react-router-dom"

// Component that informs the user the movie they searched for
// could not be found.
//
// Likely reaches this route if they modify the URL to a
// movie ID that does not exist in the database
export default function MissingMovie() {

    console.log("blanksadf")

    // Build the DOM element
    return (
        <section>
            <h2>Could not find movie...</h2>
            <Link to="/">Return Home</Link>
        </section>
    )
}