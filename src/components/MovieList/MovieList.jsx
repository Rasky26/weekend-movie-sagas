// Import the core libraries
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// Import the used components
import MovieCard from './MovieCard';

// Import the relative styles
import styles from './MovieList.module.css'

function MovieList() {

    const dispatch = useDispatch();
    const movies = useSelector(store => store.movies);

    useEffect(() => {
        dispatch({ type: 'FETCH_MOVIES' });
    }, []);

    // Listener for clicking the handle buttons
    const onClickHandle = (event) => {
        // Initialize the 'handle' variable
        let handle
        
        // Get the handle content
        console.log(event.target.classList) //to change style via css
        if (event.target.matches(".handle"))  {
            handle = event.target
            console.log("Yup")
        }
        else {
            handle = event.target.closest(".handle")
            console.log("Yupp")
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
        <main>
            <h1>MovieList</h1>
            <div className='movie-container'>

                <button
                    className="handle left-handle"
                    onClick={onClickHandle}
                >
                    &#8249;
                </button>

                <div className='slider'>
                    {movies.map(movie => 
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
        </main>

    );
}

export default MovieList;