import React, {Component} from 'react';
import FormData from 'form-data';
import GoogleMapReact from 'google-map-react';

const getFormJSON = (form) => {
  const data = new FormData(form);
  return Array.from(data.keys()).reduce((result, key) => {
    result[key] = data.get(key);
    return result;
  }, {});
};

class Ingreso extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: -36.8260421,
      lng: -73.0330456
    };
    this.handleChange = this.handleChange.bind(this)
  }

    handleSubmit(evt){
      console.log(evt);
      evt.preventDefault();
      const aux = getFormJSON(evt.target);
      console.log(aux);

    }
    handleClick(evt){
      var lat = evt.lat, lng = evt.lng;
      this.setLat(lat);
      this.setLng(lng);
      console.log({lat, lng});
      console.log(this.state.lat,this.state.lng);
    }

    
    
    setLat = (lat) => {
      this.setState({lat: lat})
    }
  
    setLng = (lng) => {
      this.setState({lng: lng})
    }

    handleChange(event) {
      if(event.target.id === "formLat"){
        this.setLat(Number(event.target.value));
      }
      if(event.target.id === "formLng")
        this.setLng(Number(event.target.value));
    }

    componentDidMount(){
      const form = document.getElementById('form');
      form.addEventListener('submit', this.handleSubmit, false);
      //const aux1 = document.getElementById('formLat');
      //const aux2 = document.getElementById('formLng');
      //aux1.addEventListener('change', this.handleChange, false)
      //aux2.addEventListener('change', this.handleChange, false)
    }

    render() {
      return (
        <div>
          <form action="a" method="POST" name="myForm" id="form">
            <p>
              <label for="first_name">First Name:</label>
              <input type="text" name="first_name" id="fname"></input>
            </p>
            <p>
              <label for="last_name">Last Name:</label>
              <input type="text" name="last_name" id="lname"></input>
            </p>
            <p>
              <label for="lat">Latitude:</label>
              <input type="text" name="lat" id="formLat" value={this.state.lat} onChange={this.handleChange}></input>
            </p>
            <p>
              <label for="lng">Longitude:</label>
              <input type="text" name="lng" id="formLng" value={this.state.lng} onChange={this.handleChange}></input>
            </p>
          <input value="Submit" type="submit"></input>
          </form>
          <div style={{ height: '100vh', width: '100%' }}>
            <GoogleMapReact
              //bootstrapURLKeys={{ key: null }}
              //defaultCenter={this.props.center}
              center={
                {
                  lat:Number(this.state.lat), 
                  lng:Number(this.state.lng)
                }
              }
              zoom={11}
            onClick={(e)=>this.handleClick(e)}
        />
          </div>
        </div>
        
      );
    }  
  }
  export default Ingreso;