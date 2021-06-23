import React, {Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Botones from './Botones'

class Mapa extends Component {

  constructor(props){
    super(props);
    this.state = {
    center: {
      lat: -36.82688568888844,
      lng: -73.05027428717374
    },
    zoom: 11
    }
  }

  updateAndNotify = (center) =>{
    this.setState({center: center})
  }
  
  componentDidUpdate(prevProps){
    if (prevProps.center !== this.props.center){
      this.updateAndNotify(this.props.center);
    }
  }

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          yesIWantToUseGoogleMapApiInternals
          //onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
          //bootstrapURLKeys={{ key: null }}
          center={this.state.center}
          zoom={this.state.zoom}>
          {this.props.hechos.map(e=>
          <Botones
            lat={e.x}
            lng={e.y}
            hecho = {e}
						mostrarHecho= {this.props.mostrarHecho}
          />)
          }
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Mapa;