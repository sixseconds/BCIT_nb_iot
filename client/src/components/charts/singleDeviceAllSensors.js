import React, {
    Component
} from 'react';

import ReactApexChart from 'react-apexcharts';

// Chart to show the humidity readings from each device
export class SingleDeviceAllSensors extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data for each series
            series: [
                {
                    // device temperature sensor 
                    name: 'DeviceTemp',
                    type: 'line',
                    data: '', // TODO: add data 
                },
                {
                    // device humidity sensor
                    name: 'DeviceHumidity',
                    type: 'line',
                    data: '', // TODO: add data
                },
                {
                    // device pressure sensor
                    name: 'DevicePressure',
                    type: 'line',
                    data: '', // TODO: add data
                },
                {
                    // any additional sensors
                },
            ],
            options: {
                chart: {
                    height: 400,
                    type: 'line',
                    id: "allSensors",
                    foreColor: '#000000',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                // Chart title
                title: {
                    text: "Temperature, Humidity & Pressure Readings",
                    align: 'center',
                },
                // Toggle feature                
                legend: {
                    showForSingleSeries: false,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    offsetY: 10,
                    height: 50,
                    onItemClick: {
                        toggleDataSeries: true
                    },
                // chart theme    
                },
                theme: {
                    mode: 'light',
                    palette: 'palette8',
                },
                // marker options
                markers: {
                    size: 5,
                    style: 'inverted'
                },
                // X axis options
                // TODO: make x axis datalabels real time
                xaxis: {
                    categories: ['Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19']                     
                },
                // Y axis options
                yaxis: {
                    show: true,
                    showAlways: true,
                    seriesName: undefined,
                    labels: {
                        show: true,
                        align: 'right',
                        style: {
                            color: 'black',
                            fontSize: '12px',
                        },
                    },
                    title: {
                        text: 'Humiduty (%)',
                        style: {
                            color: 'blue',
                            fontSize: '12px',
                        },
                    },

                },
                // grid options
                grid: {
                    borderColor: '#FFFFFF', // line color
                    show: true,                
                    row: {
                        colors: ['#A0A0A0'] // background color
                    }
                },

            },
        };
    }
    render() {
        return ( 
            <div className = 'app' >
                <div className = 'row' >
                    <div className = 'mixed-chart' >
                        <ReactApexChart 
                            options = {this.state.options}
                            series = {this.state.series}
                            type = 'line'
                            width = '500' 
                        />
                    </div> 
                </div> 
            </div>
        );
    }
}

export default SingleDeviceAllSensors