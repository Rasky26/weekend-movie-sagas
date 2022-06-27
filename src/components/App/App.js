// Import the core functions / hooks
import {HashRouter as Router, Route} from 'react-router-dom';

// Import the used components
import Header from '../Header/Header';
import MovieList from '../MovieList/MovieList'
import ViewMovieDetails from '../ViewMovieDetails/ViewMovieDetails';

// Import the stylesheet
import './App.css';


// Main construction area of the site
function App() {
  return (
    <div className="App">

      <Header />

      <Router>        
        <Route path="/" exact>
          <MovieList />
        </Route>
        
        {/* Details page */}
        <Route path="/details/:id/:movieTitle" exact>
          <ViewMovieDetails />
        </Route>

        {/* Add Movie page */}
      </Router>
    </div>
  );
}


export default App;
