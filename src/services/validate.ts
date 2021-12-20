export default class Validate {
  static require = (fieldName: any) => `${fieldName} không được để trống`;

  static email = () => `Vui lòng nhập địa chỉ email hợp lệ`;

  static min = (value: number) => `Bạn phải nhập ít nhất ${value} ký tự`;

  static during = (min: number, max: number) => `Bạn phải nhập từ ${min} đến ${max} ký tự`;
}
