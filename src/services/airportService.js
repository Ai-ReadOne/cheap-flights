import axios from 'axios';
import {RapidApiConfig} from '../config.js';

export async function fetchAirports(query) {
  if (!query) return [];

  try {
    const response = await axios.get(
      'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
      {
        params: { query },
        headers: {
          'x-rapidapi-key': RapidApiConfig.key,
          'x-rapidapi-host': RapidApiConfig.host
        }
      }
    );

    const data = response.data.data || {};
    let responsesize = Object.keys(data).length;
    let airports = [];
    for(const key in data){
      let airport = data[key];
      airports.push(airport.navigation?.relevantFlightParams);
    }
    return airports;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
}
