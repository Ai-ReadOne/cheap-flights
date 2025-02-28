import React, { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid2 as Grid,
  Button,
  TextField,
  Autocomplete,
  Paper,
  InputAdornment,
  Divider,
  Popover,
  MenuItem,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers';
import FlightTakeoffIcon from '@mui/icons-material/FlightTakeoff';
import FlightLandIcon from '@mui/icons-material/FlightLand';
import PersonIcon from '@mui/icons-material/Person';
import EventIcon from '@mui/icons-material/Event';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import { fetchAirports } from '../../services/airportService';
import { searchFlights } from '../../services/searchFlights';

const defaultInitialState = {
  selectedOrigin: null,
  selectedDestination: null,
  departure: null,
  return: null,
  passengers: 1,
  cabinClass: 'economy',
};

function FlightSearch({ onSearch, initialState = defaultInitialState }) {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
    
  // ---------------------
  // State Variables
  // ---------------------
    
  const [passengers, setPassengers] = useState(null);
  const [cabinClass, setCabinClass] = useState(null);
    
  // Autocomplete
  const [originQuery, setOriginQuery] = useState('');
  const [originOptions, setOriginOptions] = useState([]);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
    
  const [destinationQuery, setDestinationQuery] = useState('');
  const [destinationOptions, setDestinationOptions] = useState([]);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [dates, setDates] = useState({
    departure: null,
    return: null,
  });

  // ---------------------
  // Debounce Setup
  // ---------------------
  const debouncedFetchOrigin = useCallback(
    debounce(async (q) => {
      const airports = await fetchAirports(q);
      setOriginOptions(airports);
    }, 500),
    []
  );

  const debouncedFetchDestination = useCallback(
    debounce(async (q) => {
      const airports = await fetchAirports(q);
      setDestinationOptions(airports);
    }, 500),
    []
  );

  useEffect(() => {
    if (originQuery) {
      debouncedFetchOrigin(originQuery);
    } else {
      setOriginOptions([]);
    }
  }, [originQuery, debouncedFetchOrigin]);

  useEffect(() => {
    if (destinationQuery) {
      debouncedFetchDestination(destinationQuery);
    } else {
      setDestinationOptions([]);
    }
  }, [destinationQuery, debouncedFetchDestination]);
    
    
  // Set initial states based on props
    useEffect(() => {
        setSelectedOrigin(initialState.selectedOrigin || null);
        setSelectedDestination(initialState.selectedDestination || null);
        setDates({
            departure: initialState.departure || null,
            return: initialState.return || null,
        });
        setPassengers(initialState.passengers || defaultInitialState.passengers);
        setCabinClass(initialState.cabinClass || defaultInitialState.cabinClass);
    }, [initialState]);

  // Passenger & Class Popover
  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  // Handles form submit
  const handleSearch = async (e) => {
    e.preventDefault();

    // Validate that user selected an origin and destination
    if (!selectedOrigin || !selectedDestination) {
      alert('Please select both origin and destination airports.');
      return;
    }

    try {
        const params = {
            originSkyId: selectedOrigin.skyId,
            originEntityId: selectedOrigin.entityId,
            destinationSkyId: selectedDestination.skyId,
            destinationEntityId: selectedDestination.entityId,
            date: dates.departure ? new Date(dates.departure).toISOString().slice(0, 10) : null,
            returnDate: dates.return ? new Date(dates.return).toISOString().slice(0, 10) : null,
            cabinClass,
            adults: passengers,
            sortBy: 'best',
          };

          if (!params.date) delete params.date;
          if (!params.returnDate) delete params.returnDate;

      const response = await searchFlights(params);
      if (onSearch) {
        onSearch(response);
      }
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Failed to fetch flight data');
    }
  };

  return (
    <Paper elevation={0} sx={{ p: 3, borderRadius: 4, boxShadow: 3 }}>
      <Box component="form" onSubmit={handleSearch}>
        <Grid container spacing={3}>
          {/* Origin */}
          <Grid  size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              options={originOptions}
              getOptionLabel={(option) => option.localizedName + ' ' + option.skyId || ''}
              value={selectedOrigin}
              onChange={(event, newValue) => setSelectedOrigin(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="From"
                  variant="filled"
                  fullWidth
                  input={{
                    ...params.Input,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightTakeoffIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setOriginQuery(e.target.value)}
                />
              )}
            />
          </Grid>

          {/* Destination */}
          <Grid  size={{ xs: 12, sm: 6 }}>
            <Autocomplete
              options={destinationOptions}
              getOptionLabel={(option) => option.localizedName + ' ' + option.skyId || ''}
              value={selectedDestination}
              onChange={(event, newValue) => setSelectedDestination(newValue)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="To"
                  variant="filled"
                  fullWidth
                  input={{
                    ...params.Input,
                    startAdornment: (
                      <InputAdornment position="start">
                        <FlightLandIcon color="action" />
                      </InputAdornment>
                    ),
                  }}
                  onChange={(e) => setDestinationQuery(e.target.value)}
                />
              )}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Dates */}
          <Grid  size={{ xs: 6, sm: 4 }}>
            <DatePicker
              label="Departure"
              value={dates.departure}
              onChange={(newValue) => setDates({ ...dates, departure: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  fullWidth
                  Input={{
                    ...params.InputProps,
                    startAdornment: (
                      <InputAdornment position="start">
                        <EventIcon color="action" />
                      </InputAdornment>
                    )
                  }}
                />
              )}
            />
          </Grid>

          <Grid  size={{ xs: 6, sm: 4 }}>
            <DatePicker
              label="Return"
              value={dates.return}
              onChange={(newValue) => setDates({ ...dates, return: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  fullWidth
                   Input={{
                    ...params.InputProps
                  }}
                />
              )}
            />
          </Grid>

          {/* Passengers & Class */}
          <Grid  size={{ xs: 12, sm: 4 }}>
            <Button
              fullWidth
              variant="filled"
              onClick={handlePopoverOpen}
              startIcon={<PersonIcon />}
              endIcon={<ArrowDropDownIcon />}
              sx={{
                height: 56,
                justifyContent: 'space-between',
                bgcolor: 'action.selected',
                '&:hover': { bgcolor: 'action.hover' },
              }}
            >
              {`${passengers} ${passengers > 1 ? 'Travelers' : 'Traveler'}`}
            </Button>

            <Popover
              open={Boolean(anchorEl)}
              anchorEl={anchorEl}
              onClose={handlePopoverClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
            >
              <Box sx={{ p: 2, minWidth: 300 }}>
                <Typography variant="subtitle1" gutterBottom>
                  Travelers
                </Typography>
                <TextField
                  type="number"
                  value={passengers}
                  onChange={(e) => setPassengers(e.target.value)}
                  fullWidth
                />

                <Divider sx={{ my: 2 }} />

                <Typography variant="subtitle1" gutterBottom>
                  Cabin Class
                </Typography>
                <TextField
                  select
                  fullWidth
                  value={cabinClass}
                  onChange={(e) => setCabinClass(e.target.value)}
                >
                  {['economy', 'premium economy', 'business', 'first'].map((option) => (
                    <MenuItem key={option} value={option}>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Popover>
          </Grid>
        </Grid>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {/* Search Button */}
          <Grid  xs={12} md={2}>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              sx={{ height: 56, fontSize: '1rem' }}
            >
              Search flights
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
}

export default FlightSearch;
