/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_BIBADMIN_HOST: string | undefined;
    readonly VITE_REACT_APP_BIBAPI_HOST: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
