import React, { Component } from 'react';
import './App.css';
import './WeatherDetailed.css';
import {BrowserRouter, Route, Link} from "react-router-dom";

//принимает на вход погоду погоду, уровень детализации, location id
//возвращает блок с погодой
class WeatherDayE extends Component {
  constructor(props){
    super(props);
    this.returnDay = this.returnDay.bind(this);
    this.setLink = this.setLink.bind(this);
    this.setImage = this.setImage.bind(this);
  }

  //возвращает ссылку на страницу с прогнозом на указанный день
  setLink(location, date) {
    let spl = date.split('-');
    let link ='/'+ location + '/' + spl[0] + '/' + spl[1] + '/' + spl[2];
    return(<Link to={link}>DETAILED</Link>);
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
        <div className='weatherBlock'>
          {this.props.weather.applicable_date}
          <img src={this.setImage(this.props.weather.weather_state_abbr)}
                        alt=''/><br />
          Temperature: {Math.round(this.props.weather.the_temp)}          <br />
          Min:         {Math.round(this.props.weather.min_temp)}          <br />
          Max:         {Math.round(this.props.weather.max_temp)}          <br />
          Wind speed:  {Math.round(this.props.weather.wind_speed)}        <br />
          Pressure:    {Math.round(this.props.weather.air_pressure)}      <br />
          Humidity:    {Math.round(this.props.weather.humidity)}          <br />
        </div>
      );
    }
    else{
      return(
        <div className='weatherBlock'>
          {this.props.weather.applicable_date}
          <img src={this.setImage(this.props.weather.weather_state_abbr)}
                      alt=''/><br />
          Temperature: {Math.round(this.props.weather.the_temp)}          <br />
          Pressure:    {Math.round(this.props.weather.air_pressure)}      <br />
          {this.setLink(this.props.location, this.props.weather.applicable_date)}
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

//главный блок страницы - делает запрос к серверу,
//возвращает все доступные на данный момент прогнозы
class WeatherDetailed extends Component {

  constructor(props) {
    super(props);
    this.makeRequest = this.makeRequest.bind(this);
    this.generateDays = this.generateDays.bind(this);
    this.state = {weather: []};
  }

  makeRequest(location){
    let url = "https://www.metaweather.com/api/location/";
    let query = url + location;
    let myHeaders = new Headers();
    fetch(query, { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' })
    .then(async(response) => {
      let resp = await response.json();
      //console.log(resp['consolidated_weather'][0]);
      this.setState({weather:await resp['consolidated_weather']});
    })
  }

  //из полученного с сервера массива генерирует блоки с погодой
  generateDays(weatherProp) {
      return(weatherProp.map((weather, index) => <WeatherDayE weather={weather}
      isDetailed={false}
      key={index}
      location={this.props.match.params.location} />)
      );
  }

  componentDidMount() {
    this.makeRequest(this.props.match.params.location);
  }


  render() {
    return(
      <div className="wLong_module">
        {this.generateDays(this.state.weather)}
      </div>
    );
  }
}

//function WeatherDetailed ()

export default WeatherDetailed;
export {WeatherDayE};
