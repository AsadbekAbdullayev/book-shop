import express from "express";
import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import bookRoute from "./routes/bookRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import categoryRoute from "./routes/categoryRoute.js";
import cors from "cors";
const app = express();

// middleware
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);
app.use("/books", bookRoute);
app.use("/transactions", transactionRoute);
app.use("/category", categoryRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App conncted to database");
    app.listen(PORT, () => {
      console.log(`App is listening to port: ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error, "error from mongose");
  });
