import React, { Component } from 'react';
import DeviceView from '../deviceView/deviceView.js';

const Card = (props) => {
  return (
    <div style={{
      padding: "1rem",
      border: "3px solid black",
      borderRadius: "2%",
      minWidth: 300,
      margin: "0.25rem"
    }}>
      <h4>{props.deviceData.name}</h4>
      <h6>Latest update: -</h6>
      <div>
        <p>Tempterature: {props.deviceData.temp}</p>
        <p>Pressure: {props.deviceData.pressure}</p>
        <p>humidity: {props.deviceData.humidity}</p>
      </div>
      <br />
      <button onClick={() => {props.updateRouteLocation("Device", props.deviceData.id)}}>Show more</button>
    </div>
  )
}

export default class Devices extends Component {
  
  constructor (props) {
    super(props)
  }
  
  render() {
    return (
      <div style={{
        display: "flex",
        flexWrap: "wrap"
      }}>
        {
          this.props.dummyData.map(device => <Card deviceData={device} updateRouteLocation={this.props.updateRouteLocation} />)
        }
      </div>
    )
  }
}

