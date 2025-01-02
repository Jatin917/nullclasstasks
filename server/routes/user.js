import express from "express"
import  {googleAuth, login,signup} from '../controller/auth.js'
import { getallusers,updateprofile } from "../controller/users.js";
import auth from "../middleware/auth.js"
import verifyToken from "../middleware/googleToken.js";
import { emailVerificationController, sendOtpEmailController, sendOtpSmsController } from "../controller/OtpController.js";

const router=express.Router();

router.post("/signup",signup);
router.post("/login",login);
router.post("/googleauth", verifyToken,  googleAuth)
router.post("/sendOtpEmail", sendOtpEmailController);
router.post("/sendOtpSms", sendOtpSmsController)
router.post("/emailVerification", emailVerificationController);

router.get("/getallusers",getallusers)

router.patch("/update/:id",auth,updateprofile)


export default router