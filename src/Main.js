import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {$,jQuery} from 'jquery';
import Suggestion from "./Suggestion.js";


class Main extends Component {
  constructor (props) {
    super(props);
    this.handleInput = this.handleInput.bind(this);
    this.inputRef = React.createRef();
    this.state = {suggArray:[""],
                  currentInput: ""};
  }

  insertSuggestion(event, suggestion) {
    //event.target.parentNode.querySelector("input").value = suggestion;
    //this.inputRef.current.value = suggestion;
  }

  handleInput(event) {
    //this.setState({currentInput: event.target.value});
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
              array.push(resp[i].title);}
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
          <input onChange={this.handleInput} ref={this.inputRef} />
          <Suggestion className="suggestionField"
            suggestionArray={this.state.suggArray}
            insertSuggestion={this.insertSuggestion} />
          <Link to='/2122265'> LINK</Link>
        </div>
        <div className="localWeather"></div>
      </div>
    );
  }
}

export default Main;
