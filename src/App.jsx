// src/App.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import ResponsiveNavbar from './components/ResponsiveNavbar';
import FlightSearch from './components/flight/FlightSearch';
import FlightResults from './components/flight/FlightResults';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [searchData, setSearchData] = useState(null);
  const [selectedOrigin, setSelectedOrigin] = useState(null);
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [departureDate, setDepartureDate] = useState(null);
  const [returnDate, setReturnDate] = useState(null);
  const [passengers, setPassengers] = useState(1);
  const [cabinClass, setCabinClass] = useState('economy');

  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  });

  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  const handleSearch = (data) => {
    setSelectedOrigin(data.origin);
    setSelectedDestination(data.destination);
    setDepartureDate(data.date)
    setReturnDate(data.returnDate);
    setPassengers(data.adults);
    setCabinClass(data.cabinClass);
    setSearchData(data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
          <ResponsiveNavbar
            darkMode={darkMode}
            handleToggleDarkMode={handleToggleDarkMode}
          />

          <Routes>
            <Route
              path="/"
              element={<FlightSearch onSearch={handleSearch} />}
            />
            <Route
              path="/results"
              element={<FlightResults 
                flightsData={searchData}
                initialState={{
                  selectedOrigin: selectedOrigin,
                  selectedDestination: selectedDestination,
                  departure: departureDate,
                  return: returnDate,
                  passengers: passengers,
                  cabinClass: cabinClass
                }} />}
            />
          </Routes>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
