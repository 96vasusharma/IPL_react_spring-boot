import './App.css';
import { TeamPageDataFetch } from './pages/TeamPageDataFetch';
import { MatchPageDataFetch } from './pages/MatchPageDataFetch';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>

        <Switch>

          <Route path="/team/:teamName/matches/:year">
            <MatchPageDataFetch />
          </Route>

          <Route path="/team/:teamName">
            <TeamPageDataFetch />
          </Route>

        </Switch>

      </Router>

    </div>
  );
}

export default App;
