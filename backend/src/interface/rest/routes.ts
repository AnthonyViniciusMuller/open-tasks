import express from "express";
import cookieParser from "cookie-parser";
import auth from './auth/routes';

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use("/auth", auth);

const PORT = process.env.PORT || 3000;

const bootstrapServerREST = () => {
    app.listen(PORT, () => console.log(`Rest server running on port ${PORT}`));
}

export default bootstrapServerREST;