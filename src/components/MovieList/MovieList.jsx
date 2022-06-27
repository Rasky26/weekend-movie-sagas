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

    const onMovieFocus = (value, index) => {
        console.log(value, index, "?????")
    }

    return (
        <main>
            <h1>MovieList</h1>
            <div className='movie-container'>
                <div className='slider'>
                    {movies.map(movie => 
                        <MovieCard
                            key={movie.id}
                            movie={movie}
                        />
                    )}
                </div>
            </div>
        </main>

    );
}

export default MovieList;