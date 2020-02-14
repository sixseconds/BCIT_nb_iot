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
                colors: ['#4090cb', '#e74c5e'],
                xaxis: {
                    categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20'],
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
                    data: Array.from({length: 10000}, () => 15 + Math.floor(Math.random() * 3))
                }, {
                    name: 'Pressure',
                    data: Array.from({length: 10000}, () => 15 + Math.floor(Math.random() * 8))
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