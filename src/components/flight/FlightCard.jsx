import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid2 as Grid,
  Avatar,
  Stack,
  Box
} from '@mui/material';

const FlightCard = ({ flight }) => {
  const { legs, price } = flight;

  const formatTime = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (time) => {
    const date = new Date(time);
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const formatDuration = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Price Section */}
          <Grid item size={{ xs: 12, sm: 2 }} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', pr: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {price.formatted}
            </Typography>
            <Typography variant="caption">
              {flight.tags?.join(', ')}
            </Typography>
          </Grid>

          {/* Flight Details Section */}
          <Grid item size={{ xs: 12, sm: 8 }} sx={{pl: 2}}>
            {legs.map((leg) => (
              <Grid key={leg.id} container spacing={2} alignItems="center">
                {/* Departure */}
                <Grid item size={{ xs: 12, sm: 3 }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {leg.origin.displayCode}
                  </Typography>
                  <Typography variant="body2">
                    {formatTime(leg.departure)}
                  </Typography>
                  <Typography variant="caption">
                    {formatDate(leg.departure)}
                  </Typography>
                </Grid>

                {/* Duration & Stops */}
                <Grid item size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'center', }}>
                  <Typography variant="body2">
                    {formatDuration(leg.durationInMinutes)}
                  </Typography>
                  <Typography variant="body2">
                    {leg.stopCount > 0 ? `${leg.stopCount} Stop${leg.stopCount > 1 ? 's' : ''}` : 'Direct'}
                  </Typography>
                </Grid>

                {/* Arrival */}
                <Grid item size={{ xs: 12, sm: 3 }} sx={{ textAlign: 'center', }}>
                  <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                    {leg.destination.displayCode}
                  </Typography>
                  <Typography variant="body2">
                    {formatTime(leg.arrival)}
                  </Typography>
                  <Typography variant="caption">
                    {formatDate(leg.arrival)}
                  </Typography>
                </Grid>

                {/* Airline Info */}
                <Grid item size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                  <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'flex-end'}}>
                    {leg.carriers.marketing.map((carrier, index) => (
                      <Avatar key={index} alt={carrier.name} src={carrier.logoUrl} sx={{ width: 45, height: 45 }} />
                    ))}
                  </Stack>
                </Grid>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
