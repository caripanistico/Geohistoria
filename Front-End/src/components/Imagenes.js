import React, { Component } from 'react';

// import Images from "./images";
import "./styles/hechos.css";

// importing axios
const axios = require('axios').default;
const url_backend = 'http://localhost:5000/imagen'

export default class Imagenes extends Component {
    constructor(props) {
        super(props)
        this.state = {
            selectedImg: props.images[0],
            images: props.images
        }
   }

    setSelectedImg(img){
        this.setState({selectedImg: img})
    }

    render(){
        return (
            <div className="Imagenes">
                <div className="container">
                    <img src={url_backend + '?filename=' + this.state.selectedImg} alt="Selected" className="selected" />
                    <div className="imgContainer">
                        { this.state.images.map((img, index) => (
                           <img 
                                style={{border: this.state.selectedImg === img ? "4px solid black" : ""}} 
                                key={index} 
                                src={url_backend + '?filename=' + img} // la source es el endpoint en el back-end!
                                alt="imagen"
                                onClick={() => this.setSelectedImg(img)}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
