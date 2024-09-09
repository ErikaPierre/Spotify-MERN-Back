import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

dotenv.config();

const app = express();

const port = process.env.PORT;
main().catch((err) => console.log(err));

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log(`📁 DATABASE CONNECTED 🐳`);
}

app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome on my api");
});

app.listen(port, () =>
  console.log(`Server is listening on port : http://localhost:${port}`)
);
