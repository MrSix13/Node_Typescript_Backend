import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

import { errorHandler } from "./shared/middlewares/errorHandler";
import db from "./database/mongo";
import authRoutes from "./modules/authentication/routes";
import ingredientsRoutes from "./modules/ingredients/routes";

const app = express();
const PORT = Number(process.env.PORT) || 3001;

app.use(
  cors({
    credentials: true,
  }),
);
//Rutas

app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);

app.use("/api/auth", authRoutes);
app.use("/api/ingredients", ingredientsRoutes);

const server = http.createServer(app);
db().then(() => console.log("db connected"));

server.listen(PORT, () => {
  console.log("server running in", PORT);
});
