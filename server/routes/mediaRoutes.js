import express from "express"
import auth from "../middleware/auth.js";
import { acceptReqController, friendReqController } from "../controller/friendshipController.js";
import { commentController, doPostController, likeController, sharesController, unlikeController, getUserPost, getAllPost } from "../controller/Post.js";

const router=express.Router();

router.get("/post/:id", getUserPost);
router.get("/post", getAllPost);
router.post("/sendreq", auth, friendReqController);
router.post("/accpetreq", auth, acceptReqController);
router.post("/post/:id/comment", auth, commentController);
router.patch("/post/:id/like", auth, likeController);
router.patch("/post/:id/unlike", auth, unlikeController);
router.patch("/post/:id/share", auth, sharesController);
router.post("/post", auth, doPostController);


export default router;