import express from "express"
import auth from "../middleware/auth.js";
import { acceptReqController, friendReqController } from "../controller/friendshipController.js";
import { commentController, doPostController, likeController, sharesController, unlikeController, getUserPost, getAllPost } from "../controller/Post.js";
import multer from "multer";

const router=express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  });
  const upload = multer({ storage });

router.get("/post/:id", getUserPost);
router.get("/post", getAllPost);
router.post("/sendreq", auth, friendReqController);
router.post("/accpetreq", auth, acceptReqController);
router.post("/post/:id/comment", auth, commentController);
router.patch("/post/:id/like", auth, likeController);
router.patch("/post/:id/unlike", auth, unlikeController);
router.patch("/post/:id/share", auth, sharesController);
router.post("/post", auth, upload.single("media"), doPostController);


export default router;