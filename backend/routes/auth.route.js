import express from 'express';
import { 
    logout, 
    login, 
    signup, 
    verifyEmail, 
    forgotPassword, 
    resetPassword, 
    checkAuth 
} from '../controllers/auth.controller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

router.get("/check-auth",verifyToken, checkAuth);

//อย่าลืมใส่ router ใน import ด้วย
router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);

router.post("/verify-email", verifyEmail);
router.post("/forgot-password", forgotPassword);

router.post("/reset-password/:token", resetPassword);//เปลี่ยนคำว่าtokenเป็นคำอื่นได้

export default router;