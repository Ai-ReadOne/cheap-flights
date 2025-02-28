// src/components/FlightResults/FlightList.js
import React from 'react';
import { Box } from '@mui/material';
import FlightCard from './FlightCard';

function FlightList({ flights }) {
  if (!flights.length) {
    return <Box>No matching flights found.</Box>;
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {flights.map((flight, idx) => (
        <FlightCard key={idx} flight={flight} />
      ))}
    </Box>
  );
}

export default FlightList;
