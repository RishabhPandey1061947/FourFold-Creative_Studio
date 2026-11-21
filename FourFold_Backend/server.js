
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://fourfold-creative.onrender.com",
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests without an Origin header (Postman, health checks)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked CORS origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
    optionsSuccessStatus: 204,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "FOUR FOLD Backend is running!",
  });
});

const contactRoutes = require("./routes/contact.routes");
app.use("/api/contact", contactRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`FOUR FOLD backend running on port ${PORT}`);
});
