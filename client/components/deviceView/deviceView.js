import React from "react";

import TemperatureChart from './components/charts/tempChart.js'
import HumidityChart from './components/charts/humidityChart.js'
import PressureChart from './components/charts/pressureChart.js'

function App() {
    return (
        <div className='App'>
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

export default App;