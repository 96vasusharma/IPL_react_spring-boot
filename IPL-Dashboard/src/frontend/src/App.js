import './App.scss';
import { TeamPageDataFetch } from './pages/TeamPageDataFetch';
import { MatchPageDataFetch } from './pages/MatchPageDataFetch';
import { HomePageDataFetch } from './pages/HomePageDataFetch';
import { Header } from './components/Header';
import { HashRouter as Router, Route, Routes } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      {/* colon in path url is the path variable
          Routes pick the first match for the path
       */}
      <Router>

        {/* Home icon */}
        <Header />

        <Routes>
          {/* Match Page , "year" query param is mandatory */}
          <Route path="/team/:teamName/matches" element = {<MatchPageDataFetch />} />
          {/* Team Page */}
          <Route path="/team/:teamName" element = {<TeamPageDataFetch />} />
          {/* Home Page */}
          <Route path="/*" element = {<HomePageDataFetch />} />
        </Routes>
      </Router>

    </div>
  );
}

export default App;
