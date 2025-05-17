# Full-Stack Authentication System

A modern authentication system built with React, Node.js, and MongoDB, featuring a beautiful UI with a protected dashboard.

## Features

- 🔐 Secure user authentication with JWT
- 📝 User registration with name, date of birth, email, and password
- 🎨 Modern UI with responsive design
- 📊 Protected dashboard with user management table
- 🔒 Password hashing with bcrypt
- 🚀 MongoDB integration for data persistence

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - React Router v6
  - Axios
  - Lucide React Icons

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - JWT
  - Bcrypt

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB (local installation or cloud instance)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd auth-system
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/auth-system
   JWT_SECRET=your_jwt_secret
   ```

4. Start the development servers:
   ```bash
   npm run dev:all
   ```

The application will start with:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## Project Structure

```
auth-system/
├── src/                    # Frontend source files
│   ├── components/        # React components
│   ├── contexts/         # Context providers
│   ├── services/         # API services
│   └── utils/            # Utility functions
├── server/                # Backend source files
│   ├── controllers/      # Route controllers
│   ├── middleware/       # Express middleware
│   ├── models/          # MongoDB models
│   └── routes/          # API routes
└── package.json          # Project dependencies
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "dateOfBirth": "1990-01-01",
    "password": "password123"
  }
  ```

- `POST /api/auth/login` - Login user
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```

- `GET /api/auth/me` - Get current user (Protected)

## Security Features

- Password hashing using bcrypt
- JWT-based authentication
- Protected routes with middleware
- HTTP-only cookies for token storage
- Input validation and sanitization

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.