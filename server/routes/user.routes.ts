import  Express from "express";
import { RegistrationUser, activateUser, loginUser, logoutUser } from "../controllers/user.controller";

const userRouter = Express.Router();

userRouter.post("/registration", RegistrationUser);
userRouter.post("/active-user", activateUser);
userRouter.post("/login", loginUser);
userRouter.get("/logout", logoutUser);

export default userRouter;