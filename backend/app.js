const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRouter");
const errorHandler = require("./middlewares/errorHandlerMiddleware");
const categoryRouter = require("./routes/categoryRouter");

const app = express();

//! connect to MongoDB
mongoose
    .connect("mongodb://localhost:27017/mern-expenses")
    .then(()=> console.log('DB Connected'))
    .catch((e) => console.log(e));

//! Middlewares
app.use(express.json()); //? pass incoming json data

//!Router
app.use("/", userRouter);

app.use("/", categoryRouter);
//! Error
app.use(errorHandler);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=> console.log(`Server is running on this port ... ${PORT}`));


