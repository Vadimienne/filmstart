import React, { Component } from 'react';
//import { Marker, Map as YMap, MarkerLayout } from 'yandex-map-react';
import {YMaps, Map, Placemark} from 'react-yandex-maps';

class MyMap extends Component {
  constructor(props) {
    super (props);
    //this.init = this.init.bind(this);
    this.state = {lon: 55, lat: 55};
    this.myPlacemark = this.myPlacemark.bind(this);
  }

   myPlacemark()  {return(
     <YMaps >
      <Map defaultState={{ center: [55.75, 37.57], zoom: 9}} >

      </Map>

    </YMaps>);}

  render() {
    return(
      <div className="ymaps">
        {this.myPlacemark()}

      </div>
    );
  }
}

export default MyMap;
