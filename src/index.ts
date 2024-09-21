import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const app = express();

app.use(
  cors({
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(compression());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log(`Server listening on http://localhost:${process.env.PORT}/`);
});

//database connection
mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;
connection.on("error", (err) => {
  console.log(err);
});
connection.once("connected", () => {
  console.log("Database Connected");
});
