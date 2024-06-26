import "dotenv/config";

import express from "express";
import userRoutes from "./drives/user/routes";
import releaseNotesRoutes from "./drives/release_notes/routes";
const app = express();

const port = process.env.PORT;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(userRoutes);
app.use(releaseNotesRoutes);

app.listen(port, () => console.log(`Server running on port: ${port}`));
