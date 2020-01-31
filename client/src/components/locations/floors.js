import React, { useState, useEffect } from "react";

export default function Floor(props) {
    const [devices, setDevices] = useState([]);
    const styles = {
        deviceBlip: { width: 20, height: 20, position: "absolute", backgroundColor: "red", borderRadius: "50%" }
    }

    useEffect(() => {
        setDevices(/* async */ () => {
            // let deviceData = await fetch(input);
            // return deviceData;
            
            // returning dummy data for now insted of fetch()
            return [
                { id: 0, x:"25%", y:"25%" },
                { id: 1, x:"60%", y:"50%" }
            ]
        });
    }, [])

    function renderDeviceView() {
        return devices.map(device => <div key={device.id} style={Object.assign({ top: device.y, left: device.x }, styles.deviceBlip)} ></div>);
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
