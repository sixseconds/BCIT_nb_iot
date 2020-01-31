import React, { useState } from "react";

export default function Floor(props) {
    const [devices, setDevices] = useState([]);
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

    // useEffect(() => {
    //     setDevices(async () => {
    //         let deviceData = await fetch(input);
    //         return deviceData;
            
    //         return props.devices.map((device) =>  {return { id: device.id, x: device.coords[0], y: device.coords[1] }})
    //     });
    // }, [])

    function renderDeviceView() {
        return props.devices.map(
            device => <div 
                className="device_blip"
                key={device.id} 
                onClick={() => {props.updateRouteLocation("Device", device.id)}}
                style={Object.assign({ 
                    top: device.coords[1], 
                    left: device.coords[0] 
                }, styles.deviceBlip)} 
            >{ device.id }</div>
        );
    }
    
    function renderImage() {
        if (props.image)
            return (
                <div style={{ backgroundColor: "black" }}>
                    <img style={{ width: "100%" }} src={props.image} alt={props.image.replace(".png", "")} />
                    {renderDeviceView()}
                </div>
            )
    }

    return (
        <div style={{ position: "relative", height: "100%", width: "100%" }}>
            {renderImage()}
        </div>
    )
}
