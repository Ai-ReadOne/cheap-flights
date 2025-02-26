// src/components/FlightCard.js
import React from 'react';
import {
  Paper,
  Box,
  Typography,
  Divider,
  Button,
  Stack,
  Avatar
} from '@mui/material';

/**
 * flight: {
 *   airline: "Delta",
 *   airlineLogo: "delta.png",
 *   departureTime: "7:00 AM",
 *   arrivalTime: "1:25 PM",
 *   stopsLabel: "1 stop",
 *   duration: "6h 25m",
 *   durationMinutes: 385,
 *   price: 142527,
 *   currency: "NGN",
 *   timeOfDay: "Morning",
 *   rating: 4.5
 * }
 */
function FlightCard({ flight }) {
  const {
    airline,
    airlineLogo,
    departureTime,
    arrivalTime,
    stopsLabel,
    duration,
    price,
    currency
  } = flight;

  return (
    <Paper variant="outlined" sx={{ p: 2, borderRadius: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Left: Airline & Times */}
        <Stack direction="row" spacing={2} alignItems="center">
          {/* Airline Logo */}
          <Avatar
            variant="square"
            src={airlineLogo || 'https://via.placeholder.com/40'}
            alt={airline}
            sx={{ width: 40, height: 40 }}
          />

          <Box>
            <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
              {airline}
            </Typography>
            <Typography variant="body2">
              {departureTime} - {arrivalTime}
            </Typography>
            <Typography variant="caption">{stopsLabel} • {duration}</Typography>
          </Box>
        </Stack>

        {/* Right: Price & Select */}
        <Stack direction="row" spacing={2} alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            {currency} {price.toLocaleString()}
          </Typography>
          <Button variant="contained" color="primary">
            Select
          </Button>
        </Stack>
      </Box>
    </Paper>
  );
}

export default FlightCard;
