import "dotenv/config";
import express from "express";
import cors from "cors";
import http from "http";
import bodyParser from "body-parser";
import compression from "compression";
import cookieParser from "cookie-parser";

import { errorHandler } from "./shared/middlewares/errorHandler";
import routes from "./modules/authentication/routes";
import db from "./database/mongo";

const app = express();
const PORT = Number(process.env.PORT) || 3001;
const router = express.Router();

app.use(
  cors({
    credentials: true,
  }),
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(errorHandler);

app.use("/api", routes);

const server = http.createServer(app);
db().then(() => console.log("db connected"));

server.listen(PORT, () => {
  console.log("server running in", PORT);
});
