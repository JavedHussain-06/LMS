import  Express from "express";
import { RegistrationUser } from "../controllers/user.controller";

const userRouter = Express.Router();

userRouter.route("/registration").post(RegistrationUser);

export default userRouter;