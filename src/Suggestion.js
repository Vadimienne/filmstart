import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {$,jQuery} from 'jquery';


class Suggestion extends Component {
  constructor (props) {
    super(props);
    this.generateList = this.generateList.bind(this);
  }

  generateList(array){
    let newList = array.map((city) => <li onClick={this.props.insertSuggestion(city)}>{city}</li>);
    return newList;
  }

  render() {
    return(
      <ul>
        {this.generateList(this.props.suggestionArray)}
      </ul>
    )
  }
}

export default Suggestion;
