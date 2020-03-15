import React, { Component } from 'react';
import './App.css';
import apiConfig from './ApiKey';
import WeekView from './pages/weekview/Weekview';
import DayView from './pages/dayview/Dayview';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

class App extends Component {
  
  state = {
    allData:[],
    currentTime:[],
    currentDay:[],

    // todo local area
    city:'København'
  }

  componentDidMount = () => {        
      const city = this.state.city
      const weekURL = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&lang=da&APPID=${apiConfig.apiKey}`
      fetch(weekURL)
          .then(res => res.json())
          .then(wdata => {
              const timeNow = new Date().getHours()
              // isolating dataset instances within 3hours from current time (data gets pulled every 3h for 5d)
              // todo make dry
              const currentTimeTable = wdata.list.filter(reading => new Date(reading.dt_txt).getHours() >= timeNow && new Date(reading.dt_txt).getHours() < timeNow +3)
              const currentDayTable = wdata.list.filter(reading => new Date(reading.dt_txt))
              currentDayTable.length = 5;

              this.setState({
                  allData: wdata,
                  currentTime: currentTimeTable,
                  currentDay: currentDayTable
              }, () => console.log(this.state))
          })  
  }

  render() {
    return(
    <div className="App">
      <Router>
        <nav>
          <li>
            <Link to="/">Dagens vejr</Link>
            </li>
            <span id="navPipe">|</span>
            <li>
            <Link to="/uge">Ugens vejr</Link>
            </li>
        </nav>

        <Switch>
          <Route exact path="/">
            <DayView reading1={this.state.currentDay}/>
          </Route>
          <Route path="/uge">
            <WeekView reading={this.state}/>
          </Route>
        </Switch>
      </Router>
    </div>
    );
  }
}

export default App;
