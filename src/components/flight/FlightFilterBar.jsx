// src/components/flight/FlightFilterBar.jsx
import React, { useState } from 'react';
import { Box, Typography, Button } from '@mui/material';
import TimesFilter from './filters/TimesFilter';
import AirlinesFilter from './filters/AirlinesFilter';
import PriceFilter from './filters/PriceFilter';
import DurationFilter from './filters/DurationFilter';
import StopsFilter from './filters/StopsFilter';

const FlightFilterBar = ({
  priceRange,
  setPriceRange,
  timesFilter,
  setTimesFilter,
  durationFilter,
  setDurationFilter,
  airlinesFilter,
  setAirlinesFilter,
  stopsFilter,
  setStopsFilter,
  filterStats,
}) => {
  const [popoverOpen, setPopoverOpen] = useState(null);

  const handlePopoverOpen = (event, filterName) => {
    setPopoverOpen(filterName);
  };

  const handlePopoverClose = () => {
    setPopoverOpen(null);
  };

  const airlines = filterStats.carriers || [];

  // Helper function to get the anchor element for the popover
  const getAnchorEl = (filterName) => {
    return document.getElementById(filterName + '-button');
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
    }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="subtitle1">Filter:</Typography>
        </Box>
      {/* Price Filter */}
      <Box sx={{ mb: 2 }}>
        <Button
          id="price-button"
          onClick={(event) => handlePopoverOpen(event, 'price')}
          variant="outlined"
        >
          Price
        </Button>
        <PriceFilter
          open={popoverOpen === 'price'}
          anchorEl={getAnchorEl('price')}
          onClose={handlePopoverClose}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          max={filterStats?.stopPrices ? Math.max(...Object.values(filterStats.stopPrices).filter(x => x?.formattedPrice).map(x => Number(x.formattedPrice.replace(/\D/g, '')))) : 2000}
        />
      </Box>

      {/* Stops Filter */}
      <Box sx={{ mb: 2 }}>
        <Button
          id="stops-button"
          onClick={(event) => handlePopoverOpen(event, 'stops')}
          variant="outlined"
        >
          Stops
        </Button>
        <StopsFilter
          open={popoverOpen === 'stops'}
          anchorEl={getAnchorEl('stops')}
          onClose={handlePopoverClose}
          stopsFilter={stopsFilter}
          setStopsFilter={setStopsFilter}
        />
      </Box>

      {/* Duration Filter */}
      <Box sx={{ mb: 2 }}>
        <Button
          id="duration-button"
          onClick={(event) => handlePopoverOpen(event, 'duration')}
          variant="outlined"
        >
          Duration
        </Button>
        <DurationFilter
          open={popoverOpen === 'duration'}
          anchorEl={getAnchorEl('duration')}
          onClose={handlePopoverClose}
          duration={durationFilter}
          setDuration={setDurationFilter}
        />
      </Box>

      {/* Times Filter */}
      <Box sx={{ mb: 2 }}>
        <Button
          id="times-button"
          onClick={(event) => handlePopoverOpen(event, 'times')}
          variant="outlined"
        >
          Times
        </Button>
        <TimesFilter
          open={popoverOpen === 'times'}
          anchorEl={getAnchorEl('times')}
          onClose={handlePopoverClose}
          timesFilter={timesFilter}
          setTimesFilter={setTimesFilter}
        />
      </Box>

      {/* Airlines Filter */}
      <Box sx={{ mb: 2 }}>
        <Button
          id="airlines-button"
          onClick={(event) => handlePopoverOpen(event, 'airlines')}
          variant="outlined"
        >
          Airlines
        </Button>
        <AirlinesFilter
          open={popoverOpen === 'airlines'}
          anchorEl={getAnchorEl('airlines')}
          onClose={handlePopoverClose}
          airlinesFilter={airlinesFilter}
          setAirlinesFilter={setAirlinesFilter}
          availableAirlines={airlines}
        />
      </Box>

      {/* Add more filter sections (Time, Bags, Emissions) as needed */}
    </Box>
  );
};

export default FlightFilterBar;
