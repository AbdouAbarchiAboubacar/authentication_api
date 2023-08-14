import express from "express";
import cors from "cors";
const http = require("http");
import * as errorHandlers from "@handlers/errorHandlers";

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("@routes/main.routes"));
app.use(require("@routes/authentication.routes"));
app.use(errorHandlers.notFound);
//

const server = http.createServer(app);
export default app;
