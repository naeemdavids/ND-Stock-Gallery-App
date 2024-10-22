// Import `cleanEnv` and `str` from the `envalid` library, which helps validate and sanitize environment variables.
import { cleanEnv, str } from "envalid";

// Use `cleanEnv` to validate and clean the environment variables.
// It ensures that `PEXELS_API_KEY` exists and is a valid string.
// If the environment variable is missing or invalid, it will throw an error during runtime, ensuring the app doesn't run with invalid config.
const env = cleanEnv(process.env, {
  PEXELS_API_KEY: str(), // Validate that `PEXELS_API_KEY` is a string.
});

// Export the `env` object so it can be used throughout the app to access the sanitized environment variables.
export default env;
