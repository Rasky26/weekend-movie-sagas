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

    return (
        <main>
            <h1>MovieList</h1>
            <section className="movies-container">
                {movies.map(movie => 
                    <MovieCard
                        key={movie.id}
                        movie={movie}
                    />
                )}
            </section>
        </main>

    );
}

export default MovieList;