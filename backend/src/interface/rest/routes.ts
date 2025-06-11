import express from "express";
import cookieParser from "cookie-parser";
import auth from './auth/routes';
import task from './task/routes';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);
app.use("/tasks", task);

const PORT = process.env.PORT || 3000;

const bootstrapServerREST = () => {
    app.listen(PORT, () => console.log(`Rest server running on port ${PORT}`));
}

export default bootstrapServerREST;