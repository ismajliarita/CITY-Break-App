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
  
  try {
    token = jwt.sign({ 
      id: user.dataValues.id,
      email: user.dataValues.email,
      isAdmin: user.dataValues.isAdmin,
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to signup user' });
  }

  res.status(200).json({ data: { user, token } });
}

async function getUser(req, res, next) {
  try{
    const userId = req.params.id;
    const user = await UsersRepo.getUser(userId);
    res.status(200).json({ data: user });
  }catch(error){
    next(error);
  }
}

async function loginUser(req, res, next) {
  const userData = req.body;
  const user = await UsersRepo.loginUser(userData);
  let token;

  try {
    token = jwt.sign({ 
      id: user.dataValues.id,
      email: user.dataValues.email,
      isAdmin: user.dataValues.isAdmin,
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to login user' });
  }

  res.status(200).json({ data: { user, token } });
}

async function getAllUsers(req, res, next) {
  try{
    const userId = req.jwtUserId;
    const admin = await UsersRepo.getUser(userId);
    
    if(!admin.dataValues.isAdmin){
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const users = await UsersRepo.getAllUsers();
    res.status(200).json({ data: users });
  }catch(error){
    next(error);
  }
}

async function deleteUser(req, res, next) {
  try{
    const adminId = req.jwtUserId;
    const userId = req.params.id;
    const admin = await UsersRepo.getUser(adminId);
    if(!admin.isAdmin){
      return res.status(401).json({ error: 'Unauthorized' });
    }
    await UsersRepo.deleteUser(userId);
    res.status(200).json({ data: 'User deleted' });
  }
  catch(error){
    next(error);
  }
}

module.exports = {
  getUsers,
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
}