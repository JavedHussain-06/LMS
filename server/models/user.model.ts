require("dotenv").config();
import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^@]+$/;

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  avatar: {
    public_id: string;
    url: string;
  };
  role: string;
  isVerified: boolean;
  courses: Array<{ Course: string }>;
  comparePassword: (password: string) => Promise<boolean>;
  SignAccessToken: () => string;
  SignRefreshToken: () => string;
}
const userSchema: Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please Enter Your Name"],
    },
    email: {
      type: String,
      required: [true, "Please Enter Your Email"],
      unique: true,
      validator: function (value: string) {
        return emailRegexPattern.test(value);
      },
      message: "Please Enter Valid Email",
    },
    password: {
      type: String,
      required: [true, "Please Enter Your Password"],
      minlength: [8, "Password should be greater than 8 characters"],
      select: false,
    },
    avatar: {
      public_id: {
        type: String,
        url: String,
      },
      role: {
        type: String,
        default: "user",
      },
      isVerified: {
        type: Boolean,
        default: false,
      },
      courses: [
        {
          courseId: String,
        },
      ],
    },
  },
  { timestamps: true }
);

// Hashing Password Before Saving

userSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign access token

userSchema.methods.SignAccessToken = function () {
  const accessToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.ACCESS_TOKEN || ""
  );
  return accessToken;
};

// Sign refresh token

userSchema.methods.SignRefreshToken = function () {
  const refreshToken = jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN || ""
  );
  return refreshToken;
};

// comparing password

userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};

const userModel: Model<IUser> = mongoose.model<IUser>("User", userSchema);

export default userModel;
