// Import the core functions / hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';

// Import the used components
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList'
import ViewMovieDetails from '../ViewMovieDetails/ViewMovieDetails';

// Import the stylesheet
import './App.css';


// Main construction area of the site
function App() {

  // Set the dispatch function
  const dispatch = useDispatch()

  // Initialize the movie list STATE values
  useEffect(() => 
    sendDispatches(),
    []
  )

  // Send the dispatch commands to populate the various STATES
  const sendDispatches = () => {
    dispatch({
      type: "FETCH_MOVIES",
    })
    dispatch({
      type: "FETCH_GENRES",
    })
  }

  // Get a list of genres
  const genres = useSelector(store => store.genres)
  console.log(genres)

  return (
    <div className="App">

      <Header />

      <Router>        
        <Route path="/" exact>
          
          {/* Show `All Movies` category */}
          <MovieList genre={'All Movies'} />

          {/* Show each category of movie */}
          {genres.map(genre =>
            <MovieList
              key={genre.id}
              genre={genre.name}
            />
          )}
        </Route>
        
        {/* Details page */}
        <Route path="/details/:id" exact>
          <ViewMovieDetails />
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
