import React, { Component } from 'react';
import './App.css';
import WeekView from './pages/weekview/Weekview';
import DayView from './pages/dayview/Dayview';

class App extends Component {
  render() {
    return(
      <div className="App">
        <DayView />
      </div>
    );
  }
}

export default App;
