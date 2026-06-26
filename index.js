import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
// import dotenv from "dotenv";

// Create an instance of the Express application
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index.ejs", { title: "Weather App" });
});

app.post("/", async (req, res) => {
  const city = req.body.city;
  console.log(`Received city: ${city}`);

  const apiKey = process.env.API_KEY;

  const API_KEY = "3808eda01f8aa039f0ae4c8ec7249a87";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await axios.get(url);

    res.render("index.ejs", {
      weather: response.data,
      error: null,
    });
  } catch (err) {
    res.render("index.ejs", {
      weather: null,
      error: "City not found.",
    });
  }
});

// Start the server
app.listen(port, () => {
  console.log(
    `Server is running on http://localhost:${port}`,
  );
});
