// src/components/FlightResults.js
import React from 'react';
import { Box, Typography } from '@mui/material';
import FlightFilterBar from './FlightFilterBar';
import FlightSortBar from './FlightSortBar';
import FlightList from './FlightList';

function FlightResults({ flights }) {
  // ... your filtering/sorting logic

  return (
    <Box sx={{ my: 2 }}>
      <FlightFilterBar
        // pass states if you want to filter
      />
      <FlightSortBar
        // pass states if you want to sort
      />
      <Box sx={{ mt: 2, mb: 1 }}>
        <Typography variant="body1">
          {`Top departing flights • ${flights.length} result${
            flights.length === 1 ? '' : 's'
          } found`}
        </Typography>
      </Box>
      <FlightList flights={flights} />
    </Box>
  );
}

export default FlightResults;
