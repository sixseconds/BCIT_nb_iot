import React, {
    Component
} from 'react';
import ReactApexChart from 'react-apexcharts';

// Chart for single pressure reading
export class PressureChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // Chart data
            series: [{
                name: 'Pressure',
                type: 'line',
                data: this.props.data
            }],
            // Chart Styling
            options: {
                chart: {
                    height: 500,
                    type: 'line',
                    id: "Pressure",
                    foreColor: '#000000',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                // Chart title
                title: {
                    text: 'Pressure',
                    align: 'center'
                },
                // Chart theme
                theme: {
                    mode: 'light',
                    palette: 'palette8',
                },
                // Chart title
                title: {
                    text: "Pressure",
                    align: 'center',
                        style: {
                            fontSize: '14px',
                            fontWeight: 'bold',
                            fontFamily: undefined,
                            color: '#FFFFFF'
                        },
                },
                markers: {
                    size: 5,
                    style: 'inverted'
                },
                // X axis options
                xaxis: {
                    categories: ['Jan 12', 'Jan 13', 'Jan 14', 'Jan 15', 'Jan 16', 'Jan 17', 'Jan 18', 'Jan 19'],
                    title: 'Day'
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
                            fontSize: '12px',
                        },
                    },
                    title: {
                        text: 'Pressure (hPa)',
                        style: {
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

export default PressureChart