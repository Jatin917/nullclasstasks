import express from "express"
import auth from "../middleware/auth.js";
import { friendReqController } from "../controller/friendReqController.js";

const router=express.Router();

router.post("/sendreq", auth, friendReqController);


export default router;