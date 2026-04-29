import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import routes from "./route.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", routes);

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// console.log("ENV KEY:",process.env.GEMINI_API_KEY);