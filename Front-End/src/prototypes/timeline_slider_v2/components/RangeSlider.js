// SOURCE: https://github.com/mui-org/material-ui/blob/c8b7ad499c6573c63ccb7e1fb21eb2124c6e77c8/packages/material-ui/src/Slider/Slider.js#L342

import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

import throttle from 'lodash/throttle';

// importing axios
const axios = require('axios').default;
const url_backend = 'http://localhost:5000'


class RangeSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {
      value: [1900, 2000]
    }
  }

  updateView = (event, newValue) => {
    this.state.value = newValue
    console.log(this.state.value)
  }

  // fetchPuntos = async (newValue) => {
  //   return await axios.get(url_backend.concat('/puntos?commune=concepcion'))
  // }

  log_fetch = (newValue) => {
    console.log('log_fetch', newValue)
  }

  throttled_fecthPuntos = throttle( (newValue) => {
    this.log_fetch(newValue)
  }, 1000, { leading: true })

  // ahora esta haciendo bien el throttle pero no updatea bien la view !



  render (){
    return(
      <div style={{width: 300}}>
        <Typography id="range-slider" gutterBottom>
          Timeline Slider
        </Typography>
        <Slider
          value={this.state.value}
          onChange={ (event, newValue) => {
            this.updateView(event, newValue)
            this.throttled_fecthPuntos(newValue)
          }}

          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={1500}
          max={2021}
        />
      </div>
    )
  };
}

export default RangeSlider;