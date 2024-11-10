# Project Name

## Filter System

# Project Description

## This project is a React-based product catalog that allows users to explore, filter, and sort products effectively. Built with Redux for state management, it provides users with a seamless browsing experience, featuring advanced filtering options, sorting capabilities, and infinite scrolling for enhanced usability.

# Installation

## 1. Clone the repository

# ```bash

# git clone https://github.com/narine998/Filtering-System.git

# cd Filter-system

# ```

## 2. Install dependencies

# ```bash

# npm install

# ```

# Running the Application

## 1. Start the JSON server

# ```bash

# npx json-server --watch data.json --port 3001

# ```

# This will start the JSON server on port 3001.

## 2. Start the React development server

# ```bash

# npm start

# ```

# This will start the React development server on port 3000.

# Usage

## - Open your browser and go to `http://localhost:3000` to view the application.

# Features

**Product Filtering**: Users can filter products by various criteria such as brand, category, price range, and rating. Filters are optimized to prevent unnecessary API calls using debouncing.
**Sorting**: Products can be sorted by price, rating, and other criteria, allowing users to customize their view.
**Infinite Scrolling**: Automatically loads more products as the user scrolls, providing a continuous browsing experience.
**State Management with Redux**: Global state is handled efficiently with Redux, and the filters are stored in local storage to retain user preferences.
**API Mocking**: The project uses JSON Server to simulate backend data, providing a mock API for testing and development.
