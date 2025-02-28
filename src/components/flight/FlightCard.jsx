// src/components/flight/FlightCard.jsx

import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Avatar
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

    // Group segments by leg ID
    const segmentsByLeg = legs.reduce((acc, leg) => {
        if (!acc[leg.id]) {
          acc[leg.id] = [];
        }
        leg.segments.forEach(segment => acc[leg.id].push(segment));
        return acc;
      }, {});

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Grid container spacing={2}>
          {/* Price Section */}
          <Grid item xs={12} sm={2} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              {price.formatted}
            </Typography>
            <Typography variant="caption">
             {flight.tags?.join(', ')}
            </Typography>
          </Grid>
          
          {/* Flight Details Section */}
          <Grid item xs={12} sm={10}>
            {legs.map((leg) => (
              <Box key={leg.id} sx={{ mb: 2 }}>
                <Grid container spacing={2} alignItems="center">
                  {/* Departure */}
                  <Grid item xs={12} sm={3}>
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
                  <Grid item xs={12} sm={3} sx={{textAlign: 'center',}}>
                    <Typography variant="body2">
                      {formatDuration(leg.durationInMinutes)}
                    </Typography>
                    <Typography variant="body2">
                      {leg.stopCount > 0 ? `${leg.stopCount} Stop${leg.stopCount > 1 ? 's' : ''}` : 'Direct'}
                    </Typography>
                  </Grid>

                  {/* Arrival */}
                  <Grid item xs={12} sm={3}>
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
                  <Grid item xs={12} sm={3} sx={{display:'flex', alignItems:'center'}}>
                    {leg.carriers.marketing.map((carrier, index) =>(
                        <div key={index}>
                            <Avatar alt={carrier.name} src={carrier.logoUrl} sx={{ width: 24, height: 24 }}/>
                        </div>
                    ))}
                  </Grid>
                </Grid>
                {/* Segments Info */}
                 {segmentsByLeg[leg.id] && (
                      <Box mt={1}>
                        {segmentsByLeg[leg.id].map((segment, idx) => (
                          <Typography key={idx} variant="caption">
                            {`${segment.marketingCarrier.name} Flight ${segment.flightNumber} - ${segment.origin.displayCode} to ${segment.destination.displayCode}`}
                          </Typography>
                        ))}
                      </Box>
                    )}
              </Box>
            ))}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default FlightCard;

