
# TechSpotter

Tech Spotter is a dynamic web application built with the MERN stack (MongoDB, Express.js, React, and Node.js) designed to help users discover and stay updated on the latest technology trends and news. The platform aggregates tech-related articles, reviews, and updates from various sources, providing users with a personalized and comprehensive tech news experience.


## Features
This project have those following Features:

- Fullscreen Mode: Enjoy an immersive browsing experience with fullscreen support.
- Responsive Design: Optimized for mobile and tablet devices, ensuring a consistent and user-friendly interface across all screen sizes.
- User Authentication: Secure login and logout functionality, with options to create an account or log in using social media accounts.
- Product Management: Logged-in users can add new products, update existing ones, and vote on products (excluding their own).
- Product Interaction: Users can report and review products, and view detailed information about each product.
- Account Creation: Easily create an account through our registration page to access all features.
- Social Media Integration: Conveniently log in using your social media accounts for a streamlined sign-in process.
- Profile Verification: Users can verify their profiles via a secure payment gateway method using SSLCommerz, ensuring added credibility and security.
## Technology Stack

- Frontend: React.js
- Backend: Node.js and Express.js
- Database: MongoDB
- Authentication: JWT (JSON Web Tokens)


## Packages and Component Librarys

These packages and component librarys are used in this project

- React Hook Form
- Chakra UI
- DaisyUI
- Tailwind CSS
- Sweet Aleart


## Live Site Link
- https://techspotter-a12.web.app
## Getting Started

To get a local copy of this project up and running, follow these steps:

### Prerequisites

- Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
- Ensure you have your Firebase and MongoDB configurations ready.

### Installation

1. **Clone the repository** or **download the ZIP file**:
   - **Clone**:
     ```bash
     https://github.com/rijviislam/techSpotter-client.git
     ```
   - **Download ZIP**:
     - Click on the green "Code" button at the top right of this repository.
     - Select "Download ZIP".
     - Extract the downloaded ZIP file.

2. **Navigate to the project directory**:
   ```bash
   cd your-repository
3. **Install the necessary dependencies:**
     ```bash
     npm install
4. **Set up Firebase and MongoDB configurations:**
- Create a firebaseConfig.js file in the src/config directory (if not already present)
- Add your Firebase configuration
  ```bash // src/config/firebaseConfig.js
  const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};
export default firebaseConfig;


5. **MongoDB**
- Create a .env file in the root directory of your project
- Add your MongoDB configuration
  ```bash
  MONGODB_URI=your_mongodb_connection_string
