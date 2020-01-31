import React, { Component } from 'react'
import styles from './nav.css';

const NavItem = ({ name, updateRouteLocation }) => {
  return (
    <div onClick={() => updateRouteLocation(name)}>
      { name }
    </div>
  )
}

export default class Nav extends Component {
  
  constructor (props) {
    super(props);
    this.state = { 
      width: 0, 
      height: 0 
    };
  }

  updateDimensions = () => {
    this.setState({
      width: window.innerWidth, 
      height: window.innerHeight 
    });
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }
  
  render() {
    return (
      <nav style={styles}>
        <NavItem 
          name="Locations" 
          updateRouteLocation={this.props.updateRouteLocation} />
        <NavItem 
          name="Devices" 
          updateRouteLocation={this.props.updateRouteLocation} />
      </nav>
    )
  }

}
