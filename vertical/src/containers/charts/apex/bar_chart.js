import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class bar_chart extends Component {

    constructor(props) {
        super(props);

        this.state = {
            apexBarChartOpt: {
                chart: {
                    height: 350,
                    type: 'bar',
                    foreColor: '#9f9ea4',
                    toolbar: {
                        show: false,
                    }
                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                    }
                },
                dataLabels: {
                    enabled: false
                },
                colors: ['#e74c5e'],
                grid: {
                    borderColor: '#f1f1f1',
                },
                xaxis: {
                    categories: [ "AWS5", "AWS4", "AWS2", "AWS1", "AWS3" ],
                }
          }
        }
    }

    render() {
        const apexBarChartData = [{
            data: [380, 430, 450, 475, 550]
        }];

        return (
            <React.Fragment>
                <ReactApexChart options={this.state.apexBarChartOpt} series={apexBarChartData} type="bar" height="355" />
            </React.Fragment>
        );
    }
}

export default bar_chart;   