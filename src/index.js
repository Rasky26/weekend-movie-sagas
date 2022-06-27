import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './components/App/App.js';
import { createStore, combineReducers, applyMiddleware } from 'redux';
// Provider allows us to use redux within our react app
import { Provider } from 'react-redux';
import logger from 'redux-logger';
// Import saga middleware
import createSagaMiddleware from 'redux-saga';
import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

// Create the rootSaga generator function
function* rootSaga() {
    // Get all movies from the database
    yield takeEvery('FETCH_MOVIES', fetchAllMovies)
    // Get a specific movie from the database
    yield takeEvery("GET_MOVIE_DETAILS", fetchMovieDetails)
}

// Function that gets an array of movies from the DB
function* fetchAllMovies() {
    try {
        // Get the list of movies from the DB
        const movies = yield axios.get('/api/movie');
        // Update the STATE with the list of movies
        yield put({ type: 'SET_MOVIES', payload: movies.data });

    } catch (err) {
        console.log(`Error in the GET movie route with ${err}`);
    }       
}

// Function that gets a specific movie's detail from the database
function* fetchMovieDetails(action) {
    try {
        // Get the specific movie & details from the DB
        const movie = yield axios.get(`/api/movie/details/${action.payload.id}`)
        // Update the STATE with that specific movie
        yield put({ type: "SET_ONE_MOVIE", payload: movie.data })
    }
    catch (err) {
        console.log(`Error in the GET one movie route with ${err}`);
    }
}

// Create sagaMiddleware
const sagaMiddleware = createSagaMiddleware();

// Used to store movies returned from the server
const movies = (state = [], action) => {
    switch (action.type) {
        case 'SET_MOVIES':
            return action.payload;
        default:
            return state;
    }
}


// Used to store the specific movie in STATE
const movieDetails = (state = {}, action) => {
    switch (action.type) {
        case "SET_ONE_MOVIE":
            return action.payload
        default:
            return state
    }
}

// Used to store the movie genres
const genres = (state = [], action) => {
    switch (action.type) {
        case 'SET_GENRES':
            return action.payload;
        default:
            return state;
    }
}

// Create one store that all components can use
const storeInstance = createStore(
    combineReducers({
        movies,            // Array of movies
        movieDetails, // One movie's details
        genres,
    }),
    // Add sagaMiddleware to our store
    applyMiddleware(sagaMiddleware, logger),
);

// Pass rootSaga into our sagaMiddleware
sagaMiddleware.run(rootSaga);

ReactDOM.render(
    <React.StrictMode>
        <Provider store={storeInstance}>
        <App />
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
);
