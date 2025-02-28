import React from 'react';
import {
  Popover,
  Box,
  Typography,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
  Divider
} from '@mui/material';

function StopsFilter({ open, anchorEl, onClose, stopsFilter, setStopsFilter }) {
  const handleChange = (event) => {
    setStopsFilter(event.target.value);
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
          Stops
        </Typography>

        {/* Optional subtle subheading or instructions */}
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Choose the maximum number of stops
        </Typography>

        <Divider sx={{ mb: 2 }} />

        <FormControl>
          <RadioGroup value={stopsFilter} onChange={handleChange}>
            <FormControlLabel
              value="Any"
              control={<Radio />}
              label="Any number of stops"
            />
            <FormControlLabel
              value="Nonstop"
              control={<Radio />}
              label="Nonstop"
            />
            <FormControlLabel
              value="1 stop"
              control={<Radio />}
              label="1 stop"
            />
            <FormControlLabel
              value="2+ stops"
              control={<Radio />}
              label="2+ stops"
            />
          </RadioGroup>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {/* Replace with "Clear" or another button if desired */}
          <Button variant="outlined" onClick={onClose} sx={{ mr: 1 }}>
            Cancel
          </Button>
          <Button variant="contained" onClick={onClose}>
            Done
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}

export default StopsFilter;
