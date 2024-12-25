import express from "express"
import auth from "../middleware/auth.js";
import { acceptReqController, friendReqController } from "../controller/friendshipController.js";

const router=express.Router();

router.post("/sendreq", auth, friendReqController);
router.post("/accpetreq", auth, acceptReqController);


export default router;