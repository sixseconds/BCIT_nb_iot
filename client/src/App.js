import React from 'react';
import logo from './logo.svg';
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

const dummyData = [
  {
    id: 0,
    name: "iot_device_0",
    temp: "37.2",
    humidity: "20%",
    pressure: "98Kpa"
  },
  {
    id: 1,
    name: "iot_device_1",
    temp: "37.2",
    humidity: "20%",
    pressure: "98Kpa"
  },
  {
    id: 2,
    name: "iot_device_2",
    temp: "37.2",
    humidity: "20%",
    pressure: "98Kpa"
  }
]

export default class App extends React.Component{

  constructor() {
    super();
    this.state = {
      routeLocation: "Home",
      deviceViewId: null
    }
    
    this.updateRouteLocation = this.updateRouteLocation.bind(this);
  }
  
  updateRouteLocation(newLocatioon, id=null) {
    this.setState({
      routeLocation: newLocatioon,
      deviceViewId: (id != null && newLocatioon == "Device") ? id : null
    })
  }

  render() {
    
    let main;
    
    switch (this.state.routeLocation) {
      case "Home":
        main = null;
        break;
      case "Locations":
        main = <Locations />
        break;
      case "Devices":
        main = <Devices dummyData={dummyData} updateRouteLocation={this.updateRouteLocation} />
        break;
      case "Device":
        main = <DeviceView dummyData={dummyData[this.state.deviceViewId]} />
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
