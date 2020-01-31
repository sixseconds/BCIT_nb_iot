import React, {
    Component
} from 'react';

import Chart from 'react-apexcharts';

export class HumidityChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            series: [{
                name: 'Humidity',
                type: 'line',
                data: [66, 58, 62, 71, 56, 69, 58, 65]
            }],
            options: {
                chart: {
                    height: 400,
                    type: 'line',
                    id: "Humidity"
                },
                title: {
                    text: "Humidity",
                    align: 'left',
                },
                xaxis: {
                    categories: ['Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19']
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
                        text: 'Humiduty (%)',
                        style: {
                            color: 'blue',
                            fontSize: '12px',
                        },
                    },

                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    },
                },

            },
        };
    }
    render() {
        return ( 
            <div className = 'app' >
                <div className = 'row' >
                    <div className = 'mixed-chart' >
                        <Chart 
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

export default HumidityChart