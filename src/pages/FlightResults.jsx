import React, { useState, useMemo, useEffect } from 'react';
import { Box, Card, CardContent, Typography, Container, Grid2 as Grid, Button } from '@mui/material';
import FlightCard from '../components/flight/FlightCard';
import FlightFilterBar from '../components/flight/FlightFilterBar';
import FlightSearch from '../components/flight/FlightSearch';
import FlightSortBar from '../components/flight/FlightSortBar';

function FlightResultsPage({ flightsData, initialSearchParams }) {
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
  const [visibleFlights, setVisibleFlights] = useState(10);

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

        totalDuration += leg.durationInMinutes || 0;

        // treat the first leg as "outbound" and the second leg as "inbound":
        //   - timesFilter.outbound => apply to leg 0
        //   - timesFilter.inbound  => apply to leg 1
        // If there’s only one leg (one-way), treat it as outbound.
        const departureTime = new Date(leg.departure);
        const hour = departureTime.getHours();
        if (index === 0) {
          // Outbound
          const [minOut, maxOut] = timesFilter.outbound;
          if (hour < minOut || hour > maxOut) {
            hasValidTimes = false;
          }
        } else if (index === 1) {
          const [minIn, maxIn] = timesFilter.return;
          if (hour < minIn || hour > maxIn) {
            hasValidTimes = false;
          }
        }
      });

      if (!hasValidTimes) return false;

      if (stopsFilter === 'Nonstop only' && totalStops !== 0) {
        return false;
      }

      if (
        totalDuration < durationFilter[0] ||
        totalDuration > durationFilter[1]
      ) {
        return false;
      }

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
    // Implement sorting logic based on the 'sort' state
    let sorted = [...filteredItineraries]; 

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

  // Map the filtered flights to the display cards
  const visibleItineraries = sortedItineraries.slice(0, visibleFlights); 
  const flightCards = visibleItineraries.map((flight) => (
    <Grid  size={{xs:12}}  key={flight.id}>
      <FlightCard flight={flight} />
    </Grid>
  ));


  const handleShowMore = () => {
      setVisibleFlights((prevVisibleFlights) => prevVisibleFlights + 10); 
  };

  const handleSearch = (data) => {
    setSearchData(data);
    setVisibleFlights(10);
  };

  useEffect(() => {
     setSort('best');
     setVisibleFlights(10);
  }, [searchData])

  return (
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
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 500, justifyContent: 'center' }}>
                Find Cheap Flights
        </Typography>

        {/* Flight Search (with initial parameters) */}
        <FlightSearch
          onSearch={handleSearch}
          initialState={initialSearchParams}
        />

        {/* Filter Bar */}
        <Box sx={{ mb: 2, width: '100%' }}>
        <Grid container spacing={2}>
          <Grid  size={{xs:12, sm:7}}>
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
          </Grid>
          <Grid  size={{xs:12, sm:5}}>
            <FlightSortBar selectedSort={sort} setSelectedSort={setSort} />
          </Grid>
          </Grid>
        </Box>

        {/* Display filtered results */}
        <Box sx={{ mt: 2, width: '100%' }}>
          <Grid container spacing={2}>
            {flightCards}
          </Grid>
          {/* Show More Button */}
          {visibleFlights < sortedItineraries.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
              <Button onClick={handleShowMore} variant="outlined">
                Show More
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Container>
  );
}

export default FlightResultsPage;
