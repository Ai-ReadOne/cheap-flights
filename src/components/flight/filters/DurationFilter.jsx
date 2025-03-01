import React, { useState } from 'react';
import {
  Popover,
  Box,
  Typography,
  Slider,
  Button,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function DurationFilter({ open, anchorEl, onClose, duration, setDuration }) {
  // Local state to track changes before applying
  const [localDuration, setLocalDuration] = useState(duration);

  // Maximum flight duration in minutes (for the slider)
  const MAX_DURATION = 2880; // 48 hours in minutes
  const MIN_DURATION = 60; // 1 hour in minutes

  const handleDurationChange = (_, newValue) => {
    setLocalDuration(newValue);
  };

  const handleClear = () => {
    setLocalDuration([MIN_DURATION, MAX_DURATION]);
  };

  const handleClose = () => {
    setDuration(localDuration);
    onClose();
  };

  // Format duration display
  const formatDuration = (minutes) => {
    if (minutes[0] === MIN_DURATION && minutes[1] === MAX_DURATION) return 'Any';

    const hoursStart = Math.floor(minutes[0] / 60);
    const minsStart = minutes[0] % 60;
    const hoursEnd = Math.floor(minutes[1] / 60);
    const minsEnd = minutes[1] % 60;

    const start =
      hoursStart === 0 ? `${minsStart}m` : `${hoursStart}h ${minsStart}m`;
    const end = hoursEnd === 0 ? `${minsEnd}m` : `${hoursEnd}h ${minsEnd}m`;

    return `${start} - ${end}`;
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
          width: '100%',
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        {/* Header */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: 'medium' }}>
            Duration
          </Typography>
          <IconButton onClick={onClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Flight duration section */}
        <Box sx={{ mt: 1 }}>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Flight duration · {formatDuration(localDuration)}
          </Typography>

          <Box sx={{ px: 1, mb: 3 }}>
            <Slider
              value={localDuration}
              onChange={handleDurationChange}
              min={MIN_DURATION} // Minimum 1 hour
              max={MAX_DURATION}
              step={15} // 15-minute increments
              valueLabelDisplay="auto"
              disableSwap
              sx={{
                '& .MuiSlider-thumb': {
                  '&:hover, &.Mui-focusVisible': {
                    boxShadow: 'none',
                  },
                },
              }}
            />
          </Box>
        </Box>

        {/* Footer */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            mt: 4,
          }}
        >
          <Button
            onClick={handleClear}
            sx={{
              textTransform: 'none',
            }}
          >
            Clear
          </Button>
        </Box>
      </Box>
    </Popover>
  );
}

export default DurationFilter;
