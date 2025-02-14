import { User, UserManager } from "oidc-client-ts";
import { Settings } from "@/common";

class AuthService {
  readonly userManager: UserManager;

  constructor() {
    this.userManager = new UserManager({
      authority: Settings.VITE_OIDC_AUTHORITY,
      client_id: Settings.VITE_OIDC_CLIENT_ID,
      response_type: Settings.VITE_OIDC_RESPONSE_TYPE,
      redirect_uri: Settings.VITE_OIDC_REDIRECT_URI,
      post_logout_redirect_uri: Settings.VITE_OIDC_POST_LOGOUT_REDIRECT_URI,
      scope: Settings.VITE_OIDC_SCOPES,
      response_mode: Settings.VITE_OIDC_RESPONSE_MODE as "query",
    });
  }

  public async login(): Promise<void> {
    await this.userManager.signinRedirect();
  }

  public async loginCallback(): Promise<User> {
    return await this.userManager.signinRedirectCallback();
  }

  public async logout(): Promise<void> {
    await this.userManager.signoutRedirect();
  }

  public async getUser(): Promise<User | null> {
    return await this.userManager.getUser();
  }
}

const authService = new AuthService();

export { authService as AuthService };
