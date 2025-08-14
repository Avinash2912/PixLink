import express from "express";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { db } from "../db/index.js";
import { urlsTable } from "../models/index.js";
import { nanoid } from "nanoid";

const router = express.Router();

router.post("/shorten", async (req, res) => {
  const userId = req.user?.id;

  if (!userId) {
    return res
      .status(401)
      .json({ error: " You must be logged in to access this resource" });
  }

  const validationResult = await shortenPostRequestBodySchema.safeParseAsync(
    req.body
  );

  if (validationResult.error) {
    return res
      .status(400)
      .json({
        error: "Invalid request body",
        issues: validationResult.error.issues,
      });
  }

  const { url, code } = validationResult.data;

  const short_url = code ?? nanoid(6);

  try {
    const [result] = await db
      .insert(urlsTable)
      .values({
        short_url,
        original_url: url,
        user_id: userId
      })
      .returning({ id: urlsTable.id, short_url: urlsTable.short_url, original_url: urlsTable.original_url });

    return res.status(201).json({
      id: result.id,
      targeturl: result.original_url,
      shortenUrl: result.short_url
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to shorten URL", details: error.message });
  }
});

export default router;
