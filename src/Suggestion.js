import React, { Component } from 'react';
import {BrowserRouter, Route, Link} from "react-router-dom";
import {$,jQuery} from 'jquery';


class Suggestion extends Component {
  constructor (props) {
    super(props);
    this.generateList = this.generateList.bind(this);
  }

  generateList(array){
    let newList = array.map((elem, index) => {
      let link = "/location/" + elem.woeid;
      return <Link to={link} key={index} className="suggestion"> {elem.title} </Link>;});
    console.log(newList);
    if (array[0] != ''){
    return newList;}
  }

  render() {
    return(
      <ul className='suggestionField'>
        {this.generateList(this.props.suggestionArray)}
      </ul>
    )
  }
}

export default Suggestion;
