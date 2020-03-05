import React, { Component } from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { activateAuthLayout } from '../../../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Settingmenu from '../Subpages/Settingmenu';
import { Link } from 'react-router-dom';

import Apexchart1 from '../../../containers/charts/apex/apexchart1';
import Apexchart2 from '../../../containers/charts/apex/apexchart2';
import Apexchart3 from '../../../containers/charts/apex/apexchart3';

//Charts
import Apexarea from '../../../containers/charts/apex/apexarea';
import axios from 'axios';

const dummyData = {
    allDevices: [
      {
        id: 0,
        name: "iot_device_0",
        temp: "13.4",
        tempData: [14, 12, 18, 12, 12, 11, 16, 12],
        humidity: "20%",
        humidityData: [21, 20, 20, 21, 20, 20, 20, 20],
        pressure: "98Kpa",
        pressureData: [98, 97, 98, 99, 100, 99, 99, 99],
        location: "floor1.png",
        coords: ["15%", "65%"]
      },
      {
        id: 1,
        name: "iot_device_1",
        temp: "14.2",
        tempData: [14, 12, 12, 12, 11, 14, 14],
        humidity: "20%",
        humidityData: [20, 20, 22, 21, 20, 19, 20, 20],
        pressure: "98Kpa",
        pressureData: [99, 100, 99, 99, 99, 98, 97, 98],
        location: "floor1.png",
        coords: ["55%", "35%"]
      },
      {
        id: 2,
        name: "iot_device_2",
        temp: "13.0",
        tempData: [14, 12, 12, 11, 16, 12, 13, 13],
        humidity: "23%",
        humidityData: [20, 20, 20, 22, 20, 21, 21, 23],
        pressure: "98Kpa",
        pressureData: [98, 97, 98, 99, 100, 99, 99, 99],
        location: "floor2.png",
        coords: ["25%", "35%"]
      }
    ],
    floors: ["floor1.png", "floor1m.png", "floor2.png"]
  }

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: '1', activeother: '1', startDate: new Date() }
        this.toggleStock = this.toggleStock.bind(this);
        this.toggleMessages = this.toggleMessages.bind(this);
    }

    getData () {
        axios.get('http://localhost:3010/getdata')
            .then(d => console.log(d))
    }

    componentDidMount() {
        this.props.activateAuthLayout();
        // setInterval(() => {
        //     this.getData();
        // }, 2000);
    }

    toggleStock(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    toggleMessages(tab) {
        if (this.state.activeother !== tab) {
            this.setState({
                activeother: tab
            });
        }
    }

    renderGrid () {
        return dummyData.allDevices.map(device => {
            return (
                <Col xl="4">
                    <Card>
                        <CardBody>
                            <h4 className="mt-0 header-title">{device.name}</h4>
                            <div>
                                <div className="wid-earning">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div>
                                                <h5 className="mt-0">{device.temp} &#176;C</h5>
                                                <p className="text-muted mb-md-0">Latest temperature update</p>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div id="chart1">
                                                <Apexchart1 data={device.tempData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wid-earning">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div>
                                                <h5 className="mt-0">{device.pressure}</h5>
                                                <p className="text-muted mb-md-0">Latest pressure update</p>
                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div id="chart2">
                                                <Apexchart2 data={device.pressureData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="wid-earning">
                                    <div className="row">
                                        <div className="col-md-6">
                                            <div>
                                                <h5 className="mt-0">{device.humidity}</h5>
                                                <p className="text-muted mb-md-0">Latest humidity update</p>

                                            </div>
                                        </div>
                                        <div className="col-md-5">
                                            <div id="chart3">
                                                <Apexchart3 data={device.humidityData} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            )
        })
    }

    render() {

        let grid = this.renderGrid()

        return (
            <React.Fragment>
                <div className="content">
                    <div className="container-fluid">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h4 className="page-title">Dashboard</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active">Latest updates from IoT devices</li>
                                    </ol>
                                </div>
                                <div className="col-sm-6">
                                    <div className="float-right d-none d-md-block">
                                        <Settingmenu />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Row>
                            <Col lg="4">
                                <Card className="mini-stat bg-pattern">
                                    <CardBody className="mini-stat-img">
                                        <div className="mini-stat-icon">
                                            <i className="dripicons-broadcast bg-soft-primary text-primary float-right h4"></i>
                                        </div>
                                        <h6 className="text-uppercase mb-3 mt-0">Last update</h6>
                                        <h5 className="mb-3">iot_device_0 @ 10:36 AM</h5>
                                        <p className="text-muted mb-0"><span className="text-success mr-2"> Temperature 5% <i className="mdi mdi-arrow-up"></i> </span> From previous update</p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            { grid }
                        </Row>

                    </div>
                </div>

                {/* <Rightsidebar>
                    <DashboardRightSidebar />
                </Rightsidebar> */}
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Dashboard));


