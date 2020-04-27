import React, { Component } from 'react';
import './App.css';
import WeekView from './pages/weekview/Weekview';
import DayView from './pages/dayview/Dayview';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  
  render() {
    return(
    <div className="App">
      <Router>
        <nav>
          <li>
            <Link to="/weather-app">Dagens vejr</Link>
            </li>
            <span id="navPipe">|</span>
            <li>
            <Link to="/weather-app/uge">Ugens vejr</Link>
            </li>
        </nav>

        <Switch>
          <Route exact path="/weather-app">
            <DayView />
          </Route>
          <Route path="/weather-app/uge">
            <WeekView />
          </Route>
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
