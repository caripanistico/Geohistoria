
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

import './estilosMapa.css';

// import hechos from './sample/hechos.json';

//Components:
import Botones from './components/Botones';
//import Mapa from './components/Mapa';
import Info from './components/Info';

// importing axios
const axios = require('axios').default;

const url_backend = 'http://localhost:5000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hechos: null,
      hecho: ''
    }
  }

  // state = {
  //   hechos: hechos,
  //   hecho:''
  // }

  mostrarHecho = hecho => {
    this.setState({hecho: hecho})
  }

  ocultarHecho = () => {
    this.setState({hecho: ''})
  }

  // esta funcion se llama sola luego de que el componente se haya renderizado una vez
  async componentDidMount() {
    // Obtener los puntos
    const response = await axios.get(url_backend.concat('/puntos?comuna=concepcion'))
    this.setState({hechos: response.data})
  }

  render() {
    // esto evitar errores al renderizar sin datos. (Loading screen)
    if(this.state.hechos == null){
      return(
        <div>
          <h1> Cargando... </h1>
        </div>
      )
    }

    return <div>
      <Router>

        <Route exact path="/" render={() => {

          return <div class="mapa">
            <Botones
              hechos={this.state.hechos} 
              mostrarHecho={this.mostrarHecho}/>
            
          </div>
            
          /*return <div>
            <Mapa
              hecho={this.state.hecho}/>
            <Botones
              hechos={this.state.hechos} 
              mostrarHecho={this.mostrarHecho}/>
            
            
          </div>*/
        }}>

        </Route>
          <Route exact path="/hecho" render={() => {
            
            return <div>
              <nav class="menu">
                <Link to="/">
                  <button type="button" class="botonv">
                    Volver
                  </button>
                </Link>
              </nav>
              <section>
                <Info hecho={this.state.hecho}/>
              </section>
              
              
            </div>
          }}>
  
          </Route>
      </Router>
      
    </div>
  }
}

export default App;
