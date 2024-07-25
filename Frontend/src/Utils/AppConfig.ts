class AppConfig {
    
  //public vacationCount = 2
  public readonly destinationsUrl = 'http://localhost:4000/api/destinations/';
  public readonly registerUrl = 'http://localhost:4000/api/register/';
  public readonly loginUrl = 'http://localhost:4000/api/login/';
}

export const appConfig = new AppConfig();
