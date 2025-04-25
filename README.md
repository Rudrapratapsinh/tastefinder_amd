
  


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


Filter by cuisine

filter for budget: below 500, 500-1000, 1000-1500, 1500+(cost for two)

Veg/Non-Veg Filter: Filter by vegetarian (TRUE) or non-vegetarian (FALSE).

Area Filter: Select from 82 areas (e.g., Acher, Bodakdev) with a search button.





📊 Sorting

Sort by:

💰 Cost for Two (costForTwoStrings, ascending/descending)

🌟 Average Rating (avgRating, descending)





👤 User Profile


Reviews: Manage your restaurant ratings.

Favorites: Save and view your favorite spots.




📊 Dataset
The app uses ahmedabad_restaurants.csv, a dataset with ~1000 rows of restaurant data for Ahmedabad, sourced from a Google Sheets export and parsed with papaparse.
Dataset Fields




🛠️ tech stack

Node.js: v16+ (node -v to check)
SQLite: For user data storage
VS Code: Recommended for development
Git: For cloning the repo (git --version to check)





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


