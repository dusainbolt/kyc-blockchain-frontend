export default class Helper {
  static objValue = (object: any, key: any): any => {
    return object[key];
  };

  static delay = (timeMilliSecond = 1000) => new Promise((resolve) => setTimeout(() => resolve(null), timeMilliSecond));
}
