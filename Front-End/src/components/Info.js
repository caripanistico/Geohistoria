import React, { Component } from 'react';

import Imagenes from './Imagenes';

export default class info extends Component {

    async componentDidMount() {

    }

    render() {

        const {hecho}= this.props;
        console.log(hecho)

        return (
            <div>
                <head>
                    <meta charset="UTF-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Archivo</title>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&display=swap" rel="stylesheet"/> 
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glider-js@1.7.7/glider.min.css"/> 
                    <link rel="stylesheet" href="styles/home.css"/>
                </head>
                <section class="seccion">
                    <h1>{hecho.nimage1}</h1>
                </section>
                <Imagenes images={hecho.imagenes}/>
                {/*<section class="seccion">
                    <h1>{hecho.nimage1}</h1>
                    <img src={img1}/>

                    <div class="carousel">
                        <div class="carousel__contenedor">
                    
                            <div class="carousel__lista">
                                <div class="carousel__elemento">
                                    <img src={img2}/>
                                </div>
                                <div class="carousel__elemento">
                                    <img src={img3}/>
                                </div>
                                <div class="carousel__elemento">
                                    <img src={img4}/>
                                </div>
                                <div class="carousel__elemento">
                                    <img src={img5}/>
                                </div>
                                <div class="carousel__elemento">
                                    <img src={img6}/>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                
                </section>*/}
                <aside class="columna">
                    <h1 id={'title'} >{hecho.title}</h1>
                    <div>
                        <p>{hecho.texto}</p>
                    </div>
{/*                    <h1>Tags</h1>*/}
                </aside>
                <footer class="pie">
                </footer>
                <script src="https://kit.fontawesome.com/2c36e9b7b1.js" crossorigin="anonymous"></script>
                <script src="https://cdn.jsdelivr.net/npm/glider-js@1.7.7/glider.min.js"></script> 
                <script src="app.js"></script>
            </div>
        )
    }
}
