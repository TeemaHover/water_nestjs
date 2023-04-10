import appConfig from "src/config/app.config";

export const jwtConstants = {
  secret: appConfig().appSecret,
};
