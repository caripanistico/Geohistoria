import React, {Component} from 'react';
import {MenuItems} from "./MenuItems"
import'./Navbar.css'
import {Link} from "react-router-dom";
import './styles/styles.css'

class Navbar extends Component{
    state ={clicked:false}

    handleClick=()=>{
        this.setState({clicked: !this.state.clicked})
    }

    render(){
        return(
            <nav className="NavbarItems">
                <h1 className="navbar-logo">Geohistoria<i className="fab fa-react"></i></h1>

                <div className="menu-icon" onClick={this.handleClick}>
                    <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
                </div>
                <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
                    {MenuItems.map((item, index)=>{
                        return(
                            <li key={index}>
                                <a className={item.cName} onClick={()=>{
                                    this.props.setLat(item.lat);
                                    this.props.setLng(item.lng);
                                    //console.log(this.props.lat)
                                }}>
                                    {item.title}
                                </a>
                            </li>
                        )
                    })} 
                </ul>
                <Link to="/ingreso">
                    <button type="button" className="botoni">
                        Ingresar hecho
                    </button>
                </Link>
            </nav>
        )
    }
}

export default Navbar