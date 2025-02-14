class Settings {
  readonly VITE_API_BASE_ADDRESS: string = import.meta.env.VITE_API_BASE_ADDRESS;

  readonly VITE_OIDC_AUTHORITY: string = import.meta.env.VITE_OIDC_AUTHORITY;
  readonly VITE_OIDC_CLIENT_ID: string = import.meta.env.VITE_OIDC_CLIENT_ID;
  readonly VITE_OIDC_RESPONSE_TYPE: string = import.meta.env.VITE_OIDC_RESPONSE_TYPE;
  readonly VITE_OIDC_REDIRECT_URI: string = import.meta.env.VITE_OIDC_REDIRECT_URI;
  readonly VITE_OIDC_POST_LOGOUT_REDIRECT_URI: string = import.meta.env.VITE_OIDC_POST_LOGOUT_REDIRECT_URI;
  readonly VITE_OIDC_SCOPES: string = import.meta.env.VITE_OIDC_SCOPES;

  readonly VITE_OIDC_RESPONSE_MODE: string = import.meta.env.VITE_OIDC_RESPONSE_MODE;
}

const settings = new Settings();

export { settings as Settings };
