// src/components/FlightResults/RangeCalendar.js
import React, { useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Box, Button } from '@mui/material';

/**
 * Props:
 *  - onDateRangeChange: function that receives { startDate, endDate }
 *      e.g. onDateRangeChange({ startDate: ..., endDate: ... })
 */
function RangeCalendar({ onDateRangeChange }) {
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);

  const handleApply = () => {
    if (onDateRangeChange) {
      onDateRangeChange({
        startDate: departureDate,
        endDate: returnDate
      });
    }
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
      <DatePicker
        label="Departure"
        value={departureDate}
        onChange={(newValue) => setDepartureDate(newValue)}
      />
      <DatePicker
        label="Return"
        value={returnDate}
        onChange={(newValue) => setReturnDate(newValue)}
      />
      <Button variant="contained" onClick={handleApply}>
        Apply
      </Button>
    </Box>
  );
}

export default RangeCalendar;
