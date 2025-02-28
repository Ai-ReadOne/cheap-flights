// src/components/FlightResults/filters/BagsFilter.js
import React from 'react';
import {
  Popover,
  Box,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button
} from '@mui/material';

/**
 * Props:
 *  - open: boolean (whether the popover is open)
 *  - anchorEl: element (the anchor for the popover)
 *  - onClose: function to close the popover
 *  - bagsFilter: string (the current selected bags option)
 *  - setBagsFilter: function to update the bagsFilter state
 */
function BagsFilter({ open, anchorEl, onClose, bagsFilter, setBagsFilter }) {
  const handleChange = (event) => {
    setBagsFilter(event.target.value);
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Bags
        </Typography>

        <RadioGroup value={bagsFilter} onChange={handleChange}>
          <FormControlLabel
            value="Any"
            control={<Radio />}
            label="Any bag allowance"
          />
          <FormControlLabel
            value="Carry-on only"
            control={<Radio />}
            label="Carry-on only"
          />
          <FormControlLabel
            value="Carry-on + 1 checked"
            control={<Radio />}
            label="Carry-on + 1 checked"
          />
          <FormControlLabel
            value="2+ checked"
            control={<Radio />}
            label="2 or more checked"
          />
        </RadioGroup>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Popover>
  );
}

export default BagsFilter;
