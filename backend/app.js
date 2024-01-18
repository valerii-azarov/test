import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(cookieParser());
app.use(express.json());

app.use("/api", routes);
app.use(errorHandler);

export default app;
