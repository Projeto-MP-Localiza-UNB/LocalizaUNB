export default class FormService {
  static validateEmail(email) {
    const regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    return regexp.test(email);
  }

  static validatePassword(password, confirm = false, repeat = '') {
    if (confirm) {
      return !!password && !!repeat && repeat === password;
    }
    return !!password;
  }

  static validateName(name) {
    return !!name && name.length <= 50;
  }
}
