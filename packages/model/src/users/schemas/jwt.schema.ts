import z from "zod";

export const JwtTokenSchema = z
  .string()
  .regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+$/,
    "Invalid JWT token format",
  );
