const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const mysql = require("mysql2");

const app = express();
const PORT = process.env.PORT || 3000;

// Buat koneksi ke MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',        // Sesuaikan dengan user MySQL Anda, defaultnya adalah 'root' di Laragon
  password: '',        // Jika ada password, tambahkan di sini, defaultnya biasanya kosong di Laragon
  database: 'film' // Ganti dengan nama database yang Anda gunakan
});

// Cek koneksi ke MySQL
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL database');
});

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Serve file statis hasil build Vue.js
app.use('/admin', express.static(path.join(__dirname, 'admin-dashboard/dist')));

// Mengarahkan route root (/) langsung ke halaman register
app.get("/", (req, res) => {
  res.redirect("/register");
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Simpan user ke database (ganti dari console.log menjadi insert ke database)
  const sql = "INSERT INTO users (username, password) VALUES (?, ?)";
  db.query(sql, [username, password], (err, result) => {
    if (err) {
      console.error("Error inserting user into database:", err);
      return res.status(500).send("Error occurred");
    }
    console.log("New User added:", { username, password });
    res.redirect("/login");
  });
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Cek user dari database untuk login
  const sql = "SELECT * FROM users WHERE username = ? AND password = ?";
  db.query(sql, [username, password], (err, results) => {
    if (err) {
      console.error("Error fetching user from database:", err);
      return res.status(500).send("Error occurred");
    }

    if (results.length > 0) {
      console.log("User authenticated:", { username, password });
      res.redirect(`/dashboard?username=${username}`);
    } else {
      console.log("Invalid credentials");
      res.status(401).send("Invalid credentials");
    }
  });
});

app.get("/dashboard", (req, res) => {
  const username = req.query.username;
  res.render("dashboard", { title: "Dashboard", username });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});