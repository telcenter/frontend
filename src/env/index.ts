function envKeyIsInvalidOrMissing(key: string): never {
  throw new Error(`Environment variable ${key} is invalid or missing`);
}

export const BACKEND_URL: string = "" + (import.meta.env.VITE_BACKEND_URL || envKeyIsInvalidOrMissing('VITE_BACKEND_URL'));
