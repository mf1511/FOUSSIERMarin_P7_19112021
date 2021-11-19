const express = require('express')
const router = express.Router();
const authCtrl = require('../controllers/auth.controller')
const userCtrl = require('../controllers/user.controller')

// auth
router.post('/register', authCtrl.signUp);
router.post('/login', authCtrl.signIn);
router.get('/logout', authCtrl.logout);



// user display
router.get("/", userCtrl.getAllUsers);
router.get("/:id", userCtrl.userInfo);
router.put("/:id", userCtrl.updateUser);
router.delete('/:id', userCtrl.deleteUser);
router.patch('/follow/:id', userCtrl.follow)
router.patch('/unfollow/:id', userCtrl.unfollow)


module.exports = router