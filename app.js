require("express-async-errors");
require("dotenv").config();

const { StatusCodes } = require("http-status-codes");
const jobsRouter = require("./routes/jobs");
const authRouter = require("./routes/auth");
const notFoundMiddleware = require("./middlewares/notFound");
const connectDB = require("./db/connectDB");
const authMiddleware = require("./middlewares/authentication");

//EXPRESS
const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.status(StatusCodes.OK).send("Jobs api");
});
app.use("/api/v1/jobs", authMiddleware, jobsRouter);
app.use("/api/v1/auth", authRouter);
app.use(notFoundMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on ${port}...`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
