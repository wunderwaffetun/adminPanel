import { Router } from "express";
import { controller } from "../controllers/auth.controller.js";
import { authJwt } from "../middleware/authJwt.js";

const authRouter = new Router()


authRouter.post('/api/auth/signin', controller.signIn)
authRouter.get('/api/auth/refresh', authJwt.updateTokens)
authRouter.get('/api/auth/reset', authJwt.resetToken)

export { authRouter }