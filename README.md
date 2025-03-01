# Cheap Flights Finder

A React-based web application that helps users find and compare cheap flights. This project utilizes the RapidAPI Sky-Scrapper API to fetch real-time flight data and offers a user-friendly interface for searching, filtering, and sorting flight options.

## Features

*   **Flight Search:**
    *   Search for flights by origin, destination, dates, number of passengers, and cabin class.
    *   Autocomplete for airport selection, making it easy to find the right airports.
    *   Clear and intuitive form for selecting search criteria.
*   **Flight Results:**
    *   Display of flight results in a clean and organized card format.
    *   Detailed information for each flight, including price, departure/arrival times, duration, stops, and airlines.
    *   Flight cards dynamically adjust their content according to the provided data.
*   **Filtering:**
    *   **Price:** Filter flights by a specified price range.
    *   **Stops:** Filter by the number of stops (nonstop, 1 stop, 2+ stops, any).
    *   **Duration:** Filter by total flight duration.
    *   **Times:** Filter by departure and arrival time ranges.
    *   **Airlines:** Filter by specific airlines.
    * Easy to use popover filters.
*   **Sorting:**
    *   Sort flight results by:
        *   Best (default)
        *   Cheapest
        *   Fastest
*   **Responsive Design:**
    *   The entire application is designed to work seamlessly on different screen sizes (mobile, tablet, desktop).
    *   Filter layouts adapt to screen width using Material UI's `useMediaQuery` and `Grid` components.
*   **Dark/Light Mode:**
    *   Users can toggle between dark and light mode for a customized viewing experience.
*   **Modern Technologies:**
    *   Built with React, Vite, Material UI, and Styled Components.
    *   Utilizes `lodash` for debouncing and `axios` for API calls.
    * Uses date-fns for date handling.
* **RapidAPI Integration**:
   * Fetches real time data from Sky-Scrapper API.

## Technologies Used

*   **React:** A JavaScript library for building user interfaces.
*   **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects.
*   **Material UI:** A popular React UI framework that provides a rich set of pre-built components.
*   **Styled Components:** A library for styling React components using tagged template literals.
*   **Axios:** A promise-based HTTP client for making API requests.
*   **Lodash:** A utility library providing helpful JavaScript functions (used here for debouncing).
*   **Date-fns**: A consistent, modular, and performant JavaScript date utility library.
*   **RapidAPI (Sky-Scrapper API):** A platform that provides access to various APIs, including the Sky-Scrapper flight data API.
*   **react-router-dom:** For routing.


## Getting Started

1.  **Clone the repository:**

    ```bash
    git clone git@github.com:Ai-ReadOne/cheap-flights.git
    cd cheap-flights
    ```

2.  **Install dependencies:**

    ```bash
    npm install
    ```

3.  **Environment Variables:**
    *   Create a `.env` file in the root of your project.
    *   Add your RapidAPI key and host, as shown in `env_sample`:

    ```
    VITE_RAPIDAPI_KEY=your_rapidapi_key
    VITE_RAPIDAPI_HOST=your_rapidapi_host
    ```
    *   Replace `your_rapidapi_key` and `your_rapidapi_host` with your actual RapidAPI credentials. You can get these by subscribing to the Sky-Scrapper API on RapidAPI.

4.  **Run the application:**

    ```bash
    npm run dev
    ```

    This will start the development server, and you can access the app at `http://localhost:5173` (or a different port specified in the terminal).

## How to Contribute

Contributions are welcome! If you'd like to contribute to this project, please follow these steps:

1.  Fork the repository.
2.  Create a new branch for your feature or bug fix.
3.  Make your changes and test thoroughly.
4.  Submit a pull request to the main branch.

## Future Improvements

*   **Map Integration:** Show flight routes on a map.
*   **Saved Searches:** Allow users to save their search criteria.
*   **User Accounts:** Add user authentication for personalized experiences.
*   **Booking Functionality**: Link to or implement a booking service.
*   **More tests**: Add unit and integration tests.


