import React, { useState, useEffect } from "react";
import Floor from "./floors";

const floors = ["floor1.png", "floor1m.png", "floor2.png"]

export default function Locations(props) {
    const [currentFloor, setFloor] = useState(0);
    
    useEffect(() => {
        setFloor(0);
    })
    
    return (
        <div style={{width: "100%"}}>
            <div style={{ display: "flex" }}>
                {
                    floors.map((floor) => (
                        <div 
                            key={floors.indexOf(floor)}
                            style={{
                                padding: '0.5rem',
                                cursor: "pointer",
                                backgroundColor: (currentFloor == floors.indexOf(floor)) ? "black" : "transparent",
                                color: (currentFloor == floors.indexOf(floor)) ? "white" : "black"
                            }} 
                            onClick={() => {setFloor(floors.indexOf(floor))}}
                        >
                            {floor.replace(".png", "").replace("floor", "Floor ")}
                        </div>
                    ))
                }
            </div>
            {/* <Floor image="floor1.png" /> */}
        </div>
    )

}
