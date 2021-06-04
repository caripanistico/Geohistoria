import React, {Component} from 'react';

import Boton from './Boton';

import PropTypes from 'prop-types';

class Botones extends Component {
    constructor(props){
        if(props!=null)
            super(props)
    }
    render(){			
        return this.props.hechos.map(e => 
            <Boton 
                hecho={e} 
                key={e._id}
                mostrarHecho={this.props.mostrarHecho}
            />)
    }
}

Botones.propTypes = {
    botones: PropTypes.array.isRequired
}

export default Botones;