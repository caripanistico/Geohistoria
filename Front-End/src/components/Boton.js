import React, {Component} from 'react';
import {Link} from 'react-router-dom';

import '../estilosMapa.css';


import PropTypes from 'prop-types';

class Boton extends Component {

  style(x, y){

    return {
      left: x,
      top: y
    }
  }


  render(){

    const {hecho}= this.props;
    return <div>
      <Link to="/hecho">
        <button type="button" class="botonm" style={this.style(0 ,0)} onClick={this.props.mostrarHecho.bind(this, hecho)}>
          {hecho.title}
        </button>
      </Link>
        
        
      </div>
  }


}

Boton.propTypes = {
    boton: PropTypes.object.isRequired
}


export default Boton;