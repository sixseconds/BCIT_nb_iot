import React, { Component, useState, useEffect } from 'react';
import { Row, Col, Card, CardBody, Button } from 'reactstrap';
import { activateAuthLayout } from '../store/actions';
import { useRouteMatch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './devices.css';

import axios from 'axios';

import Apexarea from '../containers/charts/apex/apexarea';
import ApexareaReusable from '../containers/charts/apex/apexareaReusable';

const SingleDeviceView = (props) => {
    return (
        <Row style={{ display: 'flex'}}>
            {
                props.charts.map(chartName => {
                    let h4Title = chartName + " readings";
                    
                    return (
                        <Col xl="6">
                            <Card>
                                <CardBody>
                                    <h4 className="mt-0 header-title mb-4">
                                        { h4Title }
                                    </h4>
                                    <div id="area-chart">
                                        <ApexareaReusable 
                                            data={props.device.temp} 
                                            timestamps={props.device.tsAWS} 
                                            color={'#32a852'}
                                            name={chartName} />
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    )
                })
            }    
        </Row>
    )
}

const DeviceCard = (props) => {
    const AWS_DATA_QUERY_URL = 'http://localhost:3010/aws_query_devices';
    const [deviceData, setDeviceData] = useState(null);
    let content = '';
    
    useEffect(() => {
        axios.post(AWS_DATA_QUERY_URL, {
            parameters: ["temp", "pressure", "humidity", "tsAWS"],
            start_timestamp: Math.floor((Date.now() / 1000) - 1500000),
            end_timestamp: Math.floor(Date.now() / 1000),
            devices: [props.deviceName]
        })
        .then(res => setDeviceData(res.data))
        .catch(err => console.log(err))
    }, []);
    
    if (deviceData) {
        return deviceData.map((device, index) => {
            let h4Style = { cursor: 'pointer' };
            
            return (
                <Col key={index} xl="4">
                    <Card>
                        <CardBody>
                            <h4 
                                style={h4Style}
                                onClick={() => props.setSelectedDevice(index) }
                                className="mt-0 header-title mb-4">
                                    {device.deviceID}
                            </h4>
                            <div id="area-chart">
                                <Apexarea 
                                    device={device} 
                                    left={props.displayParameters[0]} 
                                    right={props.displayParameters[1]} />
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            )
        })[0];
    } else {
        return '';
    }
}

const Devices = (props) => {
    // constants
    const AAA = ["Temperature", "Humidity", "Pressure"];
    const AWS_DEVICES = ["AWS1", "AWS2", "AWS3", "AWS4", "AWS5"];
    
    // state 
    const [selectedDevice, setSelectedDevice] = useState(null);
    const [displayParameters, setDisplayParameters] = useState(["Temperature", "Humidity"])
    
    // functions
    const toggleDisplayParameter = (param) => {
        const currentParams = displayParameters;
        const i = currentParams.indexOf(param);
        const j = currentParams.indexOf(null);
        
        if (i > -1) {
            currentParams[i] = null;
        } else if (j > -1) {
            currentParams[j] = param;
        } else {
            currentParams[0] = param;
        }
        
        setDisplayParameters(currentParams);
    }
    
    // render logic
    let match = useRouteMatch("/iot_devices");
    let content; 
    let backButton = '';
    let dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(activateAuthLayout());
    }, [])
    
    content = (
        <Row style={{ display: 'flex', justifyContent: 'center' }}>
            { 
                AWS_DEVICES.map(device => (
                    <DeviceCard 
                        deviceName={device}
                        displayParameters={displayParameters}
                        setSelectedDevice={setSelectedDevice} />
                )) 
            }
        </Row>
    );
    
    // open a single device view if a device is selected
    if (selectedDevice != null) {
        let allowedParams = AAA.slice(0);
        
        backButton = (
            <div className="col-sm-1">
                <i 
                    className="ion ion-md-arrow-back devices_back_button" 
                    onClick={() => {this.back()}} />
            </div>
        );
        content = '';
        // content = (
        //     <SingleDeviceView 
        //         device={deviceData[selectedDevice]} 
        //         charts={allowedParams} />
        // )
    }
    
    return (
        <React.Fragment>
            <div className="content">
                <div className="container-fluid">
                    <div className="page-title-box">
                        <div 
                            style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center' 
                            }} >
                                { backButton }
                            <div>
                                <h4 className="page-title">Devices</h4>
                                <ol className="breadcrumb">
                                    <li className="breadcrumb-item active">
                                        {/* {
                                            (selectedDevice != null) ? 
                                                deviceData[selectedDevice].deviceID : 
                                                'All devices'
                                        } */}
                                        All Devices
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>

                    { content }

                </div>
            </div>
            
        </React.Fragment>
    );
}

