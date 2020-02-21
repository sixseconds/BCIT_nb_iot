import React, {
    Component
} from 'react';

import ReactApexChart from 'react-apexcharts';

// Chart to show the temperature readings from each chart
export class AllTemperatureChart extends Component {
    constructor(props) {
        super(props);
        this.state = {

            // data for each series
            series: [
                {
                    // device 1 temperature 
                    name: 'Device1',
                    type: 'line',
                    data: '', // TODO: add data
                }, 
                {
                    // device 2 temperature
                    name: 'Device2',
                    type: 'line',
                    data: '', // TODO: add data
                }, 
                {
                    // device 3 temperature
                    name: 'Device3',
                    type: 'line',
                    data: '', // TODO: add data
                }, 
                {
                    // as many for each device
                },
            ],
            // Chart styling
            options: {

                chart: {
                    height: 500,
                    type: 'line',
                    id: "allTemperature",
                    foreColor: '#000000',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                // Chart title
                title: {
                    text: "Temperature From All Devices",
                    align: 'center',
                    style: {
                        fontSize: 16,
                        
                    }
                },
                theme: {
                    mode: 'light',
                    palette: 'palette8',
                },
                legend: {
                    showForSingleSeries: false,
                    position: 'bottom',
                    horizontalAlign: 'center',
                    offsetY: 10,
                    height: 50,
                    onItemClick: {
                        toggleDataSeries: true
                    },
                },
                markers: {
                    size: 5,
                    style: 'inverted'
                },
                xaxis: {
                    categories: ['Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19'],
                    title: 'Day',
                    
                },
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
                        text: 'Temperature (Celsius)',
                        style: {
                            color: 'blue',
                            fontSize: '12px',
                        },
                    },
                },
                // grid styling
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

export default AllTemperatureChart