import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {$,jQuery} from 'jquery';
import Suggestion from "./Suggestion.js";

import './Main.css'

//принимает на вход погоду, город и детализацию погоды
//возвращает блок с погодой
class WeatherDayE extends Component {
  constructor(props){
    super(props);
    this.returnDay = this.returnDay.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  setImage(type){
    switch (type){
      case 'sn':
        return 'https://www.metaweather.com/static/img/weather/sn.svg';
      case 'sl':
        return 'https://www.metaweather.com/static/img/weather/sl.svg';
      case 'h':
        return 'https://www.metaweather.com/static/img/weather/h.svg';
      case 't':
        return 'https://www.metaweather.com/static/img/weather/t.svg';
      case 'hr':
        return 'https://www.metaweather.com/static/img/weather/hr.svg';
      case 'lr':
        return 'https://www.metaweather.com/static/img/weather/lr.svg';
      case 's':
        return 'https://www.metaweather.com/static/img/weather/s.svg';
      case 'hc':
        return 'https://www.metaweather.com/static/img/weather/hc.svg';
      case 'lc':
        return 'https://www.metaweather.com/static/img/weather/lc.svg';
      case 'c':
        return 'https://www.metaweather.com/static/img/weather/c.svg';
    }
  }

  returnDay(isDetailed){
    if(isDetailed){
      return(
        <div>
          Weather:     {this.props.weather.weather_state_name}<br />
          Temperature: {this.props.weather.the_temp}          <br />
          Min:         {this.props.weather.min_temp}          <br />
          Max:         {this.props.weather.max_temp}          <br />
          Wind speed:  {this.props.weather.wind_speed}        <br />
          AP:          {this.props.weather.air_pressure}      <br />
          Humidity:    {this.props.weather.humidity}          <br />
        </div>
      );
    }
    else{
      return(
        <div className='cls'>
          TODAY in {this.props.city.title}
          <img src={this.setImage(this.props.weather.weather_state_abbr)}
                      alt=''/><br />
          Temperature: {Math.round(this.props.weather.the_temp)}          <br />
          Pressure:    {Math.round(this.props.weather.air_pressure)}      <br />
        </div>
      );
    }
  }


  render() {
    return(
      <div>
        {this.returnDay(this.props.isDetailed)}
      </div>
    );
  }
}


//делает запросы к серверу и отдаёт результаты компоненту WeatherDayE
//для рендера
class LocalWeather extends Component {
  constructor (props) {
    super(props);
    this.state = {weather: [],
                  city: []};
    this.isGeo = this.isGeo.bind(this);
    this.requestCity = this.requestCity.bind(this);
  }

  //определяет местопложение устройства, вызывает колбэк requestCity
  isGeo (callRequestCity) {
    function showPos (position){
      self.setState({lat: position.coords.latitude, long: position.coords.longitude});

      //вызов requestCity c колбэком requestWeather
      callRequestCity.call(self, self.state.lat, self.state.long, self.requestWeather);
      return {'latitude' : position.coords.latitude,
              'longitude': position.coords.longitude};
    }
    let self = this;
    if ('geolocation' in navigator){
       return navigator.geolocation.getCurrentPosition(showPos)
    }
    else{
      return 0;
    }
  }

  //запрос к серверу на основе геоданных
  //результаты записывает в state
  requestCity (lat, long, callRequestWeather) {
    let url = "https://www.metaweather.com/api/location/search/?lattlong=";
    let query = url + lat + ',' + long;
    let myHeaders = new Headers();
    fetch(query, { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' })
    .then(async(response) => {
      let resp = await response.json();
      let nearestCity = await resp[0];
      console.dir('near city:' + await nearestCity.woeid);
      this.setState({city: nearestCity});
      callRequestWeather.call(this, nearestCity.woeid);
    })
    .catch(() => console.log("Error!!!"))
  }

  //запрос погоды в указанном location
  requestWeather(location){
    let url = "https://www.metaweather.com/api/location/";
    let query = url + location;
    let myHeaders = new Headers();
    fetch(query, { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' })
    .then(async(response) => {
      let resp = await response.json();

      this.setState({weather:await resp['consolidated_weather'][0]});
    })
    .catch(() => console.log('requestWeather error!'));
  }

  componentDidMount() {
      this.isGeo(this.requestCity.bind(this));
    }

  render() {
    return (
      <div>
        <WeatherDayE weather={this.state.weather}
        city={this.state.city}
        isDetailed={false} />
      </div>
    );
  }
}


class Main extends Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.inputRef = React.createRef();
    this.state = {suggArray:[""],
                  currentInput: ""};
  }

  //запросы к серверу на основе ввода в input
  //внутри компонент Suggestion рендерит ответы сервера
  handleInput(event) {
    let url = "https://www.metaweather.com/api/location/search/?query=";
    let value = event.target.value;
    let query = url + value;

    if (value){
      let myHeaders = new Headers();
      fetch(query, { method: 'GET',
                 headers: myHeaders,
                 mode: 'cors',
                 cache: 'default' })
      .then(async (response) => {
          let resp = await response.text();
          let array = [];

          if (resp){
            resp = JSON.parse(resp);
            for (let i in resp) {
              array.push(resp[i]);}
          }

          this.setState({suggArray: array});
      })
      .catch(() => console.log("Error!!!"))
    }
  }



  render() {
    return(
      <div className="main_module">
        <div className="searchField">
          <input className="inputField"
          onChange={this.handleInput} ref={this.inputRef}
          placeholder='Search...' />
          <Suggestion className="suggestionField"
            suggestionArray={this.state.suggArray}
            insertSuggestion={this.insertSuggestion} />
        </div>
        <div className="localWeather">
          <LocalWeather />
        </div>
      </div>
    );
  }
}

export default Main;
