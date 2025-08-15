import express from "express";
import { shortenPostRequestBodySchema } from "../validation/request.validation.js";
import { createShortUrl } from "../services/url.service.js";
import { nanoid } from "nanoid";
import {isAuthenticated} from '../middlewares/auth.middleware.js';
import { getOriginalUrl } from "../services/url.service.js";



const router = express.Router();


router.post("/shorten",isAuthenticated, async (req, res) => {
  const userId = req.user?.id;

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
    const result = await createShortUrl({
      short_url,
      original_url: url,
      user_id: userId
    });
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






router.get("/:shortCode",  async (req, res) => {
  const { shortCode } = req.params;
  console.log(`Fetching original URL for short code: ${shortCode}`);
  try {
    const targeturl = await getOriginalUrl(shortCode);

    console.log(`Original URL for short code ${shortCode}: ${targeturl}`);

    if (!targeturl) {
      return res.status(404).json({ error: "Invalid short URL" });
    }
    // Ensure the URL has a protocol for redirect
    const redirectUrl = /^https?:\/\//.test(targeturl)
      ? targeturl
      : `http://${targeturl}`;
    return res.redirect(redirectUrl);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to fetch original URL", details: error.message });
  }
});




export default router;






