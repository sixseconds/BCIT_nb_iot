import React, { Component } from 'react';
import { Row, Col, Card, CardBody, TabContent, TabPane, Nav, NavItem, NavLink } from 'reactstrap';
import Logo from '../../images/floor.JPG';


export default class Locations extends Component {
    render() {
        return (
        <div className="row align-items-center">
            <img src={Logo} style={{
                width: 1000,
                height: 650,
                paddingLeft: 50,
                paddingTop: 50
            }}></img>
        </div>

        )
    };
}
