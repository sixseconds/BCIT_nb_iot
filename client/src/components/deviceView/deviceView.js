import React from "react";

import HumidityChart from '../charts/humidtiyChart.js';
import TemperatureChart from '../charts/tempChart.js';
import PressureChart from '../charts/pressureChart';

function DeviceView(props) {
    return (
        <div>
            <h2>{props.device.name}</h2>
            <button
                onClick={() => {props.updateRouteLocation(null)}}
            >&#x2302; Home</button>
            <button
                onClick={() => {props.updateRouteLocation("Locations", props.device.location)}}
            >{"Go to " + props.device.location.replace("floor", "Floor").replace(".png", "")}</button>
            <br/>
            <br />
            <div>
                <TemperatureChart data={props.device.tempData}></TemperatureChart>
            </div>
            <div>
                <HumidityChart data={props.device.humidityData}></HumidityChart>
            </div>
            <div>
                <PressureChart data={props.device.pressureData}></PressureChart>
            </div>
        </div>
    );
}

export default DeviceView;