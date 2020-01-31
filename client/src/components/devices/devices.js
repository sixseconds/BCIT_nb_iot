import React from 'react';

const Card = (props) => {
  return (
    <div style={{
      padding: "1rem",
      border: "5px solid black",
      borderRadius: "2%",
      minWidth: 300,
      margin: "0.25rem"
    }}>
      <h4>{props.deviceData.name}</h4>
      <h5>Latest update: -</h5>
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

export default function Devices (props) {  
  return (
    <div style={{
      display: "flex",
      flexWrap: "wrap"
    }}>
      {
        props.dummyData.allDevices.map(device => <Card deviceData={device} updateRouteLocation={props.updateRouteLocation} />)
      }
    </div>
  )
}

