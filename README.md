
  


🍽️ TasteFinder Ahmedabad


  Discover the best restaurants in Ahmedabad with ease!
  A sleek web app to explore, filter, and personalize your dining experience.
  View on GitHub



  
  
  
  



🌟 Overview
TasteFinder AMD is a modern web application designed to help users explore restaurants in Ahmedabad, India. Built with a custom dataset, it offers intuitive filtering, sorting, and personalization features. Whether you're looking for a vegetarian spot or want to sort by cost, TasteFinder has you covered! Originally developed on Lovable.dev, this project has been migrated for local hosting and further customization.


📋 Table of Contents

Features
Dataset
Prerequisites
Setup and Running Locally
Project Structure
Development Notes
Screenshots
Troubleshooting


✨ Features


🍴 Restaurant Exploration

Browse ~1000 restaurants in Ahmedabad.

View detailed cards with:

📛 Name

📍 Area (82 unique areas)

⭐ Average rating (avgRating)

🔢 Total ratings (totalRatingsString)

🍲 Cuisines

💸 Cost for two (costForTwoStrings)

🏠 Address

🥗 Vegetarian status (veg)



🔍 Filters


Veg/Non-Veg Filter: Filter by vegetarian (TRUE) or non-vegetarian (FALSE).

Area Filter: Select from 82 areas (e.g., Acher, Bodakdev) with a search button.

Pagination: 16-20 restaurants per page with navigation.



📊 Sorting

Sort by:

💰 Cost for Two (costForTwoStrings, ascending/descending)

🌟 Average Rating (avgRating, descending)





👤 User Profile


Reviews: Manage your restaurant ratings.

Favorites: Save and view your favorite spots.

♿ Accessibility

Built with screen reader support and keyboard navigation.


📊 Dataset
The app uses ahmedabad_restaurants.csv, a dataset with ~1000 rows of restaurant data for Ahmedabad, sourced from a Google Sheets export and parsed with papaparse.
Dataset Fields




🛠️ Prerequisites

Node.js: v16+ (node -v to check)
SQLite: For user data storage
VS Code: Recommended for development
Git: For cloning the repo (git --version to check)


🚀 Setup and Running Locally
1. Clone the Repository
git clone https://github.com/Rudrapratapsinh/tastefinder_amd.git
cd tastefinder_amd

2. Install Dependencies
npm install

3. Set Up Environment Variables
Create a .env file in the root:
PORT=8008
DATABASE_URL=sqlite:./database.db

4. Initialize the Database (Optional)
If database.db doesn’t exist:

Run:sqlite3 database.db


Create tables:CREATE TABLE user_reviews (user_id TEXT, restaurant_id TEXT, rating INTEGER);
CREATE TABLE user_favorites (user_id TEXT, restaurant_id TEXT);


Add test data:INSERT INTO user_reviews (user_id, restaurant_id, rating) VALUES ('user1', 'rest1', 4);
INSERT INTO user_favorites (user_id, restaurant_id) VALUES ('user1', 'rest2');



5. Run the Backend
Start the Node.js server:
npm run start

Or:
node server/server.js


Runs on http://localhost:8008.

6. Run the Frontend
Start the React frontend:
npm run dev


Runs on http://localhost:8009 (set in vite.config.ts to avoid conflicts).


📁 Project Structure

src/: React frontend code
ExploreRestaurants.tsx: Browse restaurants
Profile.tsx: User reviews
Favorites.tsx: Favorite restaurants
csvLoader.ts: CSV parsing utility


server/: Node.js backend
server.js: Express server with API endpoints


public/: Static assets (e.g., ahmedabad_restaurants.csv)
database.db: SQLite database
.env: Environment variables


📝 Development Notes

Originally built on Lovable.dev, a low-code platform.
Migrated to GitHub, with lovable-dev[bot] contributions removed for a clean history.
Designed for local hosting; can be deployed to Cloudflare Pages or Netlify for free hosting.


📸 Screenshots
Explore the app’s interface:
Browse restaurants with filters and sorting.
Manage your reviews and favorites.

🐞 Troubleshooting

Reviews/Favorites Not Showing:
Ensure database.db has user_reviews and user_favorites tables.
Test API endpoints: curl http://localhost:8008/api/user/reviews.
Add test data if empty (see Setup step 4).


Veg Filter Issues:
Verify veg column in ahmedabad_restaurants.csv uses TRUE/FALSE.
Check csvLoader.ts for parsing errors.
Test filter: fetch('/api/restaurants?veg=TRUE').

