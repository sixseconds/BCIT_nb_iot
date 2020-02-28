import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink, CardText, } from 'reactstrap';
import { activateAuthLayout } from '../store/actions';
import Settingmenu from '../containers/MainContent/Subpages/Settingmenu';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import AllHumidityChart from '../components/charts/allHumidity';
import AllTemperatureChart from '../components/charts/allTemperatures';
import AllPressureChart from '../components/charts/allPressure';


class Parameters extends Component {

    constructor(props) {
        super(props);

        this.state = {
            activeTab1: '5'
        }
        this.toggle1 = this.toggle1.bind(this);
    }

    componentDidMount() {
        this.props.activateAuthLayout();
    }

    toggle1(tab) {
        if (this.state.activeTab1 !== tab) {
            this.setState({
                activeTab1: tab
            });
        }
    }

    render() {

        return (
            <React.Fragment>
                <div className="content">
                    <div className="container-fluid">
                        <div className="page-title-box">
                            <div className="row align-items-center">
                                <div className="col-sm-6">
                                    <h4 className="page-title">Parameters</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active">Toggle devices and parameters to compare device data</li>
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
                        <Col>
                                <Card>
                                    <CardBody>
                                        <Nav pills className="navtab-bg nav-justified">
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab1 === '5' })}
                                                    onClick={() => { this.toggle1('5'); }}
                                                >
                                                    Temperature
                                                </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab1 === '6' })}
                                                    onClick={() => { this.toggle1('6'); }}
                                                >
                                                    Humidity
                                        </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab1 === '7' })}
                                                    onClick={() => { this.toggle1('7'); }}
                                                >
                                                    Pressure
                                        </NavLink>
                                            </NavItem>
                                            <NavItem>
                                                <NavLink
                                                    className={classnames({ active: this.state.activeTab1 === '8' })}
                                                    onClick={() => { this.toggle1('8'); }}
                                                >
                                                    Magnetic
                                        </NavLink>
                                            </NavItem>
                                        </Nav>

                                        <TabContent activeTab={this.state.activeTab1}>
                                            <TabPane tabId="5" className="p-3">
                                                <Row>
                                                    <Col sm="12" style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <AllTemperatureChart></AllTemperatureChart>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="6" className="p-3">
                                                <Row>
                                                    <Col sm="12" style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <AllHumidityChart></AllHumidityChart>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                            <TabPane tabId="7" className="p-3">
                                                <Row>
                                                    <Col sm="12" style={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center'
                                                    }}>
                                                        <AllPressureChart></AllPressureChart>
                                                    </Col>
                                                </Row>
                                            </TabPane>

                                            <TabPane tabId="8" className="p-3">
                                                <Row>
                                                    <Col sm="12">
                                                        <CardText>
                                                            This is for magnetic chart
                                                        </CardText>
                                                    </Col>
                                                </Row>
                                            </TabPane>
                                        </TabContent>

                                    </CardBody>
                                </Card>
                            </Col>
                        </Row>





                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default connect(null, { activateAuthLayout })(Parameters);
