import axios from 'axios';

const RAPIDAPI_KEY = import.meta.env.VITE_RAPIDAPI_KEY;
const RAPIDAPI_HOST = import.meta.env.VITE_RAPIDAPI_HOST;

export async function searchFlights(params) {
  if (!params) return [];

  try {
    const response = await axios.get(
        'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
      {
        params: { ...params },
        headers: {
          'x-rapidapi-key': RAPIDAPI_KEY,
          'x-rapidapi-host': RAPIDAPI_HOST
        }
      }
    );

    const flightsData = response.data?.data || {};
    console.log('Fetched flights:', flightsData);
    return flightsData;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
}
