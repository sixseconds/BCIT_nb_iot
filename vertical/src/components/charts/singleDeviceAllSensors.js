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
                    type: 'area',
                    data: this.props.device.tempData
                },
                {
                    // device humidity sensor
                    name: 'DeviceHumidity',
                    type: 'area',
                    data: this.props.device.humidityData
                },
                {
                    // device pressure sensor
                    name: 'DevicePressure',
                    type: 'area',
                    data: this.props.device.pressureData
                }
            ],
            options: {
                chart: {
                    height: 400,
                    type: 'area',
                    id: "allSensors",
                    foreColor: '#9f9ea4',
                    stacked: false,
                    toolbar: {
                        show: false
                    }
                },
                // Chart title
                title: {
                    text: "Temperature, Humidity & Pressure Readings",
                    align: 'left',
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
                },
                dataLabels: {
                    enabled: false
                },
                toolTip: {
                    enabled: false, 
                    fixed: {
                        enabled: true,
                        position: 'topLeft'
                    }
                    
                },
                // X axis options
                xaxis: {
                    categories: [...Array(this.props.device.readings + 1).keys()].shift(),
                },
                // Y axis options
                yaxis: [
                    {
                        axisBorder: {
                            show: true,
                            color: '#008ffb',
                        },
                        labels: {
                            style: {
                                color: '#008ffb'
                            },
                        },
                        title: {
                            text: 'Temperature (C°)',
                            style: {
                                color: '#008ffb',
                            }
                        }
                    },
                    {
                        seriesName: 'DeviceHumidity',
                        opposite: true,
                        axisBorder: {
                            show: true,
                            color: '#00e396'
                        },
                        labels: {
                            style: {
                                colors: '#00e396'
                            },
                        },
                        title: {
                            text: 'Humidity (%)',
                            style: {
                                color: '#00e396',
                            }
                        }
                    },
                    {
                        seriesName: 'DevicePressure',
                        opposite: true,
                        axisBorder: {
                            show: true,
                            color: '#feb019',
                        },
                        labels: {
                            style: {
                                colors: '#feb019',
                            }
                        },
                        title: {
                            text: 'Pressure (hPa)',
                            style: {
                                color: '#feb019',
                            }
                        }
                    },
                ],
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
            <React.Fragment>
                <ReactApexChart options={this.state.options} series={d} type="area" width="100%" height="299" />
            </React.Fragment>
        );
    }
}

export default SingleDeviceAllSensors