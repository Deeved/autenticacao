import "dotenv/config";

import express from "express";
import UserRoutes from "./user/userRoutes";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(UserRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
