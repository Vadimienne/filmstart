import React, { Component } from 'react';

class WeatherDay extends Component {
  constructor(props){
    super(props);
    this.weather = this.props.weather;
  }


  render() {
    return(
      <div>
        Weather:     {this.props.weather.weather_state_name}<br />
        Temperature: {this.props.weather.the_temp}          <br />
        Min:         {this.props.weather.min_temp}          <br />
        Max:         {this.props.weather.max_temp}          <br />
        Wind speed:  {this.props.weather.wind_speed}        <br />
        AP:          {this.props.weather.air_pressure}      <br />
        Humidity:    {this.props.weather.humidity}          <br /><br /><br />
      </div>
    );
  }
}

class WeatherDetailed extends Component {

  constructor(props) {
    super(props);
    this.makeRequest = this.makeRequest.bind(this);
    this.generateDay = this.generateDay.bind(this);
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

  generateDay(weatherProp) {
      return(weatherProp.map((weather) => <WeatherDay weather={weather} />)
      );
  }

  componentDidMount() {
    this.makeRequest(this.props.match.params.location);
  }


  render() {
    return(
      <div className="wDetailed_module">
        {this.generateDay(this.state.weather)}
      </div>
    );
  }
}

//function WeatherDetailed ()

export default WeatherDetailed;
