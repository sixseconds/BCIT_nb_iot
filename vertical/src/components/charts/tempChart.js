import React, {
    Component
} from 'react';
import ReactApexChart from 'react-apexcharts';

// Chart for single temperature readings
export class TemperatureChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Chart data
            series: [{
                name: 'Temperature',
                type: 'line',
                data: this.props.data,
                
            }],
            options: {
                // chart style
                chart: {
                    height: 500,
                    type: 'line',
                    id: "Temperature",
                    foreColor: '#9f9ea4',
                    stacked: false,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                // series color
                colors: ['#4090cb', '#e74c5e', '#47bd9a'],
                // Chart title
                title: {
                    text: "Temperature",
                    align: 'center',
                    style: {
                        fontSize: 16,
                    }
                },
                // Markers where data points align  
                markers: {
                    size: 5,
                    style: 'inverted'
                },
                // Options for the x axis
                // TODO: make x axis datalabels real time
                xaxis: {
                    categories: ['Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19'],
                    type: 'datetime',
                },
                // Options for the y axis
                // yaxis: {
                //     show: true,
                //     showAlways: true,
                //     seriesName: undefined,
                //     labels: {
                //         show: true,
                //         align: 'right',
                //         style: {
                //             fontSize: '12px',
                //         },
                //     },
                //     title: {
                //         text: 'Temperature (Celsius)',
                //         style: {
                //             fontSize: '12px',
                //         },
                //     },
                // },

                // tooltip
                tooltip: {
                    y: [{
                    title: {
                        formatter: function (val) {
                        return val + " (Celsius)"
                        }
                    }
                    }],                
                },
                // grid background style
                grid: {
                    borderColor: '#f1f1f1',
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

export default TemperatureChart