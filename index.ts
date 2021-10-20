import express from "express";
import cors from "cors";
import routes from "./routes";
import dotenv from "dotenv";
import rateLimiter from "express-rate-limit";

dotenv.config();

const PORT = process.env.PORT || 5000;

const app = express();

// Rate limiter
const limiter = rateLimiter({
  windowMs: 10 * 60 * 1000, // 10 Mins
  max: 100,
});

app.use(limiter);
app.set("trust proxy", 1);

// Set static folder
// app.use(express.static("public"));

// Routes
app.use("/api", routes);

// Enable CORS
app.use(cors());

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
