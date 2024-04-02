import "dotenv/config";

import express from "express";
import userRoutes from "./user/routes";

const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
