import React, { Component } from 'react';
import Floor from './floors'
import Floor1 from '../../images/floor1.png'
import Floor1m from '../../images/floor1m.png'
import Floor2 from '../../images/floor2.png'

const images =[{
    floor: Floor1,
    name:'Floor1',
}, 
{
    floor: Floor1m,
    name: 'Floor1m'
}, 
{
    floor: Floor2,
    name: 'Floor2'
}];

export default class Locations extends Component {
    constructor(props){
        super(props);
        this.state = {
            currentFloor: 0,
            floor: null,
            
        };
        
    }
    
    


    render() {
        
        return (
            
            <div style={{width: "100%"}}>
                <div style={{ display: "flex" }}>
                    
                    {
                        images.map((e) => {
                            let i = images.indexOf(e);
                            let current = this.state.currentFloor === i;
    
                            return (
                                <div 
                                    key={i}
                                    style={{
                                        padding: '0.5rem',
                                        cursor: "pointer",
                                        backgroundColor: (current) ? "black" : "transparent",
                                        color: (current) ? "white" : "black",
                                        marginLeft: "50px",
                                        marginTop: "70px"
                                    }} 
                                    onClick={() => this.setState({ currentFloor: i})}
                                >
                                    {e.name}
                                </div>
                            )
                        })
                    }
                </div>
                <div>
                    <Floor
                        image={images[this.state.currentFloor].floor}
                        devices={this.props.dummyData.allDevices.filter((device) => {
                            if (this.props.dummyData.floors[this.state.currentFloor] === device.location)
                                return device
                        })} 
                    />
                </div>
            </div>
        )
    }
}
