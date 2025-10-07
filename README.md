# CarbonSense - Smart Carbon Footprint Analyzer

A full-fledged Carbon Footprint Calculator web application using the MERN stack (MongoDB, Express, React, Node.js), integrated with AI (OpenAI API) and external data APIs for real-world emission calculations.

## Features
- Carbon footprint calculation based on electricity, transport, diet, waste, and water usage
- Historical tracking and analytics
- AI-powered personalized emission-reduction tips
- Community leaderboard
- Data visualization
- User authentication and profile management

## Tech Stack
- Frontend: React.js, Redux Toolkit, TailwindCSS
- Backend: Node.js, Express.js
- Database: MongoDB + Mongoose
- AI Layer: OpenAI GPT API
- External APIs: Google Maps API, Carbon Interface API
- Auth & Security: JWT, Bcrypt
- Deployment: Vercel (frontend), Render/Heroku (backend), MongoDB Atlas (database)

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

## Setup Instructions

For detailed setup instructions, please refer to [SETUP_INSTRUCTIONS.md](SETUP_INSTRUCTIONS.md)

## Data Structures Implemented

- Linked List for history tracking
- Stack for undo operations
- Queue for temporary result caching
- Binary Search Tree for sorting footprints
- Max Heap for leaderboard ranking
- Graph for activity connections

## Modules

1. **User Module** - Register/Login using JWT, User dashboard
2. **Carbon Calculation Module** - Input monthly data for various categories
3. **History & Analytics Module** - Store and display all past calculations
4. **AI Recommendation Module** - Integrate OpenAI GPT for smart suggestions
5. **Leaderboard/Community Module** - Rank users based on emission reduction
6. **Admin Panel** - Manage users and calculations
7. **Data Visualization Module** - Show footprint over time with charts

## Future Enhancements

- Mobile App (React Native)
- IoT Integration (smart devices)
- Real-time emission tracking
- Carbon credit reward system
- AI chatbot personalization