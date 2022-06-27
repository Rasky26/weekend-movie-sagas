// Import the core functions / hooks
import {HashRouter as Router, Route} from 'react-router-dom';

// Import the used components
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList'
import ViewMovieDetails from '../ViewMovieDetails/ViewMovieDetails';
import MovieSlider from '../MovieList/MovieList';

// Import the stylesheet
import './App.css';


// Main construction area of the site
function App() {
  return (
    <div className="App">

      <Header />

      <Router>        
        <Route path="/" exact>
          <MovieSlider genre={'All Movies'} />
          <MovieSlider genre={'Comedy'} />
          <MovieSlider genre={'Adventure'} />
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
