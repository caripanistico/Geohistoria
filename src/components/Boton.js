import React, {Component} from 'react';


import PropTypes from 'prop-types';

class Boton extends Component {

    render(){

        const {hecho}= this.props;
        return <button onClick={this.props.mostrarHecho.bind(this, hecho)}>
                {hecho.title}
            </button>
    }


}

Boton.propTypes = {
    boton: PropTypes.object.isRequired
}


export default Boton;