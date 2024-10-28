const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded({ extended: true }));

// Mengarahkan route root (/) langsung ke halaman register
app.get("/", (req, res) => {
  res.redirect("/register");
});

app.get("/register", (req, res) => {
  res.render("register", { title: "Register" });
});

app.post("/register", (req, res) => {
  const { username, password } = req.body;
  // Simpan user ke database (dalam contoh ini hanya console.log)
  console.log("New User:", { username, password });
  res.redirect("/login");
});

app.get("/login", (req, res) => {
  res.render("login", { title: "Login" });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  console.log("User Login:", { username, password });
  res.send("Login berhasil! (Ini adalah halaman sementara)");
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});