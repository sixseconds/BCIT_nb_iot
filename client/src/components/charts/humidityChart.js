import React, {
    Component
} from 'react';

import ReactApexChart from 'react-apexcharts';

// Chart for single humidity reading
export class HumidityChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            
            series: [{
                name: 'Humidity',
                type: 'line',
                data: this.props.data
            }],
            options: {
                chart: {
                    height: 400,
                    type: 'line',
                    id: "Humidity",
                    foreColor: '#000000',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                // chart titles
                title: {
                    text: "Humidity (%)",
                    align: 'center',
                },
                markers: {
                    style: 'inverted',
                    size: 5,
                },
                // chart theme
                theme: {
                    mode: 'light',
                    palette: 'palette8',
                },
                // X axis options
                // TODO: make x axis datalabels real time
                xaxis: {
                    categories: ['Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19'],
                    title: {
                        text: 'Day',

                    }
                },
                // Y axis options
                yaxis: {
                    show: true,
                    showAlways: true,
                    seriesName: undefined,
                    labels: {
                        show: true,
                        align: 'right',
                    },
                    title: {
                        text: 'Humidity (%)',
                        style: {
                            fontSize: '12px',
                            fontStyle: 'bold'
                        },
                    },

                },
                // Grid options
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

export default HumidityChart