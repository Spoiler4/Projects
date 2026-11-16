
import ratelimit from "../config/upstash.js";

const rateLimiter = async (req, res, next) => {
  try {
    const identifier = req.ip || "anonymous";

    const { success, limit, remaining, reset } =
      await ratelimit.limit(identifier);

    res.setHeader("RateLimit-Limit", limit);
    res.setHeader("RateLimit-Remaining", remaining);
    res.setHeader("RateLimit-Reset", reset);

    if (!success) {
      return res.status(429).json({
        message: "Too many requests. Please try again later.",
      });
    }

    next();
  } catch (error) {
    console.error("Rate limit error:", error);
    next(error);
  }
};

export default rateLimiter;
