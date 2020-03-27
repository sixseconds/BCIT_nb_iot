import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

const getTimeTextFromUnixTime = (unixTime) => {
    const dateObj = new Date();

    dateObj.setTime(unixTime);

    // return something like 'Mar 03, 08:01'
    return dateObj.toDateString().substr(4,dateObj.toDateString().length - 9) + " " + dateObj.toTimeString().substr(0,5)
}

class Apexarea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'area',
                    foreColor: '#9f9ea4',
                    toolbar: {
                        show: true,
                    },
                    zoom: {
                        type: 'x',
                        enabled: true,
                        autoScaleYaxis: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                colors: ['#4090cb', '#003e6b'],
                xaxis: {
                    type: "text",
                    tickPlacement: 'on'
                },
                yaxis: [{
                    title: {
                        text: this.props.left
                    },
                    seriesName: this.props.left
                }, {
                    title: {
                        text: this.props.right
                    },
                    seriesName: this.props.right,
                    opposite: true
                }],
                grid: {
                    yaxis: {
                        lines: {
                            show: false,
                        }
                    },
                    padding: {
                        left: 30,
                        right: 30
                    }
                },
                series: [{
                    name: 'Temperature',
                    data: this.props.device.tsAWS.map((ts, i) => {
                        return {
                            x: getTimeTextFromUnixTime(ts*1000),
                            y: this.props.device.temp[i]
                        }
                    })
                }, {
                    name: 'Humidity',
                    data: this.props.device.tsAWS.map((ts, i) => {
                        return {
                            x: getTimeTextFromUnixTime(ts*1000),
                            y: this.props.device.humidity[i]
                        }
                    })
                }]
            }

        }
    }

    render() {
        return (
            <React.Fragment>
                <ReactApexChart id={this.props.device.deviceID} options={this.state.options} series={this.state.options.series} type="area" width="100%" height="299" />
            </React.Fragment>
        );
    }
}

export default Apexarea;