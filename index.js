import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv"
import {contactRoute} from "./routes/contacts.js"
import {authRoute} from "./routes/auth.js"
const app = express();
dotenv.config();

//Middlewares
app.use(cors)
app.use(express.json());

//Route Declerations
app.use("api/contacts/",contactRoute);
app.use("/api/users/",authRoute)

//Connection
mongoose.connect(process.env.URL,{useNewUrlParser: true,useUnifiedTopology: true},
    ()=> console.log("Connected"))

//Port listening
app.listen(process.env.PORT || 5000);