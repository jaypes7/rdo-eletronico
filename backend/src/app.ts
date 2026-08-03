import express from "express";
import { healthRouter } from "./routes/health.routes.js";
import { loginRouter } from "./routes/auth.routes.js"

const app = express();

app.use(express.json());
app.use(healthRouter);
app.use("/auth", loginRouter)

export default app;