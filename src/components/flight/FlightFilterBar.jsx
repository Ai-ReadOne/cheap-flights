import React from 'react';
import { Box, Chip, Typography, Stack } from '@mui/material';

function FlightFilterBar({
  selectedStops,
  setSelectedStops,
  selectedAirlines,
  setSelectedAirlines,
  selectedTimes,
  setSelectedTimes
}) {
  // Example filter options
  const stopsOptions = ['Nonstop', '1 stop', '2+ stops'];
  const airlineOptions = ['Delta', 'United', 'Air France', 'Lufthansa'];
  const timeOptions = ['Morning', 'Afternoon', 'Evening', 'Overnight'];

  const handleToggleStops = (option) => {
    if (selectedStops.includes(option)) {
      setSelectedStops(selectedStops.filter((s) => s !== option));
    } else {
      setSelectedStops([...selectedStops, option]);
    }
  };

  const handleToggleAirlines = (option) => {
    if (selectedAirlines.includes(option)) {
      setSelectedAirlines(selectedAirlines.filter((a) => a !== option));
    } else {
      setSelectedAirlines([...selectedAirlines, option]);
    }
  };

  const handleToggleTimes = (option) => {
    if (selectedTimes.includes(option)) {
      setSelectedTimes(selectedTimes.filter((t) => t !== option));
    } else {
      setSelectedTimes([...selectedTimes, option]);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 2,
        alignItems: 'center',
        py: 1,
        px: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="subtitle1" sx={{ mr: 2 }}>
        Filters:
      </Typography>

      {/* Stops */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2">Stops:</Typography>
        {stopsOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            variant={selectedStops.includes(option) ? 'filled' : 'outlined'}
            onClick={() => handleToggleStops(option)}
          />
        ))}
      </Stack>

      {/* Airlines */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2">Airlines:</Typography>
        {airlineOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            variant={selectedAirlines.includes(option) ? 'filled' : 'outlined'}
            onClick={() => handleToggleAirlines(option)}
          />
        ))}
      </Stack>

      {/* Times */}
      <Stack direction="row" spacing={1} alignItems="center">
        <Typography variant="body2">Times:</Typography>
        {timeOptions.map((option) => (
          <Chip
            key={option}
            label={option}
            variant={selectedTimes.includes(option) ? 'filled' : 'outlined'}
            onClick={() => handleToggleTimes(option)}
          />
        ))}
      </Stack>

      {/* You could add more filters: Emissions, Duration, etc. */}
    </Box>
  );
}

export default FlightFilterBar;
