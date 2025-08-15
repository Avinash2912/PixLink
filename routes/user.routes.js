import express from "express";
import {hashPasswordWithSalt} from '../utils/hash.js';
import {getUserByEmail, createUser} from '../services/user.service.js'
import { signUpPostRequestBodySchema,loginPostRequestBodySchema } from "../validation/request.validation.js";
const router = express.Router();
import env from 'dotenv';
import {generateAuthToken} from '../utils/token.js';






env.config();

router.post("/signup", async (req, res) => {
  // Extract user data from the request body
  const validationResult = await signUpPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res.status(400).json({ errors: validationResult.error.format() });
  }

  const { firstname, lastname, email, password } = validationResult.data;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    return res.status(400).send(`User with this email ${email} already exists`);
  }

  const { userSalt, password: hashedPassword } = await hashPasswordWithSalt(password);

  const user = await createUser({
    firstname,
    lastname,
    email,
    salt: userSalt,
    password: hashedPassword,
  });

  res
    .status(201)
    .json({ data: { userId: user.id }, message: "User created successfully" });
});



router.post("/login", async (req, res) => {

 

  const validationResult = await loginPostRequestBodySchema.safeParseAsync(req.body);

 if (validationResult.error) {
    return res.status(400).json({ errors: validationResult.error.format() });
  }

  const { email, password } = validationResult.data;

  const user = await getUserByEmail(email);

  if (!user) {
    return res.status(404).send("User with this email does not exist");
  }

  const {  password: hashedPassword } = await hashPasswordWithSalt(password, user.salt);

  if (user.password !== hashedPassword) {
    return res.status(401).send("Invalid email or password");
  }

  const token = await generateAuthToken({ id: user.id });
  res.status(200).json({ data: { token }, message: "Login successful" });
});
































export default router;
