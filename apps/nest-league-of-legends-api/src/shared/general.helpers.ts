import * as dotenv from 'dotenv';
dotenv.config();

export class GenHelper {
  public static NODE_ENV = process.env.NODE_ENV;
  public static PORT = parseInt(process.env.PORT) || 4000;
  public static LOL_KEY = process.env.LOL_KEY;
  public static LOL_URL = process.env.LOL_URL || 'api.riotgames.com';
  public static LOL_HEADER = process.env.LOL_HEADER || 'X-Riot-Token';
  public static STATIC_LINK = process.env.STATIC_LINK;

  public static logLolAxios = false;

  public static isDev() {
    return process.env.NODE_ENV === 'development';
  }

  public static isString(data: any) {
    return typeof data === 'string' || data instanceof String;
  }
}
