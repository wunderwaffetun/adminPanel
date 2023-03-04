import { authJwt } from "../middleware/authJwt.js";
import { controller } from "../controllers/user.conrollers.js";
import { Router } from "express";
import { verifySignUp } from "../middleware/verifySignUp.js";


const userRouter = new Router()

userRouter.post('/api/db/add', 
[
    authJwt.verifyToken,
    authJwt.isDir,
    verifySignUp.checkDuplicateLogin,
    verifySignUp.checkRoleExists
], 
controller.addUser
);
userRouter.get('/api/dashboard/get-users', [authJwt.verifyToken], controller.viewBoard)
userRouter.delete('/api/db/delete/:login', [authJwt.verifyToken, authJwt.isDir], controller.deleteUser)
userRouter.put('/api/db/change/:login', [authJwt.verifyToken, authJwt.isDirOrCodir], controller.changeUser)


export { userRouter }