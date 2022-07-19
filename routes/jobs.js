const {
  createJob,
  getSingleJob,
  updateJob,
  deleteJob,
  getAllJobs,
} = require("../controllers/jobs");

const express = require("express");
const router = express.Router();

router.route("/").post(createJob).get(getAllJobs);
router.route("/:id").patch(updateJob).delete(deleteJob).get(getSingleJob);

module.exports = router;
