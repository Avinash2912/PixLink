import jwt from "jsonwebtoken";
import { authTokenSchema } from "../validation/token.validation.js";
import env from "dotenv";

env.config();

export async function generateAuthToken(payload) {
  const validationResult = await authTokenSchema.safeParseAsync(payload);
  if (validationResult.error) {
    throw new Error("Invalid token payload");
  }

  const validPayload = validationResult.data;

  const token = jwt.sign(validPayload, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });
  return token;
}

export function ValidateUserToken (token) {
  const payload = jwt.verify(token, process.env.JWT_SECRET);

  if (!payload) {
    throw new Error("Invalid token");
  }

  return payload;
}