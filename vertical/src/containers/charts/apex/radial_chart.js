import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class radial_chart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            chart: {
                height: 80,
                type: 'radialBar',
                foreColor: '#9f9ea4',
            },
            plotOptions: {
                radialBar: {
                    dataLabels: {
                        name: {
                            fontSize: '22px',
                        },
                        value: {
                            fontSize: '16px',
                        },
                        total: {
                            show: false,
                            label: 'Total',
                            formatter: function (w) {
                                return 249
                            }
                        }
                    }
                }
            },
            series: [this.props.health],
            labels: ['Health'],
            colors: ['#4090cb'],
        }
    }

    render() {
        
        return (
            <React.Fragment>
                <ReactApexChart options={this.state.plotOptions} series={this.state.series} type="radialBar" height="150" />
            </React.Fragment>
        );
    }
}

export default radial_chart;   