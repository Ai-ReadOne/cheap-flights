import React, { useState } from 'react';
import { Popover, Box, Typography, Slider, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function PriceFilter({ open, anchorEl, onClose, priceRange, setPriceRange }) {
  const [localPriceRange, setLocalPriceRange] = useState(priceRange);
  
  const handleChange = (_, newValue) => {
    setLocalPriceRange(newValue);
  };
  
  const handleClear = () => {
    setLocalPriceRange([0, 3000]);
  };
  
  const handleClose = () => {
    setPriceRange(localPriceRange);
    onClose();
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
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
          maxWidth: '400px',
          width: '100%'
        }
      }}
    >
      <Box sx={{ 
        p: 2, 
        display: 'flex', 
        flexDirection: 'column'
      }}>
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 2 
        }}>
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            Price
          </Typography>
          <IconButton 
            onClick={onClose}
            size="small"
            sx={{ color: 'white' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        
        {/* All prices option */}
        <Typography 
          variant="body2" 
          sx={{ 
            mb: 2,
            color: '#BDC1C6',
            '&:hover': {
              color: 'white',
              cursor: 'pointer'
            }
          }}
          onClick={handleClear}
        >
          All prices
        </Typography>
        
        {/* Slider */}
        <Box sx={{ px: 1, py: 2 }}>
          <Slider
            value={localPriceRange}
            onChange={handleChange}
            valueLabelDisplay="off"
            min={0}
            max={3000}
            sx={{
              color: '#8AB4F8',
              '& .MuiSlider-rail': {
                backgroundColor: '#3C4043',
                height: 4
              },
              '& .MuiSlider-track': {
                height: 4
              },
              '& .MuiSlider-thumb': {
                width: 16,
                height: 16,
                backgroundColor: 'white',
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0px 0px 0px 8px rgba(138, 180, 248, 0.16)'
                }
              }
            }}
          />
        </Box>
        
        {/* Footer */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          mt: 2 
        }}>
          <Button 
            onClick={handleClear}
            sx={{ 
              color: '#8AB4F8',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: 'rgba(138, 180, 248, 0.08)'
              }
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

export default PriceFilter;