import React, { Component } from 'react';
import './App.css';
import WeekView from './components/Weekview';

class App extends Component {
  render() {
    return(
      <div className="App">
        <WeekView />
      </div>
    );
  }
}

export default App;
