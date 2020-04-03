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
                data: this.props.data
            }],
            options: {
                chart: {
                    height: 400,
                    type: 'line',
                    id: "Humidity",
                    foreColor: '#9f9ea4',
                    stacked: false,
                    toolbar: {
                        show: false
                    },
                    zoom: {
                        enabled: false
                    }
                },
                // series colors
                colors: ['#4090cb', '#e74c5e', '#47bd9a'],
                dataLabels: {
                    enabled: false
                },
                // chart title
                title: {
                    text: "Humidity (%)",
                    align: 'center',
                },
                // markers
                markers: {
                    style: 'inverted',
                    size: 5,
                    hover: {
                        sizeOffset: 6
                    }
                },
                
                // X axis options
                // TODO: make x axis datalabels real time
                xaxis: {
                    categories: ['Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19'],
                },
                // Y axis options
                // yaxis: {
                //     show: true,
                //     showAlways: true,
                //     seriesName: undefined,
                //     labels: {
                //         show: true,
                //         align: 'right',
                //     },
                //     title: {
                //         text: 'Humidity (%)',
                //         style: {
                //             fontSize: '12px',
                //             fontStyle: 'bold'
                //         },
                //     },
                // },
                tooltip: {
                    y: [{
                    title: {
                        formatter: function (val) {
                        return val + " (%)"
                        }
                    }
                    }],                
                },
                // Grid options
                grid: {
                  borderColor: '#f1f1f1',
                }
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