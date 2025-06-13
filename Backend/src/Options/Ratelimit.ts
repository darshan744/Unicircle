import rateLimit from 'express-rate-limit';

export const rateLimiter = rateLimit({
  windowMs: 60 * 1000 * 15,
  max: 100,
  standardHeaders: true,
  legacyHeaders: true
})
