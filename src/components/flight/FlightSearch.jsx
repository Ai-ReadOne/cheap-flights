// src/components/FlightSearch.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Paper,
  Tabs,
  Tab,
  Box,
  TextField,
  InputAdornment,
  Button,
  Typography,
  MenuItem,
  Select,
  FormControl
} from '@mui/material';
import { FlightTakeoff, FlightLand, CalendarToday } from '@mui/icons-material';

function FlightSearch({ onSearch }) {
  const navigate = useNavigate();

  // Example states for the form
  const [tripType, setTripType] = useState('round-trip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [travelers, setTravelers] = useState(1);
  const [travelClass, setTravelClass] = useState('Economy');

  const handleTripTypeChange = (event, newValue) => {
    setTripType(newValue);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!from || !to || !departureDate) {
      alert('Please fill in required fields');
      return;
    }

    // If round-trip is selected, we also need a return date
    if (tripType === 'round-trip' && !returnDate) {
      alert('Please select a return date for a round trip.');
      return;
    }

    // Gather form data
    const formData = {
      tripType,
      from,
      to,
      departureDate,
      returnDate,
      travelers,
      travelClass
    };

    // Call the parent's onSearch, passing the navigate so it can redirect
    if (onSearch) {
      await onSearch(formData, navigate);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        mb: 3,
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        gap: 2
      }}
    >
      <Tabs
        value={tripType}
        onChange={handleTripTypeChange}
        textColor="primary"
        indicatorColor="primary"
      >
        <Tab label="Round trip" value="round-trip" />
        <Tab label="One way" value="one-way" />
        <Tab label="Multi-city" value="multi-city" />
      </Tabs>

      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 2,
          alignItems: 'center'
        }}
      >
        {/* From */}
        <TextField
          label="From"
          variant="outlined"
          required
          fullWidth
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightTakeoff />
              </InputAdornment>
            )
          }}
        />

        {/* To */}
        <TextField
          label="To"
          variant="outlined"
          required
          fullWidth
          value={to}
          onChange={(e) => setTo(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <FlightLand />
              </InputAdornment>
            )
          }}
        />

        {/* Departure Date */}
        <TextField
          label="Departure"
          type="date"
          variant="outlined"
          required
          fullWidth
          value={departureDate}
          onChange={(e) => setDepartureDate(e.target.value)}
          InputLabelProps={{ shrink: true }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <CalendarToday />
              </InputAdornment>
            )
          }}
        />

        {/* Return Date (only if round-trip) */}
        {tripType === 'round-trip' && (
          <TextField
            label="Return"
            type="date"
            variant="outlined"
            fullWidth
            required={tripType === 'round-trip'}
            value={returnDate}
            onChange={(e) => setReturnDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <CalendarToday />
                </InputAdornment>
              )
            }}
          />
        )}

        {/* Travelers */}
        <FormControl sx={{ minWidth: 120 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Travelers
          </Typography>
          <Select
            value={travelers}
            onChange={(e) => setTravelers(e.target.value)}
          >
            {[...Array(9).keys()].map((num) => (
              <MenuItem key={num + 1} value={num + 1}>
                {num + 1} {num === 0 ? 'traveler' : 'travelers'}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Class */}
        <FormControl sx={{ minWidth: 120 }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Class
          </Typography>
          <Select
            value={travelClass}
            onChange={(e) => setTravelClass(e.target.value)}
          >
            <MenuItem value="Economy">Economy</MenuItem>
            <MenuItem value="Premium Economy">Premium Economy</MenuItem>
            <MenuItem value="Business">Business</MenuItem>
            <MenuItem value="First Class">First Class</MenuItem>
          </Select>
        </FormControl>

        {/* Submit */}
        <Box sx={{ flexGrow: 1, textAlign: 'right' }}>
          <Button variant="contained" color="primary" type="submit" sx={{ mt: 3 }}>
            Search
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}

export default FlightSearch;
