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
      lat: 59.95,
      lng: 30.33
    },
    zoom: 11
  };
  
  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: null }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <Botones
            lat={59.955413}
            lng={30.337844}
            hechos = {this.props.hechos}
						mostrarHecho= {this.props.mostrarHecho}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Mapa;