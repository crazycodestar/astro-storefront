/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_STORE_ID: string;
  readonly PUBLIC_CMS_URL: string;
  // Add other environment variables here...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export {};
