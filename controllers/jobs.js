const Jobs = require("../modals/Jobs");
const { StatusCodes } = require("http-status-codes");
const { NotFoundError } = require("../errors");

const getAllJobs = async (req, res) => {
  const jobs = await Jobs.find({ createdBy: req.user.userId }).sort(
    "createdBy"
  );
  res.status(StatusCodes.OK).json({ jobs });
};

const getSingleJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req;

  const job = await Jobs.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new notFoundError(`NO job found with id ${jobId}`);
  }

  res.status(StatusCodes.OK).json({ job });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;
  const job = await Jobs.create(req.body);
  res.status(StatusCodes.CREATED).json({ job });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    user: { userId },
    params: { id: jobId },
  } = req

  if (company === '' || position === '') {
    throw new BadRequestError('Company or Position fields cannot be empty')
  }
  const job = await Jobs.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  )
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
}

const deleteJob = async (req, res) => {
  const {
    user: { userId },
    params: { id: jobId },
  } = req

  const job = await Jobs.findByIdAndDelete(
    { _id: jobId, createdBy: userId },
  )
  if (!job) {
    throw new NotFoundError(`No job with id ${jobId}`)
  }
  res.status(StatusCodes.OK).json({ job })
};

module.exports = {
  getAllJobs,
  getSingleJob,
  createJob,
  updateJob,
  deleteJob,
};
