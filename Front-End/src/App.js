
import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';

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
            <Botones
              hechos={this.state.hechos} 
              mostrarHecho={this.mostrarHecho}/>
            
            
          </div>
        }}>

        </Route>
          <Route exact path="/hecho" render={() => {
            
            return <div>
              <Link to="/">
                <button type="button">
                  Volver al Mapa
                </button>
              </Link>
              <Info hecho={this.state.hecho}/>
              
              
            </div>
          }}>
  
          </Route>
      </Router>
      
    </div>
  }
}

export default App;
