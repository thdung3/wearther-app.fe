import React from 'react';
import { Switch, Route } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import HomePage from './containers/HomePage'
import WeatherPage from './containers/WeatherPage'

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route path="/:city" exact component={WeatherPage} />
      </Switch>
    </div>
  );
}

export default App;
