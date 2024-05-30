const UsersRepo = require("../repositories/usersRepository");
const jwt = require('jsonwebtoken');
const { sendEmail } = require("../util/emailer");
const crypto = require('crypto');


async function getUsers(req, res, next) {
  try{
    const users = await UsersRepo.getUsers();
    res.status(200).json({ data: users });
  }catch(error){
    next(error);
  }
}

async function verifyEmail(req, res, next) {
  console.log("verifyEmail in controller");
  try{
    const verificationCode = req.body.verificationCode;
    const user = await UsersRepo.verifyEmail(verificationCode);

    res.status(200).json({ user });
  }catch(error){
    next(error);
  }
}

async function createUser(req, res, next) {
  console.log("createUser in controller");
  const email = req.body.email;
  const username = req.body.username;
  const password = req.body.password;
  const verificationCode = crypto.randomBytes(14).toString('hex');
  // console.log("verificationCode: ", verificationCode, " email: ", email, " username: ", username, " password: ", password);
  try {
    const user = await UsersRepo.createUser({email, username, password, verificationCode});
    // console.log("user created: ", user);
    const token = jwt.sign({ 
      id: user.dataValues.id,
      email: user.dataValues.email,
      isAdmin: user.dataValues.isAdmin,
    }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    
    sendEmail(email, verificationCode).then(() => {
      console.log("Email sent");
      return res.status(200).json({ data: { user, token } });
    }
    ).catch((error) => {
      return res.status(500).json({ error: 'Failed to send email' });
    });

  } catch (error) {
    return res.status(500).json({ error: 'Failed to signup user' });
  }
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

    if(adminId == userId){
      const response = await UsersRepo.deleteUser(userId);
      res.status(200).json({ data: response });
    }else{
      const admin = await UsersRepo.getUser(adminId);
      if(!admin.isAdmin){
        return res.status(401).json({ error: 'Unauthorized' });
      }
      const response = await UsersRepo.deleteUser(userId);
      res.status(200).json({ data: response });
    }
  }
  catch(error){
    next(error);
  }
}

async function changeUsername(req, res, next) {
  try{
    const userId = req.params.id;
    const username = req.body.newUsername;
    
    await UsersRepo.changeUsername(userId, username);
    res.status(200).json({ data: 'Username changed' });
  }
  catch(error){
    next(error);
  }
}

async function changePassword(req, res, next) {
  try{
    const userId = req.params.id;
    const oldPassword = req.body.oldPassword;
    const newPassword = req.body.newPassword;
    
    await UsersRepo.changePassword(userId, oldPassword, newPassword);
    res.status(200).json({ data: 'Password changed' });
  }
  catch(error){
    next(error);
  }
}

module.exports = {
  verifyEmail,
  getUsers,
  createUser,
  loginUser,
  getUser,
  getAllUsers,
  deleteUser,
  changeUsername,
  changePassword,
}