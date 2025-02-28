import axios from 'axios';
import {RapidApiConfig} from '../config.js';

export async function searchFlights(params) {
  if (!params) return [];

  try {
    const response = await axios.get(
        'https://sky-scrapper.p.rapidapi.com/api/v1/flights/searchFlights',
      {
        params: { ...params },
        headers: {
          'x-rapidapi-key': RapidApiConfig.key,
          'x-rapidapi-host': RapidApiConfig.host
        }
      }
    );

    const flightsData = response.data?.data || {};
    return flightsData;
  } catch (error) {
    console.error('Error fetching airports:', error);
    return [];
  }
}
