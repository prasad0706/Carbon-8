# CarbonSense - Setup Instructions

## Project Overview

CarbonSense is a full-fledged Carbon Footprint Calculator web application built using the MERN stack (MongoDB, Express, React, Node.js) with AI integration.

## Project Structure

```
carbon-sense/
├── client/ (React frontend)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── features/ (Redux slices)
│   │   ├── store/ (Redux store)
│   │   └── App.js
│   └── package.json
├── server/ (Node.js + Express backend)
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── middlewares/
│   ├── utils/
│   ├── config/
│   └── server.js
└── README.md
```

## Prerequisites

1. Node.js (v14 or higher)
2. MongoDB (local installation or MongoDB Atlas account)
3. npm or yarn package manager

## Setup Instructions

### 1. Backend Setup (server)

Navigate to the server directory:
```bash
cd server
```

Install dependencies:
```bash
npm install
```

Create a `.env` file in the server directory with the following content:
```
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/carbonsense
JWT_SECRET=carbonsense_jwt_secret_key_here
OPENAI_API_KEY=your_openai_api_key_here
CARBON_INTERFACE_API_KEY=your_carbon_interface_api_key_here
GOOGLE_MAPS_API_KEY=your_google_maps_api_key_here
```

Start the backend server:
```bash
npm run dev
```

### 2. Frontend Setup (client)

Navigate to the client directory:
```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the frontend development server:
```bash
npm start
```

## Environment Variables

### Backend (.env in server directory)
- `NODE_ENV`: Environment (development/production)
- `PORT`: Server port (default: 5000)
- `MONGODB_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `OPENAI_API_KEY`: OpenAI API key for AI recommendations
- `CARBON_INTERFACE_API_KEY`: Carbon Interface API key
- `GOOGLE_MAPS_API_KEY`: Google Maps API key

### Frontend (.env in client directory)
- `REACT_APP_API_BASE_URL`: Backend API base URL

## Available Scripts

### Backend
- `npm run dev`: Start development server with nodemon
- `npm start`: Start production server
- `npm run demo`: Run data structures demo

### Frontend
- `npm start`: Start development server
- `npm run build`: Build for production
- `npm test`: Run tests

## Features Implemented

1. **User Authentication**
   - Register/Login with JWT
   - Protected routes
   - User profile management

2. **Carbon Calculation**
   - Electricity, transport, diet, waste, and water footprint calculation
   - Historical tracking

3. **Data Structures**
   - Linked List for history tracking
   - Stack for undo operations
   - Queue for temporary result caching
   - Binary Search Tree for sorting footprints
   - Max Heap for leaderboard ranking
   - Graph for activity connections

4. **AI Integration**
   - Personalized emission-reduction tips
   - Chat-like interface

5. **Community Features**
   - Leaderboard with ranking system
   - User comparison

6. **Data Visualization**
   - Dashboard with summary information
   - Calculation history

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### User
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update user profile
- `GET /api/users/dashboard` - Get user dashboard data

### Calculation
- `POST /api/calculate` - Create new calculation
- `GET /api/calculate` - Get user calculations
- `GET /api/calculate/:id` - Get specific calculation

### History
- `GET /api/history` - Get user history
- `GET /api/history/paginated` - Get paginated user history

### AI
- `GET /api/ai/suggestions` - Get AI suggestions
- `GET /api/ai/history` - Get AI suggestions history

### Leaderboard
- `GET /api/leaderboard` - Get leaderboard
- `GET /api/leaderboard/user-rank` - Get user rank

## Data Models

### User
- name, email, password, totalFootprint, createdAt, role

### Calculation
- userId, electricity, transport, diet, waste, water, total, timestamp

### History
- userId, calculationIds, createdAt

### Suggestion
- userId, aiResponse, calculationId, date

### Leaderboard
- userId, rank, score, period, updatedAt

## Development Notes

1. The application uses Redux Toolkit for state management
2. Tailwind CSS is used for styling
3. React Router is used for navigation
4. MongoDB with Mongoose is used for data storage
5. JWT is used for authentication
6. Data structures are implemented in JavaScript for educational purposes

## Future Enhancements

1. Mobile App (React Native)
2. IoT Integration (smart devices)
3. Real-time emission tracking
4. Carbon credit reward system
5. AI chatbot personalization

## Troubleshooting

1. **Port already in use**: Change the PORT in .env file
2. **MongoDB connection error**: Check MongoDB URI and ensure MongoDB is running
3. **CORS error**: Ensure both frontend and backend servers are running
4. **JWT token error**: Check JWT_SECRET in .env file

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a pull request