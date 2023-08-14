import * as express from "express";
import { signUp, signIn } from "@controllers/authentication.controller";

let router = express.Router();
router.post("/signin", signIn);
router.post("/signup", signUp);

module.exports = router;
