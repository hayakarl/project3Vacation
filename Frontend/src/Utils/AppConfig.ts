// class AppConfig {
//     // public readonly backendUrl = 'http://localhost:4000/api/';
//   public readonly backendUrl = 'http://16.170.52.42:4040/api/';
// }

// export const appConfig = new AppConfig();

class DevelopmentConfig {
  public readonly backendUrl = 'http://localhost:4000/api/';
}

class ProductionConfig {
  public readonly backendUrl = 'http://16.170.52.42:4040/api/';
}

export const appConfig = process.env.REACT_APP_ENVIRONMENT === 'production' ?  new ProductionConfig() : new DevelopmentConfig();


