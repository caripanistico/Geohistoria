import React from 'react';
import PropTypes from 'prop-types';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file

import { DateRangePicker } from 'react-date-range';

import { addDays, subDays } from 'date-fns';
import { useState } from 'react';


const DateRangeFilter = ({ onChange }) => {
    const [state, setState] = useState([
      {
        startDate: new Date(1900,0,1),
        endDate: new Date(2000,11,31),
        key: "selection"
      }
    ]);
  
    const handleOnChange = ranges => {
      const { selection } = ranges;
      onChange(selection);
      setState([selection]);
    };
  
    return (
      <DateRangePicker
        onChange={handleOnChange}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        minDate={new Date(1800, 0, 1)}
        maxDate={new Date(2040, 11, 31)}
      />
    );
  };
  
  DateRangeFilter.propTypes = {
    onChange: PropTypes.func
  };
  
  export default DateRangeFilter;