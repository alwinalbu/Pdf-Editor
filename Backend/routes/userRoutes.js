
const express = require('express');
const router = express.Router();
const { signup, login, uploadPdf,getUserPdfs,logout } = require('../controllers/userController');
const upload = require('../config/multerConfig');
const { authenticateToken } = require('../middlewares/authMiddleware');

router.post('/signup', signup);
router.post('/login', login);
router.post('/upload', authenticateToken, upload.single('file'), uploadPdf);
router.post('/logout', authenticateToken, logout);
router.get('/user-pdfs', authenticateToken, getUserPdfs); 

module.exports = router;
