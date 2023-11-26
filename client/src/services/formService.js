export default class FormService {
  static apiURL = 'http://localhost:5000';

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

  static validateSearchForm(searchInput) {
    const searchInputRegexp = /^.{1,}$/;
    return !searchInputRegexp.test(searchInput);
  }

  static async get(resource, params = '') {
    const url = `${this.apiURL}/${resource}/${params}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
}
