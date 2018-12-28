import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import './App.css';
import Main from './Main.js';
import WeatherLong from "./WeatherLong.js";
import WeatherDetailed from "./WeatherDetailed.js";

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <Route exact path="/" component={Main} />
            <Route exact path="/:location/:year/:month/:day" component={WeatherLong} />
            <Route path="/:location" component={WeatherDetailed} />
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
