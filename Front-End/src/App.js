import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//Components:
import Botones from './components/Botones';
import Mapa from './components/Mapa';
import Info from './components/Info';
import DateRangeFilter from './components/DateRangeFilter';
import {Search} from './components/Barrita';
import Navbar from './components/Navbar';

// importing axios
const axios = require('axios').default;
const url_backend = 'http://localhost:5000'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hechos: null,
      hecho: '',
      lat: -36.8260421,
      lng: -73.0330456
    }
  }
  
  setLat = lat => {
    this.setState({lat:lat})
  }

  setLng = lng => {
    this.setState({lng:lng})
  }

  mostrarHecho = hecho => {
    this.setState({hecho: hecho})
  }

  ocultarHecho = () => {
    this.setState({hecho: ''})
  }
  
  onChange = ranges => {
    // ranges ...
    alert("changed check the console log");
    console.log(ranges);
  };

  // esta funcion se llama sola luego de que el componente se haya renderizado una vez
  async componentDidMount() {
    // Obtener los puntos
    const response = await axios.get(url_backend.concat('/puntos?commune=concepcion'))
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

          return (
                  <div id='container'>
                    <div><Navbar setLat={this.setLat} setLng={this.setLng}></Navbar></div>
                    <div><DateRangeFilter onChange={this.onChange}></DateRangeFilter></div>
                    <div><Mapa id='google_map' hechos = {this.state.hechos} mostrarHecho={this.mostrarHecho} lat={this.state.lat} lng={this.state.lng}></Mapa></div>
                  </div>
          )
          
          /*<div class="mapa">
            <Botones
              hechos={this.state.hechos} 
              mostrarHecho={this.mostrarHecho}/>
            
          </div>*/
          
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
