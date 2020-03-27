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
                data: this.props.device.pressureData
            }],
            // Chart Styling
            options: {
                chart: {
                    height: 500,
                    type: 'line',
                    id: "Pressure",
                    foreColor: '#9f9ea4',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                // colors for series
                colors: ['#4090cb', '#e74c5e', '#47bd9a'],
                // datalabels
                dataLabels: {
                enabled: false
                },
                // Chart title
                title: {
                    text: "Pressure",
                    align: 'center',
                    style: {
                        fontSize: 16,
                    }
                },
                markers: {
                    size: 5,
                    style: 'inverted'
                },
                // X axis options
                xaxis: {
                    categories: [...Array(this.props.device.readings + 1).keys()].shift(),
                },
                // Y axis options
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
                //         text: 'Pressure (hPa)',
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
                        return val + " (hPa)"
                        }
                    }
                    }],                
                },
                // grid styling
                grid: {
                    borderColor: '#f1f1f1',
                },

            },
        };

        this.fetchIcons = this.fetchIcons.bind(this);
    }

    fetchIcons() {
        fetch('http://localhost:3000/getdata')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    data: [data.temp]
                })
            })
    }

    componentDidMount() {
        this.fetchIcons();
    }

    render() {

        let d = (this.props.dynamo && this.state.data) ? this.state.data : this.state.series;

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