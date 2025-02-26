import React from 'react';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';

function FlightSortBar({ selectedSort, setSelectedSort }) {
  const handleSortChange = (event, newValue) => {
    if (newValue) {
      setSelectedSort(newValue);
    }
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: 2,
        py: 1,
        px: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Typography variant="subtitle1">Sort by:</Typography>
      <ToggleButtonGroup
        value={selectedSort}
        exclusive
        onChange={handleSortChange}
        aria-label="sort flights"
      >
        <ToggleButton value="best" aria-label="best flights">
          Best
        </ToggleButton>
        <ToggleButton value="cheapest" aria-label="cheapest flights">
          Cheapest
        </ToggleButton>
        <ToggleButton value="fastest" aria-label="fastest flights">
          Fastest
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
}

export default FlightSortBar;
