import React, {Component, Fragment} from 'react';
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
  pin;
  constructor(props) {
    super(props)
    this.state = {
      lat: -36.8260421,
      lng: -73.0330456
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

    handleLoaded(map, maps){
      map.addListener('click', (e)=>this.handleClick(e, map, maps), false);
      //map.addListener('dragend', ()=>{console.log(this.pin)}, false);
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
  handleClick(evt, map, maps){
    //console.log(typeof(this.pin));
    var lat = evt.latLng.lat(), lng = evt.latLng.lng();
    //console.log({lat, lng});
    //console.log(this.state.lat,this.state.lng);
    this.setLat(lat);
    this.setLng(lng);
    
    if(!this.pin){
      let marker = new maps.Marker({
        position: evt.latLng,
        map,
        title: "Click to remove"
      });
      marker.addListener('click', ()=>{marker.setMap(null); this.pin = undefined;}, false)
      this.pin = marker;
    }
    else{
      this.pin.setPosition(evt.latLng)
    }
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
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <header className="header">
            <h1>FORMULARIO DE COLABORACIÓN</h1>
          </header>
    
          <section className="seccion">

            {/*IMAGENES*/}
            <p>
              <label className="label" for="imagenes">Imagenes: </label>
              <input className="input" type="file" name="imagenes" id="imagenes" multiple/>
            </p>

            <div style={{ height: '40vh', width: '98%' }}>
              <GoogleMapReact
                //bootstrapURLKeys={{ key: null }}
               //defaultCenter={this.props.center}
                yesIWantToUseGoogleMapApiInternals
                onGoogleApiLoaded={({map, maps})=>this.handleLoaded(map, maps)}
                center={
                  {
                    lat:Number(this.state.lat), 
                    lng:Number(this.state.lng)
                  }
                }
                zoom={11}
        //onClick={(event)=>this.handleClick(event)}
              />
            </div>
            <div className="LatLong">
              <p>
                <label className="label" for="lat">Latitud:</label>
                <input className="input" type="text" name="lat" id="formLat" value={this.state.lat} onChange={this.handleChange}></input>
              </p>
              <p>
                <label className="label" for="lng">Longitud:</label>
                <input className="input" type="text" name="lng" id="formLng" value={this.state.lng} onChange={this.handleChange}></input>
              </p>
            </div>


          </section>
          
          <aside className="columna">
            <input value="Submit" type="submit"></input>
            <p>
              <label className="label" for="title">Título:</label>
              <input className="input" type="text" name="title" id="title" onChange={this.handleChange}></input>
            </p>
            <p>
              <label className="label" for="description">Descripción:</label>
              <textarea className="textarea" type="text" name="description" id="description" onChange={this.handleChange}></textarea>
            </p>
          </aside>
        </form>     
    </Fragment>
  );
  }  
}
export default Ingreso;
