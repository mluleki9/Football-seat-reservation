# Football Match Seat Reservation System

## Overview

This project is a Football Match Seat Reservation System built using Next.js for the frontend, Clerk for authentication, Express for the backend, and Prisma ORM for database management. The application allows users to view available matches and make reservations while ensuring secure user authentication through Clerk.

## Features

- **User Authentication API**: Users can sign up, sign in, and manage their sessions using Clerk.
- **Match Reservation**: Users can view available matches and reserve seats.
- **Real-Time Updates**: The application reflects the current availability of seats dynamically.
- **User Management**: User data is securely stored and managed through a MySql database using Prisma ORM.

## Technologies Used

- **Frontend**: Next.js, TypeScript, React, Bootstrap
- **Backend**: Express.js
- **Database**: MySQL (managed via MySQL Workbench)
- **ORM**: Prisma
- **Authentication API**: Clerk

## Getting Started

### Prerequisites

- Node.js and npm installed on your machine.
- MySQL database set up and running.

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd <project-directory>

   or
   download the zip project folder and extract it into your desired location
   cd <project-directory>

2. Install the backend dependencies:
   ```bash
   cd server
   npm i

3. Install the frontend dependencies / node_modules:
   ```bash
   npm i

4. Setting up Clerk API and Webhook
   Visit https://clerk.com/ to setup your API and Webhook follow the Documentation for the site 
 
5. Configure environment variables. Create a .env file in your root folder and add the following:
    DATABASE_URL="your-database-connection-string"
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-next-public-key
    CLERK_SECRET_KEY=your-clerk-secret-key
    NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
    NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up      
    WEBHOOK_SECRET=your-webhook-secret

6. Run database migrations using Prisma:
   ```bash
   npx prisma migrate dev

7. Run the backend server
   ```bash
   npm run server 
   
8. Run the development server
   ```bash
   npm run dev 
   or
   yarn dev

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result, you can access the admin page by visiting http://localhost:3000/admin.

THANK YOU!


