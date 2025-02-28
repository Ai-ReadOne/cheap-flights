import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Switch
} from '@mui/material';
import { Menu as MenuIcon, Close as CloseIcon } from '@mui/icons-material';
import styled from 'styled-components';

const Brand = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: inherit;
  text-decoration: none;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

function ResponsiveNavbar({ darkMode, handleToggleDarkMode }) {
  const [open, setOpen] = useState(false);

  const handleToggleDrawer = () => {
    setOpen((prev) => !prev);
  };

  return (
    <>
      <AppBar position="static" color="default" elevation={0}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Brand>
              <Typography variant="h6" component="div">
                Cheap Flights
              </Typography>
            </Brand>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, alignItems: 'center' }}>
            <Typography
              variant="body1"
              component="a"
              href="#explore"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Explore
            </Typography>
            <Typography
              variant="body1"
              component="a"
              href="/"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Flights
            </Typography>
            <Typography
              variant="body1"
              component="a"
              href="#hotels"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Hotels
            </Typography>
            <Typography
              variant="body1"
              component="a"
              href="#vacation-rentals"
              sx={{ textDecoration: 'none', color: 'inherit' }}
            >
              Vacation Rentals
            </Typography>

            <Switch
              checked={darkMode}
              onChange={handleToggleDarkMode}
              color="default"
            />
          </Box>

          <IconButton
            onClick={handleToggleDrawer}
            sx={{ display: { xs: 'flex', md: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer anchor="right" open={open} onClose={handleToggleDrawer}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            gap: 1,
            p: 2
          }}
        >
          <IconButton onClick={handleToggleDrawer} sx={{ alignSelf: 'flex-end' }}>
            <CloseIcon />
          </IconButton>

          <List>
            <ListItem button component="a" href="#explore" onClick={handleToggleDrawer}>
              <ListItemText primary="Explore" />
            </ListItem>
            <ListItem button component="a" href="#flights" onClick={handleToggleDrawer}>
              <ListItemText primary="Flights" />
            </ListItem>
            <ListItem button component="a" href="#hotels" onClick={handleToggleDrawer}>
              <ListItemText primary="Hotels" />
            </ListItem>
            <ListItem button component="a" href="#vacation-rentals" onClick={handleToggleDrawer}>
              <ListItemText primary="Vacation Rentals" />
            </ListItem>

            <ListItem>
              <ListItemText primary="Dark Mode" />
              <Switch
                checked={darkMode}
                onChange={handleToggleDarkMode}
                color="default"
              />
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default ResponsiveNavbar;
