# Go-React-Blog-App

This repository serves as a learning project for working with Go as a backend. The goal is to explore and understand the fundamentals of building a RESTful API backend using Go, along with integrating it with a frontend app utilizing React.

## Motivation

As someone familiar with web applications and REST API backends, I wanted to create a project where I could leverage my existing knowledge while diving into the world of Go.

## Technologies Used

### Backend

- **Chi Router**: Used for routing.
- **pgxpool**: A PostgreSQL driver for interacting with the db.
- **sqlc**: Code generation for sql queries.
- **Goose**: Handles database migrations.
- **Firebase Auth**: Utilized for authenticating tokens from the frontend.

### Frontend

- **React**
- **Vite**: Bundling (also used for bootstrapping the intial frontend application)
- **Tailwind CSS**: Styling
- **HeadlessUI**: For a basic set of components
- **React Query**: Used for all data fetching and caching.
- **Axios**: Used with react query for making the underlying network requests
- **Firebase Auth**: Integrated for authentication on the frontend.

## Project Structure

The project consists of two directories

- **backend**: Contains the Go server code.
- **frontend**: Houses the React-based web application.

## Getting Started

To get started with the project, follow these steps:

1. **Clone the Repository**: Clone this repository to your local machine.
   ```bash
   git clone https://github.com/markbussard/go-react-blog-app.git
   ```

2. **Set Up Firebase Project**:

   - If you don't have a Firebase project yet, you'll need to create one. Visit the [Firebase Console](https://console.firebase.google.com/) and click on "Add project" to create a new project.

   - Follow the on-screen instructions to set up your Firebase project. You'll need to provide a project name, select your Firebase account, and choose a region for your project.

3. **Configure Firebase Authentication**:

   - Once your Firebase project is set up, navigate to the "Authentication" section in the Firebase Console.

   - Enable the basic sign-in methods (Email/Password, Google Sign-In).

4. **Obtain Firebase Credentials**:

   - After setting up Firebase Authentication, you'll need to obtain the Firebase credentials to use in the .env files.

   - Navigate to the "Project settings" in the Firebase Console. By default you will be in the "General" tab, scroll down and get firebaseConfig values. You'll need these for the `frontend/.env` file

   - Navigate to the "Service accounts" tab. You'll need to generate a new private key, which will then download your credentials as a json file. Take this value and paste it into your `backend/.env` file. Ensure the value is one line, otherwise it will not be read correctly within the app

5. **Set up a PostgreSQL DB**:

   - I won't be including all the instructions for this step as it can be extensive if you don't already have this setup. A simple google search will lead you to instructions for setting this up on your local machine.

   - Once you set this up, you will simply need to create a new DB instance and then add these credentials to the `backend/.env` file    
   
6. **Set up backend**: Navigate to the `backend` directory and set up the server.
   ```bash
   cd backend
   # Setup your DB will all the needed tables
   cd sql/schema
   goose postgres <db_url_from_env> up
   cd ../../
   # Run the initial seed script (optional). You will need to create a user (can do so from the firebase auth console) and then update the seed script with your own user credentials for the email and auth id before running the seed command.
   make seed
   ```
7. **Set up frontend**:
   ```bash
   cd ../frontend
   # Install dependencies
   yarn
   ```
8. **Start Development Servers**: Start the development servers for both the backend and frontend.
   ```bash
   # In the backend directory
   make run
   # In the frontend directory
   yarn dev
   ```

## License

This project is licensed under the [MIT License](LICENSE).