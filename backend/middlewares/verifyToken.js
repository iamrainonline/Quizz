import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
   const token = req.cookies.jwt;
   try {
      const secret = "SecretKey";
      const decoded = jwt.verify(token, secret);
      req.user = decoded;

      next();
   } catch (error) {
      res.status(401).json({
         status: "error",
         error: "Invalid token",
      });
   }
};
