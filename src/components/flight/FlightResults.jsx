// src/components/flight/FlightResults.jsx
import React, { useState, useMemo, useEffect } from 'react';
import { Box, Typography, Container, Grid2 as Grid } from '@mui/material';
import FlightCard from './FlightCard';
import FlightFilterBar from './FlightFilterBar';
import FlightSearch from './FlightSearch';
import FlightSortBar from './FlightSortBar';

function FlightResults({ flightsData, initialSearchParams }) {
  // State for filters
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [timesFilter, setTimesFilter] = useState({
    outbound: [0, 24],
    return: [0, 24],
  });
  const [durationFilter, setDurationFilter] = useState([0, 2880]);
  const [airlinesFilter, setAirlinesFilter] = useState([]);
  const [stopsFilter, setStopsFilter] = useState('Any');
  const [sort, setSort] = useState('best')
  const [searchData, setSearchData] = useState(flightsData);

  // Check if flightData and data exist before accessing itineraries
  const itineraries = searchData?.itineraries || [];
  const filterStats = searchData?.filterStats || {};
  // Filter logic
  const filteredItineraries = useMemo(() => {
    return itineraries.filter((flight) => {
      const flightPrice = flight.price?.raw ?? 0;
      if (flightPrice < priceRange[0] || flightPrice > priceRange[1]) {
        return false;
      }

      // Sum up stops & durations across all legs
      let totalStops = 0;
      let totalDuration = 0;
      let hasValidTimes = true;

      flight.legs.forEach((leg, index) => {
        totalStops += leg.stopCount || 0;

        // Add duration
        totalDuration += leg.durationInMinutes || 0;

        // If we treat the first leg as "outbound" and the second leg as "inbound":
        //   - timesFilter.outbound => apply to leg 0
        //   - timesFilter.inbound  => apply to leg 1
        // If there’s only one leg (one-way), treat it as outbound.
        const departureTime = new Date(leg.departure);
        const hour = departureTime.getHours(); // 0–23
        if (index === 0) {
          // Outbound
          const [minOut, maxOut] = timesFilter.outbound;
          if (hour < minOut || hour > maxOut) {
            hasValidTimes = false;
          }
        } else if (index === 1) {
          // Inbound
          const [minIn, maxIn] = timesFilter.return;
          if (hour < minIn || hour > maxIn) {
            hasValidTimes = false;
          }
        }
      });

      // If times don’t match, exclude this flight
      if (!hasValidTimes) return false;

      // -- (C) STOPS FILTER --
      if (stopsFilter === 'Nonstop only' && totalStops !== 0) {
        return false;
      }

      // -- (D) DURATION FILTER --
      // Compare total flight duration in minutes
      if (
        totalDuration < durationFilter[0] ||
        totalDuration > durationFilter[1]
      ) {
        return false;
      }

      // -- (E) AIRLINES FILTER --
      // Build a set of all marketing carriers in this flight
      const flightAirlines = new Set();
      flight.legs.forEach((leg) => {
        if (leg.carriers && leg.carriers.marketing) {
          leg.carriers.marketing.forEach((carrier) => {
            flightAirlines.add(carrier.name);
          });
        }
      });

      // If user selected specific airlines, flight must match at least one
      if (airlinesFilter.length > 0) {
        let found = false;
        for (const airline of airlinesFilter) {
          if (flightAirlines.has(airline)) {
            found = true;
            break;
          }
        }
        if (!found) return false;
      }

      return true;
    });
  }, [
    itineraries,
    priceRange,
    stopsFilter,
    durationFilter,
    airlinesFilter,
    timesFilter,
  ]);

   const sortedItineraries = useMemo(() => {
    // Implement sorting logic based on the `sort` state
    let sorted = [...filteredItineraries]; // Create a copy to avoid modifying the original array

    if (sort === 'cheapest') {
      sorted.sort((a, b) => a.price.raw - b.price.raw);
    } else if (sort === 'fastest') {
      sorted.sort(
        (a, b) =>
          a.legs.reduce((acc, leg) => acc + leg.durationInMinutes, 0) -
          b.legs.reduce((acc, leg) => acc + leg.durationInMinutes, 0)
      );
    }

    return sorted;
  }, [filteredItineraries, sort]);

  // Map the filtered flights to the display
  const flightCards = sortedItineraries.map((flight) => (
    <Grid item xs={12} key={flight.id}>
      <FlightCard flight={flight} />
    </Grid>
  ));

  const handleSearch = (data) => {
    setSearchData(data);
  };

  // update sort parameters when a new search is performed
  useEffect(() => {
     setSort('best');
  }, [searchData])

  return (
    // Use Container for central alignment and padding
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 4,
      }}
    >
      <Box sx={{ width: '100%', maxWidth: '1000px' }}>
        <Typography variant="h6" sx={{ mb: 2, textAlign: 'center' }}>
          Flight Results
        </Typography>

        {/* Flight Search (with initial parameters) */}
        <FlightSearch
          onSearch={handleSearch}
          initialState={initialSearchParams}
        />

        {/* Filter Bar */}
        <Box sx={{ mb: 2, width: '100%' }}>
          <FlightFilterBar
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            timesFilter={timesFilter}
            setTimesFilter={setTimesFilter}
            durationFilter={durationFilter}
            setDurationFilter={setDurationFilter}
            airlinesFilter={airlinesFilter}
            setAirlinesFilter={setAirlinesFilter}
            stopsFilter={stopsFilter}
            setStopsFilter={setStopsFilter}
            filterStats={filterStats}
          />
        </Box>

        {/* Display filtered results */}
        <Box sx={{ mt: 2, width: '100%' }}>
          <Grid container spacing={2}>
            {flightCards}
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default FlightResults;
