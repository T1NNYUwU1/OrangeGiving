const express = require('express');
const router = express.Router();
const User = require('../models/User.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../middleware/token.js');
const sendMail = require('../utils/sendMail.js'); // ใช้ส่ง OTP
const upload = require('../middleware/Image.js');
const Donation = require('../models/Donation.js');
const mongoose = require('mongoose');

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      email,
      phone_number,
      password,
      street_address,
      country,
      state,
      postal_code,
    } = req.body;

    // Check required fields
    if (!first_name || !last_name || !email || !phone_number || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    // Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = String(Math.floor(100000 + Math.random() * 900000));

    // Save User to Database
    const user = new User({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
      street_address,
      country,
      state,
      postal_code,
      verificationOTP: otp,
      verificationOTPExpires: Date.now() + 10 * 60 * 1000, // OTP expires in 10 minutes
    });

    await user.save();

    // Send OTP to User Email
    await sendMail(
      email,
      "Verify Your Email - OrangeGive",
      `Your OTP for email verification is: <strong>${otp}</strong><br/>
      <strong>This OTP will expire in 10 minutes.</strong>`
    );

    res
      .status(201)
      .json({ message: "User registered successfully. Please verify your email." });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});

// Verify OTP
router.post("/verify-email", async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Check if user exists
    const user = await User.findOne({
      email,
      verificationOTP: otp, // Compare OTP
      verificationOTPExpires: { $gt: Date.now() }, // OTP not expired
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid OTP or OTP has expired." });
    }

    // Update User Verification Status
    user.isVerified = true;
    user.verificationOTP = undefined;
    user.verificationOTPExpires = undefined;

    await user.save();

    res.status(200).json({ message: "Email verified successfully!" });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);
    res.status(500).json({ message: "Server error" });
  }
});


//login
router.post('/login', async (req, res) => {
  try {
      const { email, password } = req.body;

      // Find the user by email
      const user = await User.findOne({ email });
      if (!user) {
          return res.status(404).json({ message: 'User not found' });
      }

      // Compare the provided password with the stored hash
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
      if (!isPasswordCorrect) {
          return res.status(401).json({ message: 'Password is incorrect' });
      }

      // Load the JWT_SECRET from environment variables
      const secret = process.env.JWT_SECRET;
      if (!secret) {
          return res.status(500).json({ message: 'JWT Secret is not configured on the server' });
      }

      // Generate a JWT token
      const token = jwt.sign({ id: user._id, email: user.email }, secret, { expiresIn: '24h' });

      // Respond with the token
      res.status(200).json({ token });
  } catch (err) {
      // Handle unexpected errors
      console.error("Error during login:", err.message);
      res.status(500).json({ message: 'Server error' });
  }
});

//logout
router.post('/logout', verifyToken, (req, res) => {
    res.clearCookie('token');
    res.status(200).json({ message: 'Logged out' });
  }
);

