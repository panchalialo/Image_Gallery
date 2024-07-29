import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import dbConnection from "./mongoDb/dbConnection.js";
import uploadRouter from "./routes/uploadRoute.js";
import signInRouter from "./routes/signInRouter.js";
import signUpRouter from "./routes/signUpRouter.js";
import searchRouter from "./routes/searchRouter.js";
import downloadRouter from "./routes/downloadRouter.js";
import googleLoginRouter from "./routes/googleLoginRouter.js";
import session from 'cookie-session';
import passport from 'passport';


dotenv.config();

const app = express();

//middlewares
const corsOptions = {
  origin: '*',// The front-end origin
  credentials: true, // Allow cookies to be sent
  methods:"GET,POST,PUT,DELETE"
};
app.use(cors(corsOptions));
// app.use(bodyParser.json());
app.use(express.json());
app.use(express.static("public"));
app.use(uploadRouter)
app.use(signInRouter)
app.use(signUpRouter)
app.use(searchRouter)
app.use(downloadRouter)
app.use(googleLoginRouter)
app.use(session({
  secret: 'your_session_secret',
  resave: false,
  saveUninitialized: false,
  
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 // 1 day
  }
}));

app.use(passport.initialize());
app.use(passport.session());

const PORT = process.env.PORT || 5000;




app.get("/", (req, res) => {
  res.send("Welcome to backend of image gallery");
});

app.listen(PORT, () => {
  try {
    dbConnection(process.env.MONGO_URI);
    console.log(`server is runnig on http://localhost:${PORT}`);
  } catch (err) {
    console.log(err);
  }
});
