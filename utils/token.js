import jwt from "jsonwebtoken";
import { authTokenSchema } from "../validation/token.validation";
import env from "dotenv";

env.config();

export async function generateAuthToken(payload) {
  const validationResult = await authTokenSchema.safeParseAsync(payload);
  if (validationResult.error) {
    throw new Error("Invalid token payload");
  }

  const payload = validationResult.data;

  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });
  return token;
}
