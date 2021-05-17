import React, {Component} from 'react';
import {Link} from 'react-router-dom';


import PropTypes from 'prop-types';

class Boton extends Component {

    render(){

        const {hecho}= this.props;
        return <div>
            <Link to="/hecho">
              <button type="button" onClick={this.props.mostrarHecho.bind(this, hecho)}>
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