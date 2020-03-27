import React, { Component } from 'react';
import Locations from './Locations';

const dummyData = {
    allDevices: [
      {
        id: 0,
        location: "floor1.png",
        coords: ["35%", "55%"]
      },
      {
        id: 1,
        location: "floor1m.png",
        coords: ["55%", "35%"]
      },
      {
        id: 2,
        location: "floor2.png",
        coords: ["25%", "35%"]
      }
    ],
    floors: ["floor1.png", "floor1m.png", "floor2.png"]
  }

export default class LocationsComponent extends Component {
    render() {
        return(
            <Locations dummyData={dummyData}/>
        )
    }
}