import  Express from "express";
import { RegistrationUser, activateUser } from "../controllers/user.controller";

const userRouter = Express.Router();

userRouter.post("/registration", RegistrationUser);
userRouter.post("/active-user", activateUser);
export default userRouter;