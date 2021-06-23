import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

//Components:
//import Botones from './components/Botones';
import Mapa from './components/Mapa';
import Info from './components/Info';
import DateRangeFilter from './components/DateRangeFilter';

// import de estilos, EL UNICO!!
import './components/styles/styles.css'
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
      // estos parametros sirven para que al volver desde un hecho al mapa,
      // el mapa siga como estaba antes
      date1: 1900, // valor inicial
      date2: 2000, // valor inicial
      center: {
        lat: -36.82688568888844,
        lng: -73.05027428717374
    }
  }
  }

  handlerClick = (lat, lng) =>{
    this.setState({center: {lat, lng}})
    console.log(this.state.center)
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

    // Obtener puntos en el rango
    const response = await axios.get(url_backend.concat('/date-range'), { params: params });

    // Cargar nuevos puntos y fechas
    this.setState({
      hechos: response.data,
      date1: date1,
      date2: date2
    });
  }
  
  onChange_Dates = async (ranges) => {

    try{
      await this.obtener_puntos('concepcion', ranges.startDate.getFullYear(), ranges.endDate.getFullYear())

    }catch(error){
      alert("back-end no responde !!") //dev
    }
  }


  // esta funcion se llama sola luego de que el componente se haya renderizado una vez
  async componentDidMount() {
    // Obtener los puntos
    try{
      await this.obtener_puntos('concepcion', this.state.date1, this.state.date2)

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
                    <div><Navbar clickHandler={this.handlerClick}></Navbar></div>
                    <div>
                      <DateRangeFilter onChange={this.onChange_Dates}></DateRangeFilter>
                    </div>
                      <Mapa id='map' hechos={this.state.hechos} mostrarHecho={this.mostrarHecho} center={this.state.center}></Mapa>
                  </div>
          )
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
