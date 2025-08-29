# StoryPoint
A full-stack MERN application designed as a modern platform for writers and readers. StoryPoint provides a space where users can share, discover, and engage with stories from a growing community. <br>
It has a dynamic and responsive frontend connected to the backend API architechture. <br>
Check out the website : [Link](https://storypoint-vcne.onrender.com/)
## Features:
Public users and Logged-in users can access differently with writers/Logged-in users having access to more features. <br>
**Public Users (Readers) can:**
- View a public feed of all stories on the homepage.
- Read any story(complete) on a dedicated page.
- View comments left by other users.
- Register for a new account. <br>
**Authenticated Users (Logged-in users/Writers) can:**
- Log in and log out securely using JWT authentication.
- Create new stories via a protected route.
- Read others stories.
- Like and unlike stories from other users.
- Comment on any story to engage with the author.
- View their own profile page, which displays all their work.
## Technical Stack:
This project was built using the MERN stack and: <br>
Frontend: Axios - A promise-based HTTP client for making requests to the backend API. <br>
Backend : 
- JWT -> Implements JSON Web Tokens for secure user authentication and authorization.
- Bcrypt.js -> A library used to hash user passwords for secure storage. <br>
Database: Mongoose - An Object Data Modeling (ODM) library used to interact with MongoDB.
## API endpoints:
The backend provides a RESTful API with many endpoints to: 
- Register a new user
- Login
- Get all stories
- Post new story
- Get specific story
- Like/unlike a story
- Post comments
<br>
Protected routes require a valid x-auth-token in the header.
