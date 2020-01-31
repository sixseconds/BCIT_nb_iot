import React from "react";

import HumidityChart from '../charts/humidtiyChart.js';
import TemperatureChart from '../charts/tempChart.js';
import PressureChart from '../charts/pressureChart';

function DeviceView(props) {
    return (
        <div>
            <h2>{props.dummyData.name}</h2>
            <div>
                <TemperatureChart></TemperatureChart>
            </div>
            <div>
                <HumidityChart></HumidityChart>
            </div>
            <div>
                <PressureChart></PressureChart>
            </div>
        </div>
    );
}

export default DeviceView;