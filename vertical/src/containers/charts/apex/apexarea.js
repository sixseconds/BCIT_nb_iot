import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class Apexarea extends Component {

    constructor(props) {
        super(props);

        this.state = {
            options: {
                chart: {
                    type: 'area',   
                    foreColor: '#9f9ea4',
                    toolbar: {
                        show: false,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                stroke: {
                    curve: 'smooth',
                    width: 2
                },
                colors: ['#4090cb', '#e74c5e'],
                xaxis: {
                    categories: ['1', '2', '3', '4', '5'],
                },
                grid: {
                    yaxis: {
                        lines: {
                            show: false,
                        }
                    }
                },
            },
                series : [{
                    name: 'Temperature',
                    data: Array.from({length: 20}, () => 15 + Math.floor(Math.random() * 3))
                }, {
                    name: 'Pressure',
                    data: Array.from({length: 20}, () => 15 + Math.floor(Math.random() * 8))
                }]
            
            }
        }

    fetchIcons () {
        fetch('https://localhost:3000/getdata')
            .then(response => response.json())
            .then(data => {
            this.setState({
                data: data
            })
            })
        }

    render() {
        return (
            <React.Fragment>
                <ReactApexChart options={this.state.options} series={this.state.series} type="area" width="100%" height="299" />
            </React.Fragment>
        );
    }
}

export default Apexarea;   