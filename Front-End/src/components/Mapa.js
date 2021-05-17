import React, {Component} from 'react';

import mapa from '../images/mapa.png'

// importing axios
const axios = require('axios').default;

export default class Mapa extends Component {

    render() {
    	// Esto hace una peticion http (es solo un ejemplo)
		const response = axios.get('https://jsonplaceholder.typicode.com/todos/1')
		.then(response => 
			console.log(response.data)
		)

		// luego response va a tener los datos desde el back-end

        return(
	        <img src={mapa} alt="description"/>
        )
    }
}
