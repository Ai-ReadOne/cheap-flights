import React, { useState } from 'react';
import { Box, Typography, Button, Grid2 as Grid, useMediaQuery, useTheme } from '@mui/material';
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
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
        flexDirection: isSmallScreen ? 'column' : 'row',
        alignItems: isSmallScreen ? 'flex-start' : 'center',
        gap: isSmallScreen ? 1 : 2,
        py: 1,
        px: 1,
      }}
    >
        <Box sx={{ mb: isSmallScreen ? 1 : 0, mr: isSmallScreen ? 0 : 2 }}>
           <Typography variant="subtitle1">Filter:</Typography>
        </Box>
       <Grid container spacing={isSmallScreen ? 1 : 2} sx={{width: '100%'}}>
        {/* Price Filter */}
        <Grid  size={{xs: 12, sm: 'auto'}}>
            <Button
              id="price-button"
              onClick={(event) => handlePopoverOpen(event, 'price')}
              variant="outlined"
              fullWidth={isSmallScreen}
            >
              Price
            </Button>
            <PriceFilter
              open={popoverOpen === 'price'}
              anchorEl={getAnchorEl('price')}
              onClose={handlePopoverClose}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              max={
                filterStats?.stopPrices
                  ? Math.max(
                      ...Object.values(filterStats.stopPrices)
                        .filter((x) => x?.formattedPrice)
                        .map((x) =>
                          Number(x.formattedPrice.replace(/\D/g, ''))
                        )
                    )
                  : 2000
              }
            />
          </Grid>

          {/* Stops Filter */}
          <Grid  size={{xs: 12, sm: 'auto'}}>
            <Button
              id="stops-button"
              onClick={(event) => handlePopoverOpen(event, 'stops')}
              variant="outlined"
              fullWidth={isSmallScreen}
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
          </Grid>

          {/* Duration Filter */}
          <Grid  size={{xs: 12, sm: 'auto'}}>
            <Button
              id="duration-button"
              onClick={(event) => handlePopoverOpen(event, 'duration')}
              variant="outlined"
              fullWidth={isSmallScreen}
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
          </Grid>

          {/* Times Filter */}
          <Grid  size={{xs: 12, sm: 'auto'}}>
            <Button
              id="times-button"
              onClick={(event) => handlePopoverOpen(event, 'times')}
              variant="outlined"
              fullWidth={isSmallScreen}
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
          </Grid>

          {/* Airlines Filter */}
          <Grid  size={{xs: 12, sm: 'auto'}}>
            <Button
              id="airlines-button"
              onClick={(event) => handlePopoverOpen(event, 'airlines')}
              variant="outlined"
              fullWidth={isSmallScreen}
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
          </Grid>
          </Grid>
      {/* Add more filter sections (Time, Bags, Emissions) as needed */}
    </Box>
  );
};

export default FlightFilterBar;
