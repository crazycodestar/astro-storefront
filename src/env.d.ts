/// <reference types="astro/client" />

interface ImportMetaEnv {
  VITE_API_URL_EXAMPLE: string;
  VITE_SECRET_KEY_EXAMPLE: string;
  // Add other environment variables here...
}

declare global {
  interface ImportMeta {
    env: ImportMetaEnv;
  }
}

export {};
