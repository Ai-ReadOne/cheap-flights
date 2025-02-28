import axios from 'axios';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export async function fetchAirports(query) {
  if (!query) return [];

  try {
    const response = await axios.get(
      'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchAirport',
      {
        params: { query },
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST
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
    console.log('Fetched airports:', airports);
    return airports;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
}
