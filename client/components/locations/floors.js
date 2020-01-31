import React, { useState } from "react";

export default function Floor(props) {
    const [devices, setDevices] = useState();

    function getDevices() {
        setDevices(async () => {
            let deviceData = await fetch(input);
            return deviceData;
        });
    }

    function renderDeviceView() {
        return devices.map(device => {});
    }
}
