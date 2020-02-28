import React, {
    Component
} from 'react';

import ReactApexChart from 'react-apexcharts';

// Chart to show the humidity readings from each device
export class AllHumidityChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // data for each series
            series: [
                {
                    // device 1 humidity 
                    name: 'Device1',
                    type: 'line',
                    data: [13, 19, 15, 11, 12, 14], // TODO: add data
                },
                {
                    // device 2 humidity
                    name: 'Device2',
                    type: 'line',
                    data: [16, 12, 11, 18, 15, 19], // TODO: add data
                },
                {
                    // device 3 humidity
                    name: 'Device3',
                    type: 'line',
                    data: [12, 15, 9, 8, 15, 16], // TODO: add data
                },
                {
                    // device 4 humidity
                    name: 'Device4',
                    type: 'line',
                    data: [5, 12, 14, 12, 15, 16], // TODO: add data
                },
                // add more devices as needed
            ],
            options: {
                // Chart settings
              chart: {
                height: 750,
                type: 'line',
                foreColor: '#9f9ea4',
                zoom: {
                  enabled: false
                },
                toolbar: {
                  show: true,
              }
              },
              colors: ['#4090cb', '#e74c5e', '#47bd9a', '#F9DC5C', '#F17300', '#802392', '#'],
              dataLabels: {
                enabled: false
              },
            //   stroke: {
            //     width: [3, 4, 3],
            //     curve: 'straight',
            //     dashArray: [0, 8, 5]
            //   },
              title: {
                text: 'Humidity From All Devices',
                align: 'left'
              },
              markers: {
                size: 0,
          
                hover: {
                  sizeOffset: 6
                }
              },
              xaxis: {
                categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
                  '10 Jan', '11 Jan', '12 Jan'
                ],
              },
              legend: {
                show: true,
                position: 'bottom',
                height: 50,
                offsetY: 15,
              },
              tooltip: {
                enabled: true,
                shared: true,
                y: [{
                  title: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                }, {
                  title: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                }, {
                  title: {
                    formatter: function (val) {
                      return val;
                    }
                  }
                }]
              },
              grid: {
                borderColor: '#f1f1f1',
              }
            },
        };
    }
    render() {
        return ( 
            <div className = 'app' >
                <div className = 'row' >
                    <div className = 'line' >
                        <ReactApexChart 
                            options = {this.state.options}
                            series = {this.state.series}
                            type = 'line'
                            width = '1000' 
                        />
                    </div> 
                </div> 
            </div>
        );
    }
}

export default AllHumidityChart