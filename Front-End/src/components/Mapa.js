import React, {PropTypes, Component} from 'react';
import GoogleMapReact from 'google-map-react';
import Botones from './Botones'
//import mapa from '../images/mapa.png'

/*export default class Mapa extends Component {

    render() {
        return(
	        <img src={mapa} alt="description"/>
        )
    }
}*/
// export default class Mapa extends{}

class Mapa extends Component {

  static defaultProps = {
    center: {
      lat: -36.82688568888844,
      lng: -73.05027428717374
    },
    zoom: 11
  };

  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '50vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: null }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
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