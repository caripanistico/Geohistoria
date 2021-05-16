import React, { Component } from 'react';

export default class info extends Component {

    render() {

        const {hecho}= this.props;

        return (
            <div>
                <h1>{hecho.title}</h1>
                <p>{hecho.texto}</p>
            </div>
        )
    }
}
