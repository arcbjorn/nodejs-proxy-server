import needle from "needle";
import { Router } from "express";
import url from "url";
import apicachse from "apicache";

const router = Router();

// Env vars
const API_BASE_URL = process.env.API_BASE_URL || "";
const API_KEY_NAME = process.env.API_KEY_NAME || "";
const API_KEY_VALUE = process.env.API_KEY_VALUE || "";

// Init cache
let cache = apicachse.middleware;

router.get("/", cache("2 minutes"), async (req, res) => {
  try {
    const params = new URLSearchParams({
      [API_KEY_NAME]: API_KEY_VALUE,
      ...url.parse(req.url, true).query,
    });

    const apiRes = await needle("get", `${API_BASE_URL}?{params}`);
    const data = apiRes.body;

    // Log the req to the public api
    if (process.env.NODE_ENV !== "production") {
      console.log(`REQUEST: ${API_BASE_URL}?${params}`);
    }

    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;
