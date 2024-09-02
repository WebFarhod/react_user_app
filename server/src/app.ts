import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";


import authRoute from "./routes/auth.routes";
import userRoute from "./routes/user.routes";
import ErrorMiddleware from "./middlewares/error.middleware";

const app = express();

const corsOptions = { credentials: true, origin: process.env.CLIENT_URL };

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);

//middleware
app.use(ErrorMiddleware);

export default app;
