const Video = require("../models/video.model");

const cloudinary = require("../lib/cloudinary");



exports.create = async function (req, res) {
  try {
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "video",
    });

    const image = cloudinary.url(result.public_id + ".jpg", {
      start_offset: "2",
      resource_type: "video",
      duration: "2",
    });
    let video = new Video({
      name: req.body.name,
      cloudinary_id: result.public_id,
      url: result.secure_url,
      image: image,
      duration: result.duration,
    });
    await video.save();
    res.status(200).json({ code: 200, success: true, data: video });
  } catch (err) {
    console.log(err);
  }
};

exports.getVideo = function (req, res) {
  try {
    Video.findById(req.params.id, function (err, videos) {
      if (err) {
        res
          .status(200)
          .json({ code: 200, success: false, data: "Invalid ID!" });
      }
      res.status(200).json({ code: 200, success: true, data: videos });
    });
  } catch (error) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};




exports.updateVideo = async function (req, res) {
  try {
    let video = await Video.findById(req.params.id);
    // Delete video from cloudinary
    await cloudinary.uploader.destroy(video.cloudinary_id, {
      invalidate: true,
      resource_type: "video",
    });
    // Upload video to cloudinary
    let result, image;
    if (req.file) {
      result = await cloudinary.uploader.upload(
        req.file.path,
        { resource_type: "video", folder: "video" },
        function (error, result) {
          console.log(result, error);
        }
      );
      image = cloudinary.url(result.public_id + ".jpg", {
        start_offset: "2",
        resource_type: "video",
        duration: "2",
      });
    }
    const data = {
      name: req.body.name || video.name,
      cloudinary_id: result?.public_id || video.cloudinary_id,
      url: result?.secure_url || video.url,
      image: image || video.image,
      duration: result?.duration || video.duration,
      category: req.body.category || video.category,
      des: req.body.des || video.des,
    };
    video = await Video.findByIdAndUpdate(req.params.id, data, { new: true });

    res
      .status(200)
      .json({
        code: 200,
        success: true,
        data: video,
        message: "Update Successfully",
      });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};

exports.deleteVideo = async function (req, res) {
  try {
    // Find user by id
    let video = await Video.findById(req.params.id);
    // Delete video from cloudinary
    await cloudinary.uploader.destroy(video.cloudinary_id, {
      invalidate: true,
      resource_type: "video",
    });
    // Delete video from db
    await video.remove();
    res.status(200).json({ code: 200, success: true, data: "Video Deleted!" });
  } catch (err) {
    res
      .status(500)
      .json({ code: 500, success: false, message: "Internal Server Error" });
  }
};


