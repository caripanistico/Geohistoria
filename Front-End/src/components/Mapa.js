import React, {Component} from 'react';

import mapa from '../images/mapa.png'

// importing axios
const axios = require('axios').default;

const url_backend = 'http://localhost:5000'

export default class Mapa extends Component {

    render() {
    	// Esto hace una peticion http
    	const url = url_backend.concat('/test')
    	console.log(url)

		const response = axios.get(url)
			.then(function (response) {
				// handle success
				console.log(response.data);
			})

		// luego response va a tener los datos desde el back-end

        return(
	        <img src={mapa} alt="description"/>
        )
    }
}
