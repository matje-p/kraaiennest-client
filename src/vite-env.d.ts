/// <reference types="vite/client" />


interface ImportMetaEnv {
    readonly VITE_AUTH0_DOMAIN: string;
    readonly VITE_AUTH0_CLIENT_ID: string;
    // add other environment variables here...
  }
  
  interface ImportMeta {
    readonly env: ImportMetaEnv;
  }