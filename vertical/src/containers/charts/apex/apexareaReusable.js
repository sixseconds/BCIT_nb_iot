import React, { Component } from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexareaReusable extends Component {

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
                fill: {
                    colors: [(this.props.color) ? this.props.color : '#4090cb']
                },                  
                colors: ['#4090cb'],
                xaxis: {
                    categories: [...Array(this.props.data.length+1).keys()].shift(),
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
                    data: this.props.data
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

export default ApexareaReusable;   