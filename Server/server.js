import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

import connectDB from "./Configs/db.js";
import connectCloudinary from "./Configs/clodinary.js";

import userRouter from "./routes/userRoute.js";
import sellerRouter from "./routes/sellerRoute.js";
import productRoute from "./routes/ProductRoute.js";
import cartRouter from "./routes/cartRoute.js";
import addressRouter from "./routes/addressRoute.js";
import orderRoute from "./routes/orderRoute.js";
import contactRouter from "./routes/contactRoute.js";
import logsRouter from "./routes/logsRoute.js";
import { Stripewebhooks } from "./controllers/orderController.js";

dotenv.config();

const app = express();

// ======================
// STRIPE WEBHOOK (RAW BODY)
// ======================
app.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  Stripewebhooks
);

// ======================
// MIDDLEWARES
// ======================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ======================
// CORS CONFIGURATION - DEPLOYMENT READY
// ======================
const allowedOrigins = [
  process.env.CLIENT_URL,
  process.env.CLIENT_URL_PROD,
  "http://localhost:5173",
  "https://quick-mart-1-qy6l.onrender.com",
  "https://quick-mart-7k5r.onrender.com",
  "https://quickmart-frontend-sntg.onrender.com"
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error(`CORS policy blocked access from origin: ${origin}`));
    }
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"]
}));

// ⚠️ TEMPORARY FOR TESTING (remove in production):
// app.use(cors({ origin: "*" }));

// ======================
// ROUTES
// ======================
app.get("/", (req, res) => {
  res.status(200).send("API is working");
});

// Health check endpoint for keeping service awake
app.get("/health", (req, res) => {
  res.status(200).json({ 
    status: "OK", 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

app.use("/api/user", userRouter);
app.use("/api/seller", sellerRouter);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRouter);
app.use("/api/address", addressRouter);
app.use("/api/order", orderRoute);
app.use("/api/contact", contactRouter);
app.use("/api/logs", logsRouter);

// ======================
// SERVER START - DYNAMIC PORT ALLOCATION
// ======================
const findAvailablePort = async (startPort) => {
  const { default: net } = await import('net');
  
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    
    server.listen(startPort, () => {
      const port = server.address().port;
      server.close(() => resolve(port));
    });
    
    server.on('error', () => {
      // Port is in use, try next port
      findAvailablePort(startPort + 1).then(resolve).catch(reject);
    });
  });
};

const startServer = async () => {
  try {
    // Find an available port starting from 5555
    const PORT = process.env.PORT || await findAvailablePort(5555);
    
    console.log(" Connecting to database...");
    await connectDB();
    console.log(" Database connected successfully");
    
    console.log(" Connecting to Cloudinary...");
    await connectCloudinary();
    console.log(" Cloudinary connected successfully");

    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
      console.log(` CORS enabled for: ${allowedOrigins.join(", ")}`);
      console.log(` Local API URL: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(" Server failed to start:", error.message);
    process.exit(1);
  }
};

startServer();