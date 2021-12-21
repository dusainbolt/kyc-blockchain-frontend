export default class Validate {
  static require = (fieldName?: string) => `${fieldName} không được để trống`;

  static email = () => `Vui lòng nhập địa chỉ email hợp lệ`;

  static min = (value: number) => `Bạn phải nhập ít nhất ${value} ký tự`;

  static during = (min: number, max: number) => `Bạn phải nhập từ ${min} đến ${max} ký tự`;

  static notMatch = (fieldName?: string) => `${fieldName} không khớp`;

  static security = (fieldName?: string) => `${fieldName} phải bao gồm cả chữ, số và ký tự đặc biệt`;

  static regexPassword = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;

  static unique = {
    name: 'testUnique',
    message: (fieldName?: string) => `${fieldName} đã tồn tại`,
  };
}
