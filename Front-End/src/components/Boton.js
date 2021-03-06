import React, {Component} from 'react';
import {Link} from 'react-router-dom';

// import './styles/home.css';


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
        <span className='tooltiptext'>
          <button id ={hecho._id} type="button" className="botonm" style={this.style(0 ,0)} onClick={this.props.mostrarHecho.bind(this, hecho)}>
            <span className='tooltiptext'>{hecho.title}</span>
          </button>
        </span>
      </Link>
        
        
      </div>
  }


}

Boton.propTypes = {
    boton: PropTypes.object.isRequired
}


export default Boton;