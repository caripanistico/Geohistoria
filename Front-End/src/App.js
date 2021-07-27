import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import { URL_BACKEND } from './static/storage.js';

//Components:
import Mapa from './components/Mapa';
import Info from './components/Info';
import DateRangeFilter from './components/DateRangeFilter';
import Navbar from './components/Navbar';
import Ingreso from './components/Ingreso';

// import de estilos, EL UNICO!!
import './components/styles/styles.css'

// importing axios
const axios = require('axios').default;

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      hechos: null,
      hecho: '',
      // estos parametros sirven para que al volver desde un hecho al mapa,
      // el mapa siga como estaba antes
      date1: 1900, // valor inicial
      date2: 2000, // valor inicial
      lat: -36.8260421,
      lng: -73.0330456,
      commune: 'concepcion'
    }
  }
  
  setLat = lat => {
    this.setState({lat:lat})
  }

  setLng = lng => {
    this.setState({lng:lng})
  }
  
  setCommune = async (commune) => {
    this.setState({commune: commune});
    try{
      await this.obtener_puntos(commune, this.state.date1, this.state.date2)

    }catch(error){
      console.log(error);
    }
  }

  mostrarHecho = hecho => {
    this.setState({hecho: hecho})
  }

  ocultarHecho = () => {
    this.setState({hecho: ''})
  }


  // consulta al back-end por los puntos y actualiza this.state
  obtener_puntos = async (commune, date1, date2) => {

    const params = {
      commune: commune,
      date1: date1,
      date2: date2
    }
    console.log(params);
    // Obtener puntos en el rango
    const response = await axios.get(URL_BACKEND.concat('/date-range'), { params: params });

    // Cargar nuevos puntos y fechas
    this.setState({
      hechos: response.data,
      date1: date1,
      date2: date2
    });
    //console.log(this.state.hechos);
  }
  
  onChange_Dates = async (ranges) => {
    this.setState({
      date1: ranges.startDate.getFullYear(),
      date2: ranges.endDate.getFullYear()
      }
    )
    try{
      await this.obtener_puntos(this.state.commune, ranges.startDate.getFullYear(), ranges.endDate.getFullYear())

    }catch(error){
      alert("back-end no responde !!") //dev
    }
  }


  // esta funcion se llama sola luego de que el componente se haya renderizado una vez
  async componentDidMount() {

    // change document title
    document.title = "GeoHistoria";


    // Obtener los puntos
    try{
      await this.obtener_puntos(this.state.commune, this.state.date1, this.state.date2)

    }catch(error){
      console.log(error)
    }
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
                    <Navbar setLat={this.setLat} setLng={this.setLng} setCommune={this.setCommune}/>
                    <DateRangeFilter date1={this.state.date1} date2={this.state.date2} onChange={this.onChange_Dates} />
                    <Mapa id='google_map' hechos = {this.state.hechos} mostrarHecho={this.mostrarHecho} lat={this.state.lat} lng={this.state.lng} />
                  </div>
          )
        }}>
        </Route>

        <Route exact path="/hecho" render={() => {
          return <div>
            <nav class="menu">
              <Link to="/">
                <button type="button" className="botonv">
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

        <Route exact path="/ingreso" render={() => {
          return(
            <Ingreso lat={this.state.lat} lng={this.state.lng}></Ingreso>
          );
        }}>

        </Route>

      </Router>
      
    </div>
  }
}

export default App;
