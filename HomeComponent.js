import React from 'react'
import ReactDOM from 'react-dom'
import './App.css';
import logo from './parkingplans.JPG'
import pic from './bell.png'

export default class HomeComponent extends React.Component {
  render () {
    return <div className="back">
    	<div className="App">
    		<p className="Header"> BCIT IoT</p>
    		<p> This website will show the statistics of the data gathered by the IoT sensors that have been placed in the underground parking of BCIT Downtown Campus. Each device is
    		equipped with variouss sensors to measure different parameters. </p>
      		<a href="https://www.google.ca/" className="subhead">Locations</a>
      		<p> {"\n"}</p>
      		<button variant="outline-primary" className="button">Floor 1</button>
      		<button variant="outline-primary" className="button">Floor 2</button>
      		<button variant="outline-primary" className="button">Floor 3</button>
      		<button variant="outline-primary" className="button">Floor 4</button>
      		<p> {"\n"}</p>
      		<p className="pad"> The locations of the devices in the levels of the parking garage </p>
      		<img src={logo} alt="Logo" className="img"/>;
      		<p> {"\n"}</p>
      		<a href="https://www.google.ca/" className="subhead">Anomalies</a>
      		<p> {"\n"}</p>
      		<p className="pad"> Anomaly notifications </p>
      		<img src={pic} alt="Logo" className="img2"/>
    	</div>
    </div>
  }
}
const el = document.body
ReactDOM.render(<HomeComponent name='John' />, el)
