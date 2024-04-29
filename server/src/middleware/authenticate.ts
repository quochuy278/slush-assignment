import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"; // Import all members from jsonwebtoken

const verifyJwtToken = (req: any, res: Response, next: NextFunction) => {
  try {
    // Extract authorization header and split on space
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      throw new Error("Authorization header is missing");
    }

    const token = authorizationHeader.split(" ")[1];
    if (!token) {
      throw new Error("Authorization token is missing");
    }

    // Verify the token using 'secretValue' and type assertion
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);

    // Attach decoded user data to the request object
    req.user = decoded;

    next();
  } catch (error) {
    console.log("🚀 ~ authenticate ~ error:", error);
    // Provide more specific error messages for common scenarios
    let errorMessage = "Authentication Failed";
    // if (error.message.includes("expired")) {
    //   errorMessage = "Token has expired. Please re-authenticate.";
    // } else if (error.message.includes("invalid signature")) {
    //   errorMessage = "Invalid token signature.";
    // } else if (error.message.includes("invalid token")) {
    //   errorMessage = "Invalid token format.";
    // }
    res.status(401).json({ message: errorMessage });
  }
};

export default verifyJwtToken;
