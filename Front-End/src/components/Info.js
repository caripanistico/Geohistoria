import React, { Component } from 'react';

import Imagenes from './Imagenes';

import './estilosArchivo.css';


export default class info extends Component {

    

    render() {

        const {hecho}= this.props;

        return (
            <div>
                <head>
                    <meta charset="UTF-8"/>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
                    <title>Archivo</title>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat&family=Open+Sans&display=swap" rel="stylesheet"/> 
                    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/glider-js@1.7.7/glider.min.css"/> 
                    <link rel="stylesheet" href="estilosArchivo.css"/>
                </head>
                <section class="seccion">
                    <h1>{hecho.nimage1}</h1>
                </section>
                <Imagenes/>
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
                    <h1>{hecho.title}</h1>
                    <div>
                        <p>{hecho.texto}</p>
                        <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Distinctio atque expedita nam ipsa eius asperiores cupiditate tenetur amet libero, architecto accusamus autem, fugit tempora exercitationem consequatur iure! Reiciendis expedita ducimus doloremque. Praesentium corrupti quidem distinctio asperiores id quasi quis? Magnam optio molestiae aliquid ipsa provident atque, odit blanditiis eius placeat dolores odio, minus sed architecto molestias deleniti et delectus! Placeat maxime, vitae deserunt dolore aspernatur ad modi molestiae consectetur, nesciunt impedit laudantium eius minima officia reiciendis quidem vero, officiis odio magni accusamus ipsam! Iure consequuntur maxime ipsam, voluptatibus error excepturi eius expedita omnis deserunt at illum fuga suscipit sapiente debitis!</p>
                    </div>
                    <h1>Tags</h1>
                    <div>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Obcaecati, recusandae.</p>
                    </div>
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
