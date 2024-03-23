import express from "express";
import { addVideo, addView, getVideo, random, sub, trend, getByTags, search } from "../controllers/video.js";
import { verifyToken } from "../verifyToken.js";

const router = express.Router();

//add video
router.post("/", verifyToken, addVideo)

// update video
router.put("/:id", verifyToken, addVideo)

// delete video
router.delete("/:id", verifyToken, addVideo)

// get video
router.get("/find/:id", getVideo)

// add view
router.put("/view/:id", addView)

// trend
router.get("/trend", trend)

// random
router.get("/random", random)

// subscribed videos
router.get("/sub",verifyToken, sub)

// tags
router.get("/tags", getByTags)

//search
router.get("/search", search)
export default router;
