const videoController = require("../controllers/video.controller");
const upload = require("../lib/multerConfig");

const router = require("express").Router();

router.post(
  "/createVideo",
  upload.single("video"),
  videoController.create
);


router.get("/getAllVideos/:id", videoController.getVideo);

router.put(
  "/updateVideos/:id",
  upload.single("video"),
  videoController.updateVideo
);

router.delete("/deleteVideo/:id", videoController.deleteVideo);



module.exports = router;
