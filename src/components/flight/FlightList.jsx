// src/components/FlightList.js
import React from 'react';
import { Box } from '@mui/material';
import FlightCard from './FlightCard';

/**
 * flights: array of flight objects
 */
function FlightList({ flights }) {
  return (
    <Box sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
      {flights.map((flight, idx) => (
        <FlightCard key={idx} flight={flight} />
      ))}
    </Box>
  );
}

export default FlightList;
