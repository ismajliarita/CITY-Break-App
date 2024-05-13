const UsersRepo = require("../repositories/usersRepository");
const jwt = require('jsonwebtoken');


async function getUsers(req, res, next) {
  try{
    const users = await UsersRepo.getUsers();
    res.status(200).json({ data: users });
  }catch(error){
    next(error);
  }
}

async function createUser(req, res, next) {
  const userData = req.body;
  const user = await UsersRepo.createUser(userData);
  let token;
  console.log(user.dataValues, "shh", "1h");
  try {
    token = jwt.sign({ id: user.dataValues.id }, "shh", {
      expiresIn: "1h",
    });
  } catch (error) {
    // Return from the function after sending a response
    return res.status(500).json({ error: 'Failed to signup user' });
  }

  res.status(200).json({ data: { user, token } });
}

async function loginUser(req, res, next) {
  try{
    const userData = req.body;
    const user = await UsersRepo.loginUser(userData);

    res.status(200).json({ data: user });
  } catch(error){
    next(error);
  }
}   


module.exports = {
  getUsers,
  createUser,
  loginUser,
}