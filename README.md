TasteFinder 


TasteFinder is a web application built to help users explore restaurants in Ahmedabad, India, using a custom dataset. The app provides a user-friendly interface to filter, sort, and personalize restaurant recommendations, with features like veg/non-veg filtering, area-based search, and user profiles for managing reviews and favorites. This project was initially developed on Lovable.dev and later migrated to GitHub for local hosting and further development.
Table of Contents

Features
Dataset
Prerequisites
Setup and Running Locally
Project Structure
Development Notes
Troubleshooting

Features
Restaurant Exploration

Browse a curated list of ~1000 restaurants in Ahmedabad.
View detailed restaurant cards with:
Name
Area (from 82 unique areas)
Average rating (avgRating)
Total ratings (totalRatingsString)
Cuisines
Cost for two (costForTwoStrings)
Address
Vegetarian status (veg)



Filters

Veg/Non-Veg Filter: Filter restaurants by vegetarian (TRUE) or non-vegetarian (FALSE) status, based on the veg column in the dataset.
Area Filter: Select from 82 unique areas in Ahmedabad (e.g., Acher, Ambavadi, Bodakdev) with a search button for quick navigation.
Pagination: Display 16-20 restaurants per page with navigation controls.

Sorting

Sort restaurants by:
Cost for Two: Ascending or descending (costForTwoStrings).
Average Rating: Descending (avgRating).


Note: “Sort by Name” was intentionally removed to streamline the user experience.

User Profile

Reviews: View and manage your ratings for restaurants.
Favorites: Save and view your favorite restaurants.

Accessibility

Designed with accessibility in mind, ensuring compatibility with screen readers and keyboard navigation.

Dataset
The app uses a custom dataset (ahmedabad_restaurants.csv) sourced from a Google Sheets export, containing ~1000 rows of restaurant data for Ahmedabad. The dataset is parsed locally using the papaparse library.
Dataset Fields



Field
Description
Example



name
Restaurant name
"The Green House"


area
Location area in Ahmedabad
"Bodakdev"


avgRating
Average rating (out of 5)
4.2


totalRatingsString
Total number of ratings
"1,200 ratings"


cuisines
Types of cuisines offered
"North Indian, Chinese"


costForTwoStrings
Estimated cost for two people
"₹800 for two"


address
Full address of the restaurant
"123, Sindhu Bhavan Road"


veg
Vegetarian status (TRUE/FALSE)
TRUE


Prerequisites

Node.js: Version 16 or higher (check with node -v).
SQLite: For storing user data (reviews, favorites).
VS Code: Recommended for development and local hosting.
Git: For cloning the repository (check with git --version).

Setup and Running Locally
1. Clone the Repository
Clone the repo to your local machine:
git clone https://github.com/Rudrapratapsinh/tastefinder_amd.git
cd tastefinder_amd

2. Install Dependencies
Install all required Node.js packages:
npm install

3. Set Up Environment Variables
Create a .env file in the root directory with the following:
PORT=8008
DATABASE_URL=sqlite:./database.db


PORT: Sets the port for the backend server.
DATABASE_URL: Points to the SQLite database file for user data.

4. Initialize the Database (Optional)
If database.db doesn’t exist, create it and set up the tables:

Open a terminal and run:sqlite3 database.db


Create tables:CREATE TABLE user_reviews (user_id TEXT, restaurant_id TEXT, rating INTEGER);
CREATE TABLE user_favorites (user_id TEXT, restaurant_id TEXT);


Add test data (optional):INSERT INTO user_reviews (user_id, restaurant_id, rating) VALUES ('user1', 'rest1', 4);
INSERT INTO user_favorites (user_id, restaurant_id) VALUES ('user1', 'rest2');



5. Run the Backend
Start the Node.js backend server:
npm run start

Or, if the start script isn’t defined in package.json:
node server/server.js


The backend will run on http://localhost:8008.

6. Run the Frontend
Start the React frontend:
npm run dev


The frontend will run on http://localhost:8009 (configured in vite.config.ts to avoid conflict with the backend).
Access the app in your browser at http://localhost:8009.

Project Structure

src/: Frontend React code.
ExploreRestaurants.tsx: Main component for browsing restaurants.
Profile.tsx: User profile with reviews.
Favorites.tsx: Displays favorited restaurants.
csvLoader.ts: Utility for parsing the CSV dataset.


server/: Backend Node.js code.
server.js: Express server handling API endpoints and SQLite database.


public/: Static assets (e.g., ahmedabad_restaurants.csv).
database.db: SQLite database for user data.
.env: Environment variables for configuration.

Development Notes

This project was originally developed on Lovable.dev, a low-code platform, and later exported to GitHub for local hosting and further customization.
The lovable-dev[bot] contributions were removed by exporting the files to this new repository, ensuring a clean commit history.
The app is designed for local hosting but can be deployed to platforms like Cloudflare Pages or Netlify for free hosting with a custom domain.

Troubleshooting

Reviews/Favorites Not Showing:
Ensure database.db exists and has user_reviews and user_favorites tables.
Verify backend endpoints (/api/user/reviews, /api/user/favorites) are working by testing with curl http://localhost:8008/api/user/reviews.
Add test data to the database if empty (see Setup step 4).


Veg Filter Not Working:
Confirm veg column in ahmedabad_restaurants.csv uses TRUE/FALSE.
Check csvLoader.ts for correct parsing of the veg field.
Test the filter API call: fetch('/api/restaurants?veg=TRUE').







