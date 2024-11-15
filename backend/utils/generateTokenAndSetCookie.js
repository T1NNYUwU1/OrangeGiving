import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: "7d",
    });

    // ตั้งชื่อไว้ว่า token
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict", // ป้องกัน csrf
        maxAge: 7 * 24 * 60 * 60 * 1000 //24 hours*7
    });

    return token;
};