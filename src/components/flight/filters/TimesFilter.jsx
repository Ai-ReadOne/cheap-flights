import React, { useState } from 'react';
import { Popover, Box, Typography, Slider, Button, IconButton, Grid2 as Grid, Divider } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function TimesFilter({ open, anchorEl, onClose, timesFilter, setTimesFilter }) {
  const [localTimesFilter, setLocalTimesFilter] = useState(timesFilter);
  
  const handleOutboundChange = (_, newValue) => {
    setLocalTimesFilter({ ...localTimesFilter, outbound: newValue });
  };
  
  const handleReturnChange = (_, newValue) => {
    setLocalTimesFilter({ ...localTimesFilter, return: newValue });
  };
  
  const handleClear = () => {
    setLocalTimesFilter({ outbound: [0, 24], return: [0, 24] });
  };
  
  const handleClose = () => {
    setTimesFilter(localTimesFilter);
    onClose();
  };

  // Format time for display (0-24 to 12h format)
  const formatTime = (value) => {
    if (value === 0 || value === 24) return '12:00 AM';
    if (value === 12) return '12:00 PM';
    return value < 12 
      ? `${value}:00 AM` 
      : `${value - 12}:00 PM`;
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left',
      }}
      PaperProps={{
        sx: {
          borderRadius: '8px',
          maxWidth: '400px',
          width: '100%'
        }
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            Times
          </Typography>
          <IconButton 
            onClick={onClose}
            size="small"
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        <Box sx={{ mt: 3 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
            Departure time
          </Typography>
          
          <Box sx={{ px: 1, mb: 1 }}>
            <Slider
              value={localTimesFilter.outbound}
              onChange={handleOutboundChange}
              min={0}
              max={24}
              step={1}
              marks
              valueLabelDisplay="off"
              disableSwap
            />
          </Box>
          
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="caption">
                {formatTime(localTimesFilter.outbound[0])}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {formatTime(localTimesFilter.outbound[1])}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        <Divider sx={{ my: 3 }} />
        
        {/* Return section */}
        <Box sx={{ mt: 2 }}>
          <Typography variant="body2" sx={{ fontWeight: 'medium', mb: 2 }}>
            Arrival time
          </Typography>
          
          <Box sx={{ px: 1, mb: 1 }}>
            <Slider
              value={localTimesFilter.return}
              onChange={handleReturnChange}
              min={0}
              max={24}
              step={1}
              marks
              valueLabelDisplay="off"
              disableSwap
            />
          </Box>
          
          <Grid container justifyContent="space-between">
            <Grid item>
              <Typography variant="caption">
                {formatTime(localTimesFilter.return[0])}
              </Typography>
            </Grid>
            <Grid item>
              <Typography variant="caption">
                {formatTime(localTimesFilter.return[1])}
              </Typography>
            </Grid>
          </Grid>
        </Box>
        
        {/* Footer */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 3
        }}>
          <Button 
            onClick={handleClear}
            sx={{ 
              textTransform: 'none',
            }}
          >
            Clear
          </Button>
          <Box />
        </Box>
      </Box>
    </Popover>
  );
}

export default TimesFilter;