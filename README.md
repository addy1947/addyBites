# AddyBites Frontend

A React-based frontend for the AddyBites delivery application with modern UI and user authentication.

## Features

- User authentication and profile management
- Product browsing and search functionality
- Shopping cart with real-time updates
- Checkout and order management
- Responsive design with Tailwind CSS

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Create a `.env.local` file in the root directory
   - Add the following line:
   ```
   VITE_PUBLIC_API_URL=http://localhost:5000
   ```
   - For production, change the URL to your backend server

3. Start the development server:
```bash
npm run dev
```

## Environment Variables

- `VITE_PUBLIC_API_URL` - Backend API URL (default: http://localhost:5000)

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Dependencies

- React 18
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
