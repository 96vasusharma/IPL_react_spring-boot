import './App.css';
import { TeamPageDataFetch } from './pages/TeamPageDataFetch';
import { MatchPageDataFetch } from './pages/MatchPageDataFetch';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* colon in path url is the path variable
          Routes pick the first match for the path
       */}
      <Router>
        <Routes>
          {/* Match Page , "year" query param is mandatory */}
          <Route path="/team/:teamName/matches" element = {<MatchPageDataFetch />} />
          {/* Team Page */}
          <Route path="/team/:teamName" element = {<TeamPageDataFetch />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
