import React, { Component } from 'react';
import { Link } from 'react-router-dom';


const styles = {
    deviceBlip: { 
        width: 20, 
        height: 20, 
        position: "absolute", 
        backgroundColor: "red", 
        borderRadius: "50%" ,
        cursor: "pointer"
    }
}

export default class Floor extends Component {
    constructor(props){
        super(props);
        this.state = {
            
        }   
    }



    renderDeviceView() {
        return this.props.devices.map(
            device => (
            <Link to="/iot_devices" >
                <div 
                className="device_blip"
                key={device.id} 
                
                style={Object.assign({ 
                    top: device.coords[1], 
                    left: device.coords[0] 
                }, styles.deviceBlip)} 
            >{ device.id }</div></Link> )
        );
    }

    renderImage() {
        console.log(this)
            return (
                <div style={{ backgroundColor: "black" }}>
                    <img style={{ width: "100%", backgroundSize: 'contain' }} src={this.props.image} alt={'floor'} />
                    {this.renderDeviceView()}
                </div>
            )
    }

    render() {
        return (
            <div style={{ position: "relative", width: "100%" }}>
                {this.renderImage()}
                
            </div>
     )};
}

