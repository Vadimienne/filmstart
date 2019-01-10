import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import './App.css';
import Main from './Main.js';
import WeatherLong from "./WeatherLong.js";
import WeatherDetailed from "./WeatherDetailed.js";
import MyMap from './MyMap.js';

class App extends Component {
  render() {
    return (
        <BrowserRouter>
          <div>
            <div className='pageHeader'>
            <Link to='/' className='pageHeader'> WEATHER </Link> </div>
            <Route exact path="/" component={Main} />
            <Route exact path="/:location/:year/:month/:day" component={WeatherLong} />
            <Route exact path="/location/:location" component={WeatherDetailed} />
            <Route exact path="/map" component={MyMap}/>
          </div>
        </BrowserRouter>
    );
  }
}

export default App;
