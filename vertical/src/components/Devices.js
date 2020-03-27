import React, { Component } from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import { activateAuthLayout } from '../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Settingmenu from '../containers/MainContent/Subpages/Settingmenu';
import { Link } from 'react-router-dom';
import './devices.css';

//Charts
import Apexarea from '../containers/charts/apex/apexarea';
import ApexareaReusable from '../containers/charts/apex/apexareaReusable';

const dummyData = {
    allDevices: [
      {
        id: 0,
        name: "iot_device_0",
        temp: "13.4",
        readings: 8,
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
        readings: 8,
        tempData: [14, 12, 12, 12, 13, 11, 14, 14],
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
        readings: 8,
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

class Devices extends Component {

    constructor(props) {
        super(props);
        this.state = { activeTab: '1', activeother: '1', startDate: new Date(), selected: null }
        this.toggleStock = this.toggleStock.bind(this);
        this.toggleMessages = this.toggleMessages.bind(this);
        this.selectDevice = this.selectDevice.bind(this);
        this.back = this.back.bind(this);
        if (this.props.selected) this.state.selected = this.props.selected
        console.log(props.selected)
    }

    componentDidMount() {
        this.props.activateAuthLayout();
        // document.body.classList = "";
        // if (this.props.location.pathname === '/layout-light') {
        //     document.body.classList.add('left-side-menu-light');
        // }
        // else if (this.props.location.pathname === '/layout-collapsed') {
        //     document.body.classList.toggle('enlarged');
        // }
        // else { }
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

    selectDevice (i) {
        console.log(i)
        this.setState({ selected: i })
    }

    back () {
        this.setState({ selected: null });
    }

    render() {

        let content; 
        let backButton = ''; 
        
        
        content = (
            <Row style={{ display: 'flex', justifyContent: 'center' }}>
                {
                    dummyData.allDevices.map((device, index) => {
                        return (
                            <Col key={index} xl="4">
                                <Card>
                                    <CardBody>
                                        <h4 
                                            style={{
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => { this.selectDevice(index) }}
                                            className="mt-0 header-title mb-4">{device.name}</h4>
                                        <div id="area-chart">
                                            <Apexarea device={device} />
                                        </div>
                                    </CardBody>
                                </Card>
                            </Col>
                        )
                    })
                }
            </Row>
        ) 

        if (this.state.selected != null) {
            let device = dummyData.allDevices[this.state.selected];

            backButton = (
                <div className="col-sm-1">
                    <i className="ion ion-md-arrow-back devices_back_button" onClick={() => {this.back();}}></i>
                </div>
            )

            content = (
                <Row style={{ display: 'flex'}}>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title mb-4">Tempterature readings</h4>
                                <div id="area-chart">
                                    <ApexareaReusable data={device.tempData} color={'#32a852'} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title mb-4">Pressure readings</h4>
                                <div id="area-chart">
                                    <ApexareaReusable data={device.pressureData} color={'#327da8'} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title mb-4">Humidity readings</h4>
                                <div id="area-chart">
                                    <ApexareaReusable data={device.humidityData} color={'#263257'} />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            )
        }


        return (
            <React.Fragment>
                <div className="content">
                    <div className="container-fluid">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                { backButton }
                                <div className="col-sm-10">
                                    <h4 className="page-title">Devices</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active">
                                            {
                                                (this.state.selected != null) ? dummyData.allDevices[this.state.selected].name : 'All devices'
                                            }
                                        </li>
                                    </ol>
                                </div>
                                <div className={(this.state.selected != null) ? "col-sm-1" : "col-sm-2"}>
                                    <div className="float-right d-none d-md-block">
                                        <Settingmenu />
                                    </div>
                                </div>
                            </div>
                        </div>

                        { content }

                    </div>
                </div>

                {/* <Rightsidebar>
                    <DashboardRightSidebar />
                </Rightsidebar> */}
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Devices));


