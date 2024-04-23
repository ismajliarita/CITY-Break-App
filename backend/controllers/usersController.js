const UsersRepo = require("../repositories/usersRepository");

async function getUsers(req, res, next) {
  try{
    const users = await UsersRepo.getUsers();
    res.status(200).json({ data: users });
  }catch(error){
    next(error);
  }
}

async function createUser(req, res, next) {
  try{
    const userData = req.body;
    const user = await UsersRepo.createUser(userData);

    res.status(200).json({ data: user });
  } catch(error){
    next(error);
  }
}

module.exports = {
  getUsers,
  createUser,
}