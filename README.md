# PBKK-Express
PBKK-Express is a full-stack web application built with Express.js on the backend and Vue.js on the frontend. It uses MySQL as its database and Tailwind CSS for styling. This project was created as part of a Practical Web-Based Programming course (PBKK).

# ✨ Features
1. 🔐 User authentication (login/logout)
2. 🧮 MySQL database integration
3. 🧾 RESTful API routes with Express
4. 🎨 Admin dashboard built with Vue.js + TailwindCSS
5. 🛠️ Simple and extendable codebase

# 🗂 Project Structure
```
PBKK-Express/
├── index.js                 # Main Express server file
├── package.json             # Backend dependencies
├── tailwind.config.js       # Tailwind config
├── postcss.config.js        # PostCSS config
├── admin-dashboard/         # Vue.js frontend
│   ├── public/
│   ├── src/
│   └── ...
```

# ⚙️ Tech Stack
1. Backend: Express.js, Node.js
2. Frontend: Vue.js, Tailwind CSS
3. Database: MySQL
4. Other: CORS, Body-parser, MySQL2

# 🚀 Getting Started
1. Install backend dependencies
PBKK-Express
```
npm install
cd admin-dashboard
npm install
cd ..
```

2. Create Database in MySQL
```
CREATE DATABASE film;

       CREATE TABLE users (
   id INT AUTO_INCREMENT PRIMARY KEY,
   username VARCHAR(50) NOT NULL,
   password VARCHAR(255) NOT NULL
   );

   CREATE TABLE movies (
   id INT AUTO_INCREMENT PRIMARY KEY,
   title VARCHAR(255) NOT NULL,
   genre VARCHAR(100),
   release_year INT,
   rating DECIMAL(3, 1),
   description TEXT,
   image_path VARCHAR(255) -- Added image_path column here
 );

   INSERT INTO movies (title, genre, release_year, rating, description, image_path) VALUES
   ('Inception', 'Sci-Fi', 2024, 8.8, 'A thief who steals corporate secrets through the use of dream-sharing technology.', './images/inception.jpeg'),
   ('The Matrix', 'Sci-Fi', 2024, 8.7, 'A computer hacker learns about the true nature of his reality.', './images/matrix.jpg'),
   ('Interstellar', 'Sci-Fi', 2024, 8.6, 'A team of explorers travel through a wormhole in space.', './images/interstellar.jpg'),
   ('The Dark Knight', 'Action', 2024, 9.0, 'Batman raises the stakes in his war on crime.', './images/thedarkknight.jpg');

   CREATE TABLE theaters (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   location VARCHAR(255),
   capacity INT,
   description TEXT,
   image_path VARCHAR(255)
   );

   INSERT INTO theaters (name, location, capacity, description, image_path) VALUES
   ('Grand IMAX Cinema', 'Downtown', 300, 'Experience the ultimate in movie watching with crystal-clear IMAX screens and immersive sound.', './images/c1.jpg'),
   ('Luxe VIP Cinema', 'Uptown', 200, 'Enjoy the ultimate luxury cinema experience with reclining seats, private lounges, and gourmet snacks.', './images/c2.jpg'),
   ('Outdoor Drive-In', 'Countryside', 150, 'Enjoy a nostalgic movie night under the stars at our classic outdoor drive-in theater.', './images/c3.png'),
   ('Cinema City', 'City Center', 400, 'A popular theater with a wide variety of movie selections and premium seating options.', './images/c4.jpg');

   CREATE TABLE bookings (
   id INT AUTO_INCREMENT PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   movie_id INT NOT NULL,
   theater_id INT NOT NULL,
   booking_date DATE NOT NULL,
   seats VARCHAR(20) NOT NULL,
   FOREIGN KEY (movie_id) REFERENCES movies(id) ON DELETE CASCADE,
   FOREIGN KEY (theater_id) REFERENCES theaters(id) ON DELETE CASCADE
   );

   CREATE TABLE payments (
   id INT AUTO_INCREMENT PRIMARY KEY,
   booking_id INT NOT NULL,
   amount DECIMAL(10, 2) NOT NULL,
   payment_date DATE NOT NULL,
   status ENUM('paid', 'pending', 'failed') DEFAULT 'pending',
   FOREIGN KEY (booking_id) REFERENCES bookings(id) ON DELETE CASCADE
   );
```

Set up the MySQL database
```
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'pbkk_express',
});
```

3. Run the backend server
`node index.js`

4. Run the frontend (Vue.js)
`npm run dev`

The frontend will be available at http://localhost:3000, and the backend runs on http://localhost:3001.

# 🧠 How It Works
1. The backend (index.js) sets up middleware (CORS, body-parser), connects to MySQL, and defines routes like /logout.
2. The frontend is a separate Vue.js app built with TailwindCSS.
3. Both parts work independently but are designed to be connected through API calls.

# 🧪 Development Notes
1. Built with separation of concerns in mind: backend & frontend live in separate directories.
2. You can easily add more API routes in index.js.
3. Consider implementing JWT or session-based auth for a production setup.

# 📌 To-Do
 1. Add login & register routes
 2. Create CRUD endpoints for delivery items or user management
 3. Connect frontend forms with backend API
 4. Add environment variable support

# Visual App
## Home Page
<img width="1440" alt="Screenshot 2025-04-19 at 09 43 17" src="https://github.com/user-attachments/assets/3fe3d3de-2351-4b6f-8a14-16d6d8892459" />
<img width="1440" alt="Screenshot 2025-04-19 at 09 43 22" src="https://github.com/user-attachments/assets/3b8b4447-612a-44a4-940f-5bf2fddd33a7" />
<img width="1440" alt="Screenshot 2025-04-19 at 09 43 27" src="https://github.com/user-attachments/assets/801b1488-7afe-467f-b96f-d6694d5edc6b" />

## Now Playing Page 
<img width="1440" alt="Screenshot 2025-04-19 at 09 43 30" src="https://github.com/user-attachments/assets/33dcf502-9d35-4573-aa26-d927aa9e8029" />

## Theaters
<img width="1440" alt="Screenshot 2025-04-19 at 09 43 32" src="https://github.com/user-attachments/assets/fddb304b-eb39-49b8-8614-43face3ba953" />

## Buy Ticket Page
<img width="1440" alt="Screenshot 2025-04-19 at 09 43 58" src="https://github.com/user-attachments/assets/9dd84266-992a-4086-89f4-aa9b0bb395d7" />

## Payments Page
<img width="1440" alt="Screenshot 2025-04-19 at 09 44 01" src="https://github.com/user-attachments/assets/45b5678d-849a-4f23-b5db-7199403fe116" />

## Admin Page 
<img width="1440" alt="Screenshot 2025-04-19 at 09 43 10" src="https://github.com/user-attachments/assets/fe6b4687-6f95-402e-8181-0a5b827192a1" />

