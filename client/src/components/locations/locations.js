import React, { useState, useEffect } from "react";
import Floor from "./floors";

export default function Locations(props) {
    const [currentFloor, setFloor] = useState(0);
    
    useEffect(() => {
        if (props.floor) {
            setFloor(props.floor);
        }
    }, [])
    
    return (
        <div style={{width: "100%"}}>
            <div style={{ display: "flex" }}>
                {
                    props.dummyData.floors.map((floor) => {
                        let i = props.dummyData.floors.indexOf(floor);
                        let current = currentFloor == i;

                        return (
                            <div 
                                key={i}
                                style={{
                                    padding: '0.5rem',
                                    cursor: "pointer",
                                    backgroundColor: (current) ? "black" : "transparent",
                                    color: (current) ? "white" : "black"
                                }} 
                                onClick={() => {setFloor(i)}}
                            >
                                {floor.replace(".png", "").replace("floor", "Floor ")}
                            </div>
                        )
                    })
                }
            </div>
            <div>
                <Floor
                    image={props.dummyData.floors[currentFloor]} 
                    devices={props.dummyData.allDevices.filter((device) => {
                        if (props.dummyData.floors[currentFloor] === device.location)
                            return device
                    })}
                    updateRouteLocation={props.updateRouteLocation} />
            </div>
        </div>
    )

}
