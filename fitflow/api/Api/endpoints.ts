export class Endpoints {
  private static baseUrl = process.env.EXPO_PUBLIC_API_URL;

  public static auth = {
    login: Endpoints.build('/login'),
    logout: Endpoints.build('/logout'),
    refresh: Endpoints.build('/refresh'),
  };

  public static users = {
    getUsers: Endpoints.build('/users'),
  };

  public static build(path: string, params?: Record<string, string>): string {
    if (!Endpoints.baseUrl) {
      throw new Error('Base URL is not defined. Check your environment variables.');
    }

    let url = `${Endpoints.baseUrl}${path}`;
    if (params) {
      const query = new URLSearchParams(params).toString();
      url += `?${query}`;
    }
    return url;
  }
}
