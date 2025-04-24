# Foodie Finder India - Restaurant Recommender App

## Project info

**URL**: https://lovable.dev/projects/ec4d608e-7b8b-4777-82cd-fa3a9f5e416d

## About the Project

Foodie Finder India is a web application designed to help users discover, rate, and save their favorite restaurants across major Indian cities. The app provides personalized recommendations based on user preferences and offers detailed restaurant information.

### Key Features

- **User Authentication**: Secure login and registration system
- **Restaurant Browsing**: Browse restaurants with a card-based UI and pagination
- **Restaurant Details**: View comprehensive information about each restaurant
- **User Reviews**: Rate and review restaurants on a 5-star scale
- **Favorites System**: Save restaurants to your personal favorites list
- **Personalized Recommendations**: Get restaurant suggestions based on your preferences
- **User Profiles**: Track your restaurant activity and preferences
- **Responsive Design**: Optimized for both desktop and mobile

### Technical Details

This project uses a large dataset of 8692 Indian restaurants. For this demo version, we're using sample data but in a production environment, it would fetch from the Google Sheets CSV dataset.

## Using the App

### Demo Account
You can log in with the following credentials:
- Email: demo@example.com
- Password: password123

### Navigation
- **Home**: Overview of top restaurants and popular cuisines
- **Restaurants**: Browse all available restaurants
- **Favorites**: View your saved restaurants
- **Profile**: See your activity and personalized stats

## Technologies Used

This project is built with:

- Vite
- TypeScript
- React
- React Router
- Shadcn UI Components
- Tailwind CSS
- Lucide React Icons

## Development Guide

### Local Setup

To run the project locally:

```sh
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to the project directory
cd foodie-finder-india

# Install dependencies
npm install

# Start the development server
npm run dev
```

### Project Structure

- `/src/components` - UI components organized by feature
- `/src/pages` - Page components for each route
- `/src/context` - React context for state management
- `/src/data` - Sample data and data access functions
- `/src/types` - TypeScript interfaces and types
- `/src/utils` - Utility functions for data processing

### Future Improvements

In a production environment, this app would:

1. Fetch the full 8692-row dataset from the Google Sheets CSV URL
2. Process and import the data into a proper database
3. Implement server-side pagination for better performance
4. Add more detailed filtering and search functionality
5. Enhance the recommendation algorithm based on more user data

## Deployment

The app can be deployed using the Lovable.dev platform:

1. Open [Lovable](https://lovable.dev/projects/ec4d608e-7b8b-4777-82cd-fa3a9f5e416d)
2. Click on Share -> Publish
3. For custom domains, navigate to Project > Settings > Domains
