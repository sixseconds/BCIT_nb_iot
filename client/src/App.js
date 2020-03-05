import React from 'react';
import './App.css';
import Nav from './components/nav/nav.js';
import Locations from './components/locations/locations';
import Devices from './components/devices/devices.js'
import DeviceView from './components/deviceView/deviceView';

const styles = {
  app: {
    maxWidth: 1200,
    marginLeft: "auto",
    marginRight: "auto",
    padding: "2rem",
    display: "flex"
  },
  main: { 
    padding: "0.5rem", 
    flex: 2,
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
}

const dummyData = {
  allDevices: [
    {
      id: 0,
      name: "iot_device_0",
      temp: "13.4",
      tempData: [14, 12, 18, 12, 12, 11, 16, 12],
      humidity: "20%",
      humidityData: [21, 20, 20, 21, 20, 20, 20, 20],
      pressure: "98Kpa",
      pressureData: [98, 97, 98, 99, 100, 99, 99, 99],
      location: "floor1.png",
      coords: ["15%", "65%"]
    },
    {
      id: 1,
      name: "iot_device_1",
      temp: "14.2",
      tempData: [14, 12, 12, 12, 11, 14, 14],
      humidity: "20%",
      humidityData: [20, 20, 22, 21, 20, 19, 20, 20],
      pressure: "98Kpa",
      pressureData: [99, 100, 99, 99, 99, 98, 97, 98],
      location: "floor1.png",
      coords: ["55%", "35%"]
    },
    {
      id: 2,
      name: "iot_device_2",
      temp: "13.0",
      tempData: [14, 12, 12, 11, 16, 12, 13, 13],
      humidity: "23%",
      humidityData: [20, 20, 20, 22, 20, 21, 21, 23],
      pressure: "98Kpa",
      pressureData: [98, 97, 98, 99, 100, 99, 99, 99],
      location: "floor2.png",
      coords: ["25%", "35%"]
    }
  ],
  floors: ["floor1.png", "floor1m.png", "floor2.png"]
}

export default class App extends React.Component{

  constructor() {
    super();
    this.state = {
      routeLocation: "Home",
      deviceViewId: null,
      floorViewId: null
    }
    
    this.updateRouteLocation = this.updateRouteLocation.bind(this);
  }
  
  updateRouteLocation(newLocation, id=null) {
    this.setState({
      routeLocation: newLocation,
      deviceViewId: (id !== null && newLocation === "Device") ? id : null,
      floorViewId: (id !== null && newLocation === "Locations") ? id : null
    })
  }

  render() {
    
    let main;
    
    switch (this.state.routeLocation) {
      case "Home":
        main = null;
        break;
      case "Locations":
        main = (this.state.floorViewId != null) ? 
          <Locations dummyData={dummyData} updateRouteLocation={this.updateRouteLocation} /> :
          <Locations dummyData={dummyData} updateRouteLocation={this.updateRouteLocation} floor={this.state.floorViewId} /> 
        break;
      case "Devices":
        main = <Devices dummyData={dummyData} updateRouteLocation={this.updateRouteLocation} />
        break;
      case "Device":
        main = <DeviceView device={dummyData.allDevices[this.state.deviceViewId]} updateRouteLocation={this.updateRouteLocation} />
        break;
    }
    
    return (
      <div style={styles.app}>
        <Nav updateRouteLocation={this.updateRouteLocation} style={{ flex: 1 }} />
        
        <div style={styles.main}>
          { main }
        </div>
        
      </div>
    )
  }

}
