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
                        show: true,
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
                    categories: [...Array(this.props.device.readings+1).keys()].shift(),
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
                    data: this.props.device.tempData
                }, {
                    name: 'Pressure',
                    data: this.props.device.pressureData
                }]
            
            }

        this.fetchIcons = this.fetchIcons.bind(this);
        }

    fetchIcons () {
        fetch('http://localhost:3000/getdata')
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState({
                    data: [data.temp]
                })
            })
    }     

    componentDidMount () {
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

export default Apexarea;   