import jwt from "jsonwebtoken";

const adminAuth = (req, res, next) => {
  try {
    const token = req.headers.token;

    console.log("TOKEN VALUE:", token);
    console.log("TOKEN TYPE:", typeof token);

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("DECODED TOKEN:", decoded);

    if (decoded.email !== process.env.ADMIN_EMAIL || decoded.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Admin access only",
      });
    }

    next();
  } catch (error) {
    console.error("AdminAuth Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default adminAuth;
