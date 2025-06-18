# Band Rehearsal Planner

A comprehensive web application for bands and musical groups to efficiently organize rehearsals, track attendance, send reminders, and suggest optimal rehearsal times.

## Project Overview

The Band Rehearsal Planner addresses the common challenges musicians face when coordinating rehearsals:

- **Scheduling Conflicts**: Find the best times for everyone to meet
- **Availability Tracking**: Easily view who can make it to rehearsals
- **Communication Issues**: Centralize all rehearsal-related discussions
- **Attendance Management**: Track who showed up and follow up with absent members
- **Rehearsal Planning**: Organize setlists and practice materials

## Features

### Core Features

1. **User Management**
   - User registration and authentication
   - Role-based access (band leader, band member, technical crew)
   - Multiple band/group membership support

2. **Rehearsal Scheduling**
   - Create, edit, and delete rehearsal events
   - Set location, date, time, and duration
   - Recurring rehearsal setup
   - Calendar view (daily, weekly, monthly)

3. **Availability Management**
   - Mark availability/unavailability for specific dates and times
   - Set recurring availability patterns
   - Absence notification and management

4. **Attendance Tracking**
   - RSVP functionality for rehearsals
   - Attendance history and statistics
   - Automated check-in reminders

5. **Optimal Time Suggestion**
   - Algorithm to analyze member availability patterns
   - Suggest best rehearsal times based on group availability
   - Conflict resolution recommendations

6. **Notifications and Reminders**
   - Email and push notifications for rehearsal schedules
   - Customizable reminder timing
   - Schedule change alerts

7. **Setlist Management**
   - Create and manage setlists for rehearsals
   - Link songs to specific rehearsals
   - Track song practice progress

8. **Communications Hub**
   - In-app messaging for rehearsal-specific discussions
   - File sharing for sheet music, audio tracks, etc.
   - Announcement board for important updates

9. **Mobile Responsiveness**
   - Full functionality across devices (desktop, tablet, mobile)
   - Optimized interfaces for different screen sizes

## Technology Stack

### Frontend
- **Framework**: React.js with TypeScript
- **State Management**: Redux
- **UI Library**: Material-UI
- **Charts/Calendar**: FullCalendar.js, Chart.js
- **HTTP Client**: Axios

### Backend
- **Framework**: Node.js with Express.js
- **API Design**: RESTful API with JWT authentication
- **Real-time Features**: Socket.io

### Database
- **Primary Database**: MongoDB (NoSQL)
- **Caching**: Redis

### Infrastructure
- **Hosting**: AWS (EC2 or Elastic Beanstalk)
- **CI/CD**: GitHub Actions
- **Containerization**: Docker
- **Storage**: AWS S3 (for file uploads)

### Integrations
- Google Calendar API
- Apple Calendar API
- Email service (SendGrid)
- Push notifications (Firebase Cloud Messaging)

## Project Structure

```
band-rehearsal-planner/
├── client/                  # Frontend React application
│   ├── public/              # Static files
│   └── src/                 # React source code
│       ├── assets/          # Images, fonts, etc.
│       ├── components/      # Reusable UI components
│       ├── context/         # React context providers
│       ├── hooks/           # Custom React hooks
│       ├── pages/           # Page components
│       ├── redux/           # Redux state management
│       ├── services/        # API services
│       ├── styles/          # Global styles
│       ├── types/           # TypeScript type definitions
│       ├── utils/           # Utility functions
│       ├── App.tsx          # Main application component
│       └── index.tsx        # Application entry point
│
├── server/                  # Backend Node.js/Express application
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── middleware/          # Custom middleware
│   ├── models/              # Database models
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   ├── utils/               # Utility functions
│   ├── validation/          # Input validation
│   ├── app.js               # Express application setup
│   └── index.js             # Server entry point
│
├── .github/                 # GitHub Actions workflows
├── .gitignore               # Git ignore file
├── docker-compose.yml       # Docker Compose configuration
├── Dockerfile               # Docker configuration
├── package.json             # NPM dependencies and scripts
└── README.md                # Project documentation
```

## Installation

### Prerequisites
- Node.js (v16+)
- MongoDB
- Redis
- Docker (optional)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone https://github.com/dxaginfo/band-rehearsal-planner-20250618.git
   cd band-rehearsal-planner-20250618
   ```

2. **Install dependencies**
   ```bash
   # Install server dependencies
   cd server
   npm install

   # Install client dependencies
   cd ../client
   npm install
   ```

3. **Environment Configuration**
   - Create `.env` files in both `client` and `server` directories based on the provided `.env.example` files
   - Configure database connections, API keys, and other required settings

4. **Start the development servers**
   ```bash
   # Start the backend server
   cd server
   npm run dev

   # Start the frontend client
   cd ../client
   npm start
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

### Docker Deployment

1. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

2. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000/api

## API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `GET /api/auth/me` - Get current user info
- `PUT /api/auth/password` - Update password

### Users Endpoints
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID
- `PUT /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user
- `GET /api/users/:id/availability` - Get user availability
- `POST /api/users/:id/availability` - Set user availability

### Bands Endpoints
- `GET /api/bands` - Get all bands for current user
- `POST /api/bands` - Create a new band
- `GET /api/bands/:id` - Get band by ID
- `PUT /api/bands/:id` - Update band
- `DELETE /api/bands/:id` - Delete band
- `POST /api/bands/:id/members` - Add member to band
- `DELETE /api/bands/:id/members/:userId` - Remove member from band

### Rehearsals Endpoints
- `GET /api/bands/:bandId/rehearsals` - Get all rehearsals for a band
- `POST /api/bands/:bandId/rehearsals` - Create a new rehearsal
- `GET /api/rehearsals/:id` - Get rehearsal by ID
- `PUT /api/rehearsals/:id` - Update rehearsal
- `DELETE /api/rehearsals/:id` - Delete rehearsal
- `POST /api/rehearsals/:id/attendance` - Update attendance status
- `GET /api/rehearsals/suggestions` - Get optimal rehearsal time suggestions

### Setlists Endpoints
- `GET /api/bands/:bandId/setlists` - Get all setlists for a band
- `POST /api/bands/:bandId/setlists` - Create a new setlist
- `GET /api/setlists/:id` - Get setlist by ID
- `PUT /api/setlists/:id` - Update setlist
- `DELETE /api/setlists/:id` - Delete setlist

### Messages Endpoints
- `GET /api/bands/:bandId/messages` - Get all messages for a band
- `POST /api/bands/:bandId/messages` - Create a new message
- `GET /api/rehearsals/:rehearsalId/messages` - Get messages for a rehearsal
- `POST /api/rehearsals/:rehearsalId/messages` - Create message for a rehearsal

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Contact

Project Link: [https://github.com/dxaginfo/band-rehearsal-planner-20250618](https://github.com/dxaginfo/band-rehearsal-planner-20250618)