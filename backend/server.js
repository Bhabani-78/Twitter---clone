import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import {v2 as cloudinary} from "cloudinary";

import authroutes from "./routes/authroutes.js";
import userroutes from "./routes/userroutes.js";
import postroutes from "./routes/postroutes.js";
import notificationRoutes from "./routes/notificationroutes.js";



import connectmongodb from "./db/connectmongodb.js";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


// Middleware
app.use(express.json({ limit: "5mb" })); // to parse req.body
app.use(express.urlencoded({ extended: true })); // To parse form data

app.use(cookieParser()); // Parse cookies before route handlers

// Routes
app.use("/api/auth", authroutes);
app.use("/api/users", userroutes);
app.use("/api/posts", postroutes);
app.use("/api/notifications", notificationRoutes);

if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/dist")));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
	});
}

// Start server and connect to DB
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
  connectmongodb();
});
