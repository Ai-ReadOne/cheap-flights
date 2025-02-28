import React, { useState, useEffect } from 'react';
import {
  Popover,
  Box,
  Typography,
  TextField,
  FormControlLabel,
  Checkbox,
  Button,
  Switch,
  Divider
} from '@mui/material';

/**
 * Props:
 *  - open: boolean (whether the popover is open)
 *  - anchorEl: element (the anchor for the popover)
 *  - onClose: function to close the popover
 *  - airlinesFilter: array of selected airline IDs or names
 *  - setAirlinesFilter: function to update the airlinesFilter state
 *  - availableAirlines: array of all possible airlines (optional)
 *    e.g. [
 *      { id: 'AA', name: 'American Airlines' },
 *      { id: 'DL', name: 'Delta' },
 *      ...
 *    ]
 *
 * Usage:
 *   <AirlinesFilter
 *     open={openPopover === 'airlines'}
 *     anchorEl={anchorEl}
 *     onClose={handleClose}
 *     airlinesFilter={airlinesFilter}
 *     setAirlinesFilter={setAirlinesFilter}
 *     availableAirlines={airlinesData}
 *   />
 */

function AirlinesFilter({
  open,
  anchorEl,
  onClose,
  airlinesFilter,
  setAirlinesFilter,
  availableAirlines = []
}) {
  // Local search query
  const [searchQuery, setSearchQuery] = useState('');

  // Filter the list of airlines based on the search query
  const filteredAirlines = availableAirlines.filter((airline) =>
    airline.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Determine if "select all airlines" is active
  // We'll say it's "true" if the user has selected *all* currently filtered airlines
  const allVisibleIds = filteredAirlines.map((a) => a.id);
  const isAllSelected =
    allVisibleIds.length > 0 &&
    allVisibleIds.every((id) => airlinesFilter.includes(id));

  // Toggle "select all" for the *currently visible* airlines
  const handleToggleAll = () => {
    if (isAllSelected) {
      // If already all selected, unselect them
      const updated = airlinesFilter.filter((id) => !allVisibleIds.includes(id));
      setAirlinesFilter(updated);
    } else {
      // Otherwise, add them
      const combined = new Set([...airlinesFilter, ...allVisibleIds]);
      setAirlinesFilter(Array.from(combined));
    }
  };

  // Toggle a single airline
  const handleToggleAirline = (airlineId) => {
    if (airlinesFilter.includes(airlineId)) {
      // Remove it
      setAirlinesFilter(airlinesFilter.filter((id) => id !== airlineId));
    } else {
      // Add it
      setAirlinesFilter([...airlinesFilter, airlineId]);
    }
  };

  // Reset search when popover closes
  useEffect(() => {
    if (!open) {
      setSearchQuery('');
    }
  }, [open]);

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
    >
      <Box sx={{ p: 2, width: 320, maxHeight: 450, overflowY: 'auto' }}>
        <Typography variant="subtitle1" sx={{ mb: 1 }}>
          Airlines
        </Typography>

        {/* "Select all airlines" Switch */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
          <Switch
            checked={isAllSelected}
            onChange={handleToggleAll}
            inputProps={{ 'aria-label': 'Select all airlines' }}
          />
          <Typography variant="body2">
            Select all airlines
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Search Field */}
        <TextField
          fullWidth
          size="small"
          placeholder="Search airlines..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* List of filtered airlines */}
        {filteredAirlines.map((airline) => (
          <FormControlLabel
            key={airline.id}
            control={
              <Checkbox
                checked={airlinesFilter.includes(airline.id)}
                onChange={() => handleToggleAirline(airline.id)}
              />
            }
            label={airline.name}
            sx={{ display: 'block', ml: 0 }}
          />
        ))}

        {/* Close Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
          <Button onClick={onClose}>Close</Button>
        </Box>
      </Box>
    </Popover>
  );
}

export default AirlinesFilter;