class Devices2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            startDate: new Date(), 
            selected: null, 
            devices: ["AWS1", "AWS2", "AWS3", "AWS4", "AWS5"],
            displayParameters: ["Temperature", "Humidity"]
        }
    }
    
    getData () {
        axios.post('http://localhost:3010/aws_query_devices', {
            parameters: ["temp", "pressure", "humidity", "tsAWS"],
            start_timestamp: Math.floor((Date.now() / 1000) - 1500000),
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

    selectDevice (i) {
        this.setState({ selected: i })
    }

    back () {
        this.setState({ selected: null });
    }

    toggleDisplayParameter (param) {
        const currentParams = this.state.displayParameters;
        const i = currentParams.indexOf(param);
        const j = currentParams.indexOf(null);
        
        if (i > -1) {
            currentParams[i] = null;
        } else if (j > -1) {
            currentParams[j] = param;
        } else {
            currentParams[0] = param;
        }
        
        this.setState({ displayParameters: currentParams })
    }
    
    render() {

        let content; 
        let backButton = '';
        
        if (this.state.data) {
            content = (
                <Row style={{ display: 'flex', justifyContent: 'center' }}>
                    {
                        this.state.data.map((device, index) => {
                            return (
                                <Col key={index} xl="4">
                                    <Card>
                                        <CardBody>
                                            <h4 
                                                style={{
                                                    cursor: 'pointer'
                                                }}
                                                onClick={() => { this.selectDevice(index) }}
                                                className="mt-0 header-title mb-4">{device.deviceID}</h4>
                                            <div id="area-chart">
                                                <Apexarea 
                                                device={device} 
                                                left={this.state.displayParameters[0]} 
                                                right={this.state.displayParameters[1]} />
                                            </div>
                                        </CardBody>
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            ) 
        }

        if (this.state.selected != null) {
            let device = this.state.data[this.state.selected];

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
                                    <ApexareaReusable 
                                        data={device.temp} 
                                        timestamps={device.tsAWS} 
                                        color={'#32a852'}
                                        name="Temperature" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title mb-4">Pressure readings</h4>
                                <div id="area-chart">
                                    <ApexareaReusable 
                                        data={device.pressure} 
                                        timestamps={device.tsAWS} 
                                        color={'#327da8'}
                                        name="Pressure" />
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col xl="6">
                        <Card>
                            <CardBody>
                                <h4 className="mt-0 header-title mb-4">Humidity readings</h4>
                                <div id="area-chart">
                                    <ApexareaReusable 
                                        data={device.humidity} 
                                        timestamps={device.tsAWS} 
                                        color={'#263257'}
                                        name="Humidity" />
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
                            <div style={{ 
                                display: 'flex', 
                                justifyContent: 'space-between', 
                                alignItems: 'center' 
                                }}>
                                { backButton }
                                <div>
                                    <h4 className="page-title">Devices</h4>
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item active">
                                            {
                                                (this.state.selected != null) ? this.state.data[this.state.selected].deviceID : 'All devices'
                                            }
                                        </li>
                                    </ol>
                                </div>
                                <div>
                                    <div style={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center'
                                         }}>
                                        <label style={{ margin: 5 }} >From:</label>
                                        <input 
                                            style={{ margin: 5 }}
                                            className="form-control" 
                                            type="search" 
                                            placeholder="March 1 @ 18:00" 
                                            id="example-search-input" 
                                            />
                                        <label style={{ margin: 5 }} >To:</label>
                                        <input 
                                            style={{ margin: 5 }}
                                            className="form-control" 
                                            type="search" 
                                            placeholder="March 5 @ 10:00" 
                                            id="example-search-input" 
                                            />
                                            
                                        <Button 
                                            style={{ margin: 5, minWidth: 100 }}
                                            className="btn-icon" 
                                            color="primary"> 
                                            <span className="btn-icon-label">
                                                <i className="mdi mdi-bullseye-arrow mr-2"></i>
                                            </span> 
                                            Go
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <div className="float-right d-none d-md-block">
                                        <Row style={{
                                            display: 'flex',
                                            alignItems: 'center'
                                        }} >
                                            <p style={{ padding: 0, margin: 5 }} >Show parameters:</p>
                                            
                                            {
                                                ['a'].map(param => {
                                                    if (this.state.displayParameters.indexOf(param) > -1) {
                                                            return (
                                                                <Button 
                                                                    color="success"
                                                                    style={{
                                                                        margin: 5
                                                                    }}
                                                                    onClick={() => { this.toggleDisplayParameter(param) }}
                                                                    >{param}</Button>
                                                            )
                                                        } else {
                                                            return (
                                                                <Button
                                                                    outline
                                                                    color="info"
                                                                    style={{
                                                                        margin: 5
                                                                    }}
                                                                    onClick={() => { this.toggleDisplayParameter(param) }}
                                                                    >{param}</Button>
                                                            )
                                                        }
                                                })
                                            }
                                            
                                        </Row>
                                    </div>
                                </div>
                            </div>
                        </div>

                        { content }

                    </div>
                </div>
                
            </React.Fragment>
        );
    }
}

export default Devices;


/*
date/time picker

<div>
<div 
    style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center'
    }} >
        <label style={{ margin: 5 }} >From:</label>
        <input 
            style={{ margin: 5 }}
            className="form-control" 
            type="search" 
            placeholder="March 1 @ 18:00" 
            id="example-search-input" 
            />
        <label style={{ margin: 5 }} >To:</label>
        <input 
            style={{ margin: 5 }}
            className="form-control" 
            type="search" 
            placeholder="March 5 @ 10:00" 
            id="example-search-input" 
            />
            
        <Button 
            style={{ margin: 5, minWidth: 100 }}
            className="btn-icon" 
            color="primary"> 
            <span className="btn-icon-label">
                <i className="mdi mdi-bullseye-arrow mr-2"></i>
            </span> 
            Go
        </Button>
    </div>
</div>
*/

/*
param picker

<div>
    <div className="float-right d-none d-md-block">
        <Row style={{
            display: 'flex',
            alignItems: 'center'
        }} >
            <p style={{ padding: 0, margin: 5 }} >Show parameters:</p>
            
            {
                ALLOWED_DISPLAY_PARAMS.map(param => {
                    if (displayParameters.indexOf(param) > -1) {
                            return (
                                <Button 
                                    color="success"
                                    style={{
                                        margin: 5
                                    }}
                                    onClick={() => { toggleDisplayParameter(param) }}
                                    >{param}</Button>
                            )
                        } else {
                            return (
                                <Button
                                    outline
                                    color="info"
                                    style={{
                                        margin: 5
                                    }}
                                    onClick={() => { toggleDisplayParameter(param) }}
                                    >{param}</Button>
                            )
                        }
                })
            }
            
        </Row>
    </div>
</div>
*/


