import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    FirstName: {
      type: String,
      required: true,
     },
    MiddleName: {
      type: String,
    },
    LastName: {
      type: String,
      required: true,
     },
     userName:{
      type:String,
      required:true,
      unique:true
     },
    DOB: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    Occupation: {
      type: String,
    },
    Company: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
