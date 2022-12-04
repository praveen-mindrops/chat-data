const express = require("express");
// const path = require("path");
const { validate, ValidationError, Joi } = require('express-validation')
const app = express();
const dotenv = require("dotenv");
const userRouter = require("./Routers/userRouter");
const db=require("./Models");
const cors = require("cors");
const morgan=require('morgan')
// const multer = require('multer');
// const upload = multer();
app.use(cors());
app.use(morgan())


// Body Parser, reading data from body into req.body
app.use(express.json({}));
// app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }))
// app.use(upload.array()); 


dotenv.config({ path: "./config.env" });
app.use(express.static(`${__dirname}/public`));

// 2) ROUTES

app.use("/api/v1/user", userRouter);

const port = process.env.PORT || 6000;
app.listen(port, () => {
  console.log(`app is running on the Port ${port}`);
});

// 3)ERROR HANDLING
app.all("*", (req, res, next) => {
    res
      .status(404)
      .json({ error: `Can't find ${req.originalUrl} on this server` });
      next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  });

  app.use((err,req,res,next)=>{
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";
    let error = { ...err };
    error.message = err.message;
    // stack: err.stack;
    if (err instanceof ValidationError) {
        return res.status(err.statusCode).json(err)
      }
    res.status(err.statusCode).send({
        status: error.status,
        error: error,
        message: error.message,
        stack: error.stack,
      });
  });
  
  module.exports = app;