// Import the core libraries
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import the used components
import MovieCard from './MovieCard';


// Component that builds the movie list slider based on the supplied category
export default function MovieList({ genre }) {

    // Get the movies list from the database
    const movies = useSelector(store => store.movies);

    // Initialize the moviesList
    let moviesList
    // Filter the movies list against the genre filter
    if (genre === 'All Movies') {
        moviesList = movies
    }
    else {
        moviesList = movies.filter(movie => movie.genres.includes(genre))
    }
        
    // Listener for clicking the handle buttons
    const onClickHandle = (event) => {
        // Initialize the 'handle' variable
        let handle
        
        // Get the handle content if the matching CSS property was found
        if (event.target.matches(".handle"))  {
            handle = event.target
        }
        // Otherwise, I clicked on the text and need to get the parent (closest) element
        else {
            handle = event.target.closest(".handle")
        }

        // Check that a valid ".handle" was clicked on
        if (handle !== null) {
            onValidHandleClick(handle)
        }
    }

    // Function that handles the movement of our video slider
    const onValidHandleClick = (handle) => {
        // This handles the closest slider, regardless of the number of ".slider" containers
        const slider = handle.closest(".movie-container").querySelector(".slider")

        // Get the current value of the slider
        const sliderIndex = parseInt(getComputedStyle(slider).getPropertyValue("--slider-index"))

        // Check if the button clicked was the left handle
        if (handle.classList.contains("left-handle")) {
            // Update the CSS style for that slider element
            slider.style.setProperty("--slider-index", sliderIndex - 1)
        }

        // Check if the button clicked was the right handle
        if (handle.classList.contains("right-handle")) {
            // Update the CSS style for that slider element
            slider.style.setProperty("--slider-index", sliderIndex + 1)
        }
    }



    return (
        <section>
            <div className='header'>
                <h3 className='title'>{genre === 'All Movies' ? 'All Movies' : genre}</h3>
                <div className='progress-bar'>
                    <div className="progress-item"></div>
                    <div className="progress-item active"></div>
                    <div className="progress-item"></div>
                    <div className="progress-item"></div>
                </div>
            </div>

            <div className='movie-container'>

                <button
                    className="handle left-handle"
                    onClick={onClickHandle}
                >
                    &#8249;
                </button>

                <div className='slider'>
                    {moviesList.map(movie => 
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    )}
                </div>

                <button
                    className="handle right-handle"
                    onClick={onClickHandle}
                >
                    &#8250;
                </button>
            </div>
        </section>

    );
}