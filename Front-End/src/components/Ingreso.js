import React, {Component, Fragment} from 'react';
import FormData from 'form-data';
import GoogleMapReact from 'google-map-react';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import swal from 'sweetalert';

const axios = require('axios').default;
const url_backend = 'http://localhost:5000/'

//restablecer error
const initialState ={
  titleError: "",
  descriptionError: "",
  yearError: "",
  communeError: "",
  imagenError: "",
  hayfotos: false
}

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
      lng: -73.0330456,
      titleError: "",
      descriptionError: "",
      yearError: "",
      communeError: "",
      imagenError: "",
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
  }

    handleLoaded(map, maps){
      map.addListener('click', (e)=>this.handleClick(e, map, maps), false);
      //map.addListener('dragend', ()=>{console.log(this.pin)}, false);
    }
    

    validate = () =>{
      let titleError = "";
      let descriptionError = "";
      let yearError = "";
      let communeError = "";
      let imagenError = "";

      if(!this.state.title){titleError='Este campo es obligatorio.';}
      if(!this.state.description){descriptionError='Este campo es obligatorio.';}
      if(!this.state.year){yearError='Este campo es obligatorio.';
      }else{
        if(!Number(this.state.year)){yearError='Ingrese un número válido.';}
      } 
      if(this.state.year>2021 || this.state.year<0){yearError='Año inválido.';}      
      if(!this.state.commune){communeError='Este campo es obligatorio.';}      
      if(!this.hayfotos){imagenError='Este campo es obligatorio.';}
      if(titleError || descriptionError || yearError || communeError || imagenError){
        this.setState({titleError});
        this.setState({descriptionError});
        this.setState({yearError});
        this.setState({communeError});
        this.setState({imagenError});
        return false;
      }
      if(this.state.title && this.state.description && this.state.year && this.state.commune && this.hayfotos){
        swal("Hecho publicado correctamente");
      }
      return true;
    }


  // usada para hacer submit de la form
  async handleSubmit(evt){
    evt.preventDefault();

    //***validar input */
    const isValid = this.validate();
    if(isValid){
      this.setState(initialState);
    }
    
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
      
      //error de foto
      this.hayfotos = true;
      let imagenError = "";
      this.setState({imagenError});

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
  // ignora input si esta vacio
  // los inputs se copian al state una vez que el input pierde el focus (onBlur)
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    const conv = Number(value);
    if(value === "" && (name==="lat" || name ==="lng")) return;

    if(name === "lat"){
      if(!isNaN(conv) && conv !== this.state.lat ){
        this.setLat(conv)
      }
    }
    else if (name === "lng"){
      if(!isNaN(conv) && conv !== this.state.lng ) {
        this.setLng(conv);
      }
    }
    else this.setState({[name]: value});
    // console.log(this.state)
    if(target.name === "lat" || target.name === "lng")
      target.value = "";
    //console.log("state updated!")
}

  setLat = (lat) => {
    this.setState({lat: lat})
  }

  setLng = (lng) => {
    this.setState({lng: lng})
  }

// en caso de querer editar la lat o lng, se copia el que esta en el state al input
handleEdit(evt){
  if(evt.target.name === "lat")
    evt.target.value = this.state.lat;
  else evt.target.value = this.state.lng;
}

  componentDidMount(){
    //
  }

  render() {
    return (
      <div className='fondoo'>
      <Fragment>
        <form onSubmit={this.handleSubmit}>
          <header className="header">
            <h1 style={{color:'white'}}>FORMULARIO DE COLABORACIÓN</h1>
          </header>
    
          <section className="seccion2">

            {/*IMAGENES*/}
            <p>
              <label className="label" for="imagenes">Imagenes: </label>
              <input style={{border:'none'}} className="input" type="file" name="imagenes" id="imagenes" multiple/>
              <div style={{marginLeft:'20px'}} className="error"> 
                {this.state.imagenError ? (<i class="fas fa-exclamation-circle"></i>) : null} 
                {this.state.imagenError}</div>            
              </p>

            <div style={{ height: '40vh', width: '98%', marginLeft:'10px' }}>
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
                <input className="input" type="text" name="lat" id="formLat" autocomplete="off" placeholder={this.state.lat} onClick={this.handleEdit} onBlur={this.handleChange}></input>
              </p>
              <p>
                <label className="label" for="lng">Longitud:</label>
                <input className="input" type="text" name="lng" id="formLng" autocomplete="off" placeholder={this.state.lng} onClick={this.handleEdit} onBlur={this.handleChange}></input>
              </p>
            </div>
            <p className="aviso">
              <i class="fas fa-exclamation-triangle"></i>
              Procura seleccionar una ubicación en el mapa. de lo contrario el hecho estará por defecto en el centro de Concepción.
            </p>


          </section>
          
          <aside className="columna2">
            <div className="LatLong" style={{marginLeft:'-40px', textAlign:'center'}}>
              <Route exact path="/ingreso" render={() => {
                return <div>
                    <Link to="/">
                      <button type="button" className="botonv2">
                        Volver
                      </button>
                    </Link>
                    <input className="botonSubmit" value="Submit" type="submit"></input>
                </div>
              }}></Route>
            </div>
            
            <p>
              <label className="label" for="title">Título:</label>
              <input className="input" type="text" name="title" id="title" onBlur={this.handleChange}></input>
              <div className="error"> 
                {this.state.titleError ? (<i class="fas fa-exclamation-circle"></i>) : null} 
                {this.state.titleError}
              </div>
            </p>
            <p>
              <label className="label" for="description">Descripción:</label>
              <textarea className="textarea" type="text" name="description" id="description" onBlur={this.handleChange}></textarea>
              <div className="error"> 
                {this.state.descriptionError ? (<i class="fas fa-exclamation-circle"></i>) : null}
                {this.state.descriptionError}
              </div>

            </p>
            <div className="LatLong" style={{width:'95%'}}>
              <p>
                <label className="label" for="year">Año:</label>
                <input className="input" type="text" name="year" id="year" onBlur={this.handleChange}></input>
                <div className="error"> 
                  {this.state.yearError ? (<i class="fas fa-exclamation-circle"></i>) : null} 
                  {this.state.yearError}
                </div>
              </p>
              <p>
                <label className="label" for="commune">Comuna:</label>
                <input className="input" type="text" name="commune" id="commune" onBlur={this.handleChange}></input>
                <div className="error"> 
                  {this.state.communeError ? (<i class="fas fa-exclamation-circle"></i>) : null} 
                  {this.state.communeError}
                </div>
              </p>
            </div>
            
          </aside>
        </form>     
    </Fragment>
    </div>
  );
  }  
}
export default Ingreso;
