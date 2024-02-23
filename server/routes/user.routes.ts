import Express from "express";
import { RegistrationUser, activateUser, loginUser, logoutUser } from "../controllers/user.controller";
import { isAuthenticated } from "../middleware/auth";

const userRouter = Express.Router();

userRouter.post("/registration", RegistrationUser);
userRouter.post("/active-user", activateUser);
userRouter.post("/login", loginUser);
// Apply isAuthenticated middleware to routes that require authentication
userRouter.get("/logout", isAuthenticated, logoutUser);
userRouter.get("/logout",logoutUser);


export default userRouter;
