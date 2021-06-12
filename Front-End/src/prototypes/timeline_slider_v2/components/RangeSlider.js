// SOURCE: https://github.com/mui-org/material-ui/blob/c8b7ad499c6573c63ccb7e1fb21eb2124c6e77c8/packages/material-ui/src/Slider/Slider.js#L342

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';

const useStyles = makeStyles({
  root: {
    width: 300,
  },
});

export default function RangeSlider() {
  const classes = useStyles();
  const [value, setValue] = React.useState([1850, 1900]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    console.log(newValue);
  };

  return (
    <div className={classes.root}>
      <Typography id="range-slider" gutterBottom>
        Timeline Slider
      </Typography>
      <Slider
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        aria-labelledby="range-slider"
        min={1500}
        max={2021}
      />
    </div>
  );
}
