const { StatusCodes } = require("http-status-codes");
const User = require("../modals/Users");
const { BadRequest, UnAuthorized } = require("../errors");

const registeration = async (req, res) => {
  const user = await User.create({ ...req.body });
  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ msg: { name: user.name }, token });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new BadRequest("Please provide email and password");
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new UnAuthorized("Invalid credentials");
  }

  const isMatch = await user.comparePassword(password);

  if (!isMatch) {
    throw new UnAuthorized("Invalid credentials");
  }

  const token = user.createJWT();
  res.status(StatusCodes.OK).json({ msg: { name: user.name }, token });
};

module.exports = {
  login,
  registeration,
};
