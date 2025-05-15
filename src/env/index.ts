function envKeyIsInvalidOrMissing(key: string): never {
  throw new Error(`Environment variable ${key} is invalid or missing`);
}

export const BACKEND_URL: string = "" + (import.meta.env.VITE_BACKEND_URL || envKeyIsInvalidOrMissing('VITE_BACKEND_URL'));

export const FRONTEND_AUDIOCALL_URL: string = "" + (import.meta.env.VITE_FRONTEND_AUDIOCALL_URL || envKeyIsInvalidOrMissing('VITE_FRONTEND_AUDIOCALL_URL'));
