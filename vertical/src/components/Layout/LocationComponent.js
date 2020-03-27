import React, { Component } from 'react';
import Locations from './Locations';
import { activateAuthLayout } from '../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

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

class LocationsComponent extends Component {
  
    componentDidMount () {
        this.props.activateAuthLayout();
    }
  
    render() {
        return(
            <Locations dummyData={dummyData}/>
        )
    }
    
}


export default withRouter(connect(null, { activateAuthLayout })(LocationsComponent));

