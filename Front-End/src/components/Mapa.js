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

  static defaultProps={
    center: {
      lat: -36.8260421,
      lng: -73.0330456
    },
    zoom: 12
  }


  render() {
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '100vh', width: '100%' }}>
        <GoogleMapReact
          //bootstrapURLKeys={{ key: null }}
          //defaultCenter={this.props.center}
          center={{lat:Number(this.props.lat), 
                  lng:Number(this.props.lng)}}
          zoom={this.props.zoom}
          //onClick={console.log(this.props.lat), console.log(this.props.center)}
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