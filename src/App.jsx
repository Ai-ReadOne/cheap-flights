// src/App.js
import React, { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';

import ResponsiveNavbar from './components/nav';
import FlightSearch from './components/flight/FlightSearch';
import FlightResults from './components/flight/FlightResults';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [flights, setFlights] = useState([]);

  // Material UI theme that toggles between light and dark
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light'
    }
  });

  // Toggle dark mode
  const handleToggleDarkMode = () => {
    setDarkMode((prev) => !prev);
  };

  // Called when the user submits the flight search form
  // (Fetch flight data from your API, then store it in state.)
  const handleSearch = async (searchParams, navigate) => {
    // 1) Call your API with searchParams
    //    e.g., const data = await fetchFlights(searchParams);
    // 2) Update the flights state
    //    setFlights(data);
    // 3) Navigate to the results page
    navigate('/results');
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        {/* Top Navbar with dark mode toggle */}
        <ResponsiveNavbar
          darkMode={darkMode}
          handleToggleDarkMode={handleToggleDarkMode}
        />

        {/* Define Routes for Search and Results */}
        <Routes>
          {/* FlightSearch Page ("/") */}
          <Route
            path="/"
            element={<FlightSearch onSearch={handleSearch} />}
          />

          {/* FlightResults Page ("/results") */}
          <Route
            path="/results"
            element={<FlightResults flights={flights} />}
          />
        </Routes>
    </ThemeProvider>
  );
}

export default App;
