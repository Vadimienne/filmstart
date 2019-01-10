import React, { Component } from 'react';
import {WeatherDayE} from './WeatherDetailed.js';
import './WeatherLong.css';

//компонент делает запрос серверу
// использует WeatherDayE, чтобы отрендерить ответ
// на выходе - один блок с детализированной погодой на день
class WeatherLong extends Component {

  constructor(props) {
    super(props);
    this.makeRequest = this.makeRequest.bind(this);
    this.state = {weather: []};
  }

  makeRequest(location, year, month, day){
    let url = "https://www.metaweather.com/api/location/";
    let query = url + location +'/'+ year +'/'+ month +'/'+ day;
    console.log(query);
    let myHeaders = new Headers();
    fetch(query, { method: 'GET',
               headers: myHeaders,
               mode: 'cors',
               cache: 'default' })
    .then(async(response) => {
      let resp = await response.json();
      //console.log(resp['consolidated_weather'][0]['id']);
      this.setState({weather:await resp[0]});
      //console.log(this.state.weather[0]);
    })
  }



  componentDidMount() {
    this.makeRequest(this.props.match.params.location,
                    this.props.match.params.year,
                    this.props.match.params.month,
                    this.props.match.params.day);
  }


  render() {
    return(
      <div className="wDetailed_module">
        <WeatherDayE weather={this.state.weather}
        isDetailed={true} />
      </div>
    );
  }
}

export default WeatherLong;
