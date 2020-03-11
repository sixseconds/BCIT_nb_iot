import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Row, Col, Card, CardBody } from 'reactstrap';
import { activateAuthLayout } from '../store/actions';
import Settingmenu from '../containers/MainContent/Subpages/Settingmenu';



class Parameters extends Component {

    componentDidMount() {
        this.props.activateAuthLayout();
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
                            <Col lg="3">
                                <Card className="card border border-primary text-white">
                                    <div className="card-header bg-white border-primary">
                                        <h5 className="font-16 my-0">
                                            <i className="mdi mdi-temperature-celsius"></i> | 
                                            <i className="mdi mdi-temperature-fahrenheit"></i>
                                        </h5>
                                    </div>
                                    <CardBody>
                                        <h5 className="card-title font-16 mt-0">Temperature</h5>
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
