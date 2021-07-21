import React, {Component} from 'react';
import FormData from 'form-data';
import GoogleMapReact from 'google-map-react';

const axios = require('axios').default;
const url_backend = 'http://localhost:5000/'


// const getFormJSON = (form) => {
//   const data = new FormData(form);
//   return Array.from(data.keys()).reduce((result, key) => {
//     result[key] = data.get(key);
//     return result;
//   }, {});
// };

class Ingreso extends Component {

  constructor(props) {
    super(props)
    this.state = {
      lat: -36.8260421,
      lng: -73.0330456
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // usada para hacer submit de la form
  async handleSubmit(evt){
    evt.preventDefault();

    console.log(this.state);

    // *** construir formdata para imagenes
    const imagenes_data = new FormData();
    const imagenes = document.querySelector('#imagenes');

    for (let img of imagenes.files){
      // changing img name
      const file_extension = img.name.split('.').pop()
      const aux = img.slice(0, img.size, 'image/png');
      const new_img_name = Date.now() + Math.random().toString(20).substr(2, 6) + '.' + file_extension
      const new_img = new File([aux], new_img_name, {type: 'image/png'})

      console.log(new_img_name, new_img)
      imagenes_data.append(new_img_name, new_img)
    }

    // 1. Enviar imagenes del punto
    let response = await axios.post(url_backend + 'add-image', imagenes_data,
      {headers:{'Content-Type':'multipart/form-data'}});

    // *** construir formdata para datos punto
    const imagenes_names = response.data['imagenes']
    const form_data = new FormData();

    for (const key in this.state) {
      form_data.append(key, this.state[key]);
    }

    form_data.append('imagenes', imagenes_names)

    // 2. Enviar data del punto
    response = await axios.post(url_backend + 'add-point', form_data)
    console.log(response)
  }

  // usada en mapa
  handleClick(evt){
    var lat = evt.lat, lng = evt.lng;
    this.setLat(lat);
    this.setLng(lng);
    console.log({lat, lng});
    console.log(this.state.lat,this.state.lng);
  }

  // usada para almacenar cambios del input en state --> refleja cambios en el mapa
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    if(name === "lat") this.setLat(Number(value));
    else if (name === "lng") this.setLng(Number(value));
    else this.setState({[name]: value});

    // console.log(this.state)
  }

  setLat = (lat) => {
    this.setState({lat: lat})
  }

  setLng = (lng) => {
    this.setState({lng: lng})
  }


  componentDidMount(){
    //
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <p>
            <label for="first_name">First Name:</label>
            <input type="text" name="first_name" id="fname" onChange={this.handleChange}></input>
          </p>
          <p>
            <label for="last_name">Last Name:</label>
            <input type="text" name="last_name" id="lname" onChange={this.handleChange}></input>
          </p>
          <p>
            <label for="lat">Latitude:</label>
            <input type="text" name="lat" id="formLat" value={this.state.lat} onChange={this.handleChange}></input>
          </p>
          <p>
            <label for="lng">Longitude:</label>
            <input type="text" name="lng" id="formLng" value={this.state.lng} onChange={this.handleChange}></input>
          </p>

          {/*IMAGENES*/}
          <p>
            <label for="imagenes">Imagenes: </label>
            <input type="file" name="imagenes" id="imagenes" multiple/>
          </p>



          <input value="Submit" type="submit"></input>
        </form>











        <div style={{ height: '50vh', width: '50vw' }}>
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