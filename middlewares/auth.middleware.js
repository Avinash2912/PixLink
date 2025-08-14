import {ValidateUserToken} from '../utils/token.js';


/**
 *
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @param {import("express").NextFunction} next
 */




export function authenticationMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return next();
  }

  if (!authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: " authorization header must start with Bearer " });
  }

  const [_, token] = authHeader.split(" ");

  const payload = ValidateUserToken(token);
  if (!payload) {
    return res.status(403).json({ message: "Forbidden" });
  }
  req.user = payload;
  next();
}
