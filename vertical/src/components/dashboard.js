import React, { Component } from 'react';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { activateAuthLayout } from '../store/actions';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
// import Settingmenu from '../Subpages/Settingmenu';

import Apexchart1 from '../containers/charts/apex/apexchart1';
import Apexchart2 from '../containers/charts/apex/apexchart2';
import Apexchart3 from '../containers/charts/apex/apexchart3';

//Charts
// import Apexarea from '../../../containers/charts/apex/apexarea';
import axios from 'axios';

class Dashboard extends Component {

    constructor(props) {
        super(props);
        this.state = { 
            activeTab: '1', 
            activeother: '1', 
            startDate: new Date(),
            devices: ["AWS1", "AWS2", "AWS3", "AWS4", "AWS5"]
        }
        this.toggleStock = this.toggleStock.bind(this);
        this.toggleMessages = this.toggleMessages.bind(this);
    }

    getData () {
        axios.post('http://localhost:3010/aws_query_devices', {
            parameters: ["temp", "pressure", "humidity", "tsAWS"],
            start_timestamp: Math.floor((Date.now() / 1000) - 150000),
            end_timestamp: Math.floor(Date.now() / 1000),
            devices: this.state.devices
        })
        .then(d => this.setState({ data: d.data }))
        .catch(e => console.log(e))
    }

    componentDidMount() {
        this.getData();
        this.props.activateAuthLayout();
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
        if (this.state.data) {
            return this.state.data.map(device => {
                return (
                    <Col xl="4">
                        <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title">{device.deviceID}</h4>
                                <div>
                                    <div className="wid-earning">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div>
                                                    <h5 className="mt-0">{device.temp[0]} &#176;C</h5>
                                                    <p className="text-muted mb-md-0">Latest temperature update</p>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div id="chart1">
                                                    <Apexchart1 data={device.temp} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wid-earning">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div>
                                                    <h5 className="mt-0">{device.pressure[0]}</h5>
                                                    <p className="text-muted mb-md-0">Latest pressure update</p>
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div id="chart2">
                                                    <Apexchart2 data={device.pressure} />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="wid-earning">
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div>
                                                    <h5 className="mt-0">{device.humidity[0]}</h5>
                                                    <p className="text-muted mb-md-0">Latest humidity update</p>
    
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div id="chart3">
                                                    <Apexchart3 data={device.humidity} />
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
    }

    render() {
        let grid = this.renderGrid()
        let latest = null;
        
        if (this.state.data) {
            latest = this.state.data[0];
            
            for (let i = 0; i < this.state.devices.length; i++) {
                if(this.state.data[i].tsAWS > latest.tsAWS) {
                    latest = this.state.data[i]
                }
            }
        }

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
                                {/* <div className="col-sm-6">
                                    <div className="float-right d-none d-md-block">
                                        <Settingmenu />
                                    </div>
                                </div> */}
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
                                        <h5 className="mb-3">
                                            {(latest) ? latest.deviceID : "waiting for data..."}
                                        </h5>
                                        <p className="text-muted mb-0">
                                            <span className="text-success mr-2">
                                                {(latest) ? (latest.temp[0] - latest.temp[1]) / latest.temp[1] * 100.0 : "no data"}
                                                <i className="mdi mdi-arrow-up"></i> 
                                            </span> 
                                            From previous update
                                        </p>
                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>

                        <Row>
                            { grid }
                        </Row>

                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withRouter(connect(null, { activateAuthLayout })(Dashboard));


