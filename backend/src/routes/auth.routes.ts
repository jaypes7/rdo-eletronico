import { Request, Response, NextFunction, Router } from "express";
import { login } from "../controllers/auth.controller.js";

export const loginRouter = Router();
loginRouter.post('/login', login);

