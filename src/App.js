
import React, { Component } from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import './App.css';

import hechos from './sample/hechos.json';

//Components:
import Botones from './components/Botones';
import Mapa from './components/Mapa';
import Info from './components/Info';

class App extends Component {

  state = {
    hechos: hechos,
    hecho:''
  }

  mostrarHecho = hecho => {
    this.setState({hecho: hecho})
  }

  ocultarHecho = () => {
    this.setState({hecho: ''})
  }

  render() {
    return <div>
      <Router>

        <Route exact path="/" render={() => {
            
          return <div>
            <Mapa
              hecho={this.state.hecho}/>
            <button onClick={this.ocultarHecho}>Agrandar mapa</button>
            <Botones
              hechos={this.state.hechos} 
              mostrarHecho={this.mostrarHecho}/>
            <Info hecho={this.state.hecho}/>
            
            
          </div>
        }}>

        </Route>
      </Router>
      
    </div>
  }
}

export default App;