// Request Password Reset OTP
router.post('/forgot-password', async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }

    // ตรวจสอบว่า User มีอยู่หรือไม่
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // สร้าง OTP ใหม่
    const otp = String(Math.floor(100000 + Math.random() * 900000));
    user.resetPasswordOTP = otp;
    user.resetPasswordOTPExpires = Date.now() + 10 * 60 * 1000; // หมดอายุ 10 นาที

    await user.save();

    // ส่ง OTP ผ่านอีเมล
    await sendMail(
      email,
      'Password Reset OTP',
      `Your OTP for password reset is: <strong>${otp}</strong><br/>
      <strong>This OTP will expire in 10 minutes.</strong>`
    );

    res.status(200).json({
      message: 'Password reset OTP sent to your email',
    });
  } catch (error) {
    console.error('Error during forgot-password:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/verify-reset-otp', async (req, res) => {
  try {
    const { email, otp } = req.body;

    // ตรวจสอบว่าข้อมูลถูกส่งมาครบ
    if (!email || !otp) {
      return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    // ค้นหาผู้ใช้จาก email และ OTP ในฐานข้อมูล
    const user = await User.findOne({
      email,
      resetPasswordOTP: otp,
      resetPasswordOTPExpires: { $gt: Date.now() }, // ตรวจสอบว่า OTP ยังไม่หมดอายุ
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired OTP.' });
    }

    // ล้าง OTP หลังจากยืนยันสำเร็จ
    user.resetPasswordOTP = null;
    user.resetPasswordOTPExpires = null;

    await user.save();

    res.status(200).json({ message: 'OTP verified successfully. You may now reset your password.' });
  } catch (error) {
    console.error('Error verifying OTP:', error.message);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/reset-password', async (req, res) => {
  try {
    const { email, newPassword, confirmPassword } = req.body;

    // ตรวจสอบข้อมูลที่จำเป็น
    if (!email || !newPassword || !confirmPassword) {
      return res.status(400).json({ message: 'Email, newPassword, and confirmPassword are required.' });
    }

    // ตรวจสอบว่ารหัสผ่านตรงกันหรือไม่
    if (newPassword !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match.' });
    }

    // ค้นหาผู้ใช้จาก email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // แฮชรหัสผ่านใหม่
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    // แจ้งเตือนทางอีเมลว่ารหัสผ่านเปลี่ยนสำเร็จ
    await sendMail(
      user.email,
      'Password Reset Successful - OrangeGive',
      `<p>Your password has been successfully reset. If you did not initiate this request, please contact our support immediately.</p>`
    );

    res.status(200).json({ message: 'Password reset successfully and email notification sent.' });
  } catch (error) {
    console.error('Error resetting password:', error.message);
    res.status(500).json({ message: 'An error occurred while resetting the password.' });
  }
});

// Delete Profile Image
router.delete('/profile-image', verifyToken, async (req, res) => {
  try {
      const userId = req.user.id;

      const user = await User.findById(userId);
      if (!user) {
          return res.status(404).json({ message: 'User not found.' });
      }

      // รีเซ็ตเป็นรูปภาพ default
      user.image = 'default_profile.png';
      await user.save();

      res.status(200).json({ message: 'Profile image removed and set to default.', image: user.image });
  } catch (error) {
      console.error('Error removing profile image:', error.message);
      res.status(500).json({ message: 'Server error.' });
  }
});

// Update Profile Image
router.put('/profile-image', verifyToken, upload.single('image'), async (req, res) => {
  try {
    const userId = req.user.id; // ดึง ID จาก Token

    // ตรวจสอบว่าไฟล์ถูกอัปโหลด
    if (!req.file) {
      return res.status(400).json({ message: 'No image file uploaded.' });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // อัปเดตฟิลด์ image ใน User เป็น path ของไฟล์ที่อัปโหลด
    user.image = `/images/${req.file.filename}`;
    await user.save();

    res.status(200).json({ 
      message: 'Profile image updated successfully.', 
      image: user.image 
    });
  } catch (error) {
    console.error('Error updating profile image:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// GET User Profile
router.get('/profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; 

    // ค้นหาข้อมูล User โดยไม่รวม password
    const user = await User.findById(userId).select('-password -resetPasswordOTP -resetPasswordOTPExpires -verificationOTP -verificationOTPExpires');

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.status(200).json({ 
      message: 'User profile fetched successfully.', 
      user // ข้อมูล user
    });
  } catch (error) {
    console.error('Error fetching user profile:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

// Update User Information
router.put('/update-profile', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id; // ดึง ID จาก Token ที่ถูกตรวจสอบแล้ว
    const {
      first_name,
      last_name,
      phone_number,
      street_address,
      country,
      state,
      postal_code,
    } = req.body;

    // ค้นหาผู้ใช้ในระบบ
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // อัปเดตข้อมูลที่ส่งมา (เฉพาะที่มีค่า)
    if (first_name) user.first_name = first_name;
    if (last_name) user.last_name = last_name;
    if (phone_number) user.phone_number = phone_number;
    if (street_address) user.street_address = street_address;
    if (country) user.country = country;
    if (state) user.state = state;
    if (postal_code) user.postal_code = postal_code;

    // บันทึกข้อมูลใหม่ลงในฐานข้อมูล
    await user.save();

    res.status(200).json({
      message: 'User profile updated successfully.',
      user: {
        first_name: user.first_name,
        last_name: user.last_name,
        phone_number: user.phone_number,
        street_address: user.street_address,
        country: user.country,
        state: user.state,
        postal_code: user.postal_code,
      },
    });
  } catch (error) {
    console.error('Error updating user profile:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});

router.get('/history', verifyToken, async (req, res) => {
  try {
    const userId = req.user.id;

    const donations = await Donation.find({ user_id: userId }).populate('project_id', 'title goal');

    if (!donations || donations.length === 0) {
      return res.status(404).json({ message: 'No donations found for this user.' });
    }

    res.status(200).json({
      message: 'Donation history fetched successfully.',
      donations
    });
  } catch (error) {
    console.error('Error fetching donation history:', error.message);
    res.status(500).json({ message: 'Server error.' });
  }
});



module.exports = router;