/**
 * Classe de encapsulamento dos métodos utilizados por formulários do sistema.
 * Possui métodos de validação de entrada e manipulação de requisições\respostas.
 */
export default class FormService {
  static apiURL = 'http://localhost:5000';

  /**
   * Método para validação de e-mail com base em uma expressão regular.
   * @param {string} email
   * @returns {boolean} **false** caso o e-mail não corresponda ao padrão.
   */
  static validateEmail(email) {
    const regexp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return regexp.test(email);
  }

  /**
   * Método para validação de senha e confirmação de senha.
   * @param {string} password
   * @param {boolean} confirm
   * @param {string} repeat
   * @returns {boolean} **false** caso uma das senhas seja uma _string_ vazia ou distintas.
   */
  static validatePassword(password, confirm = false, repeat = '') {
    if (confirm) {
      return !!password && !!repeat && repeat === password;
    }
    return !!password;
  }

  /**
   * Método para validação de nomes
   * @param {string} name
   * @returns {boolean} **false** caso nome seja uma string vazia ou possua tamanho igual ou maior a 50 caracteres.
   */
  static validateName(name) {
    return !!name && name.length <= 50;
  }

  /**
   * Método para validação de entrada em campo de pesquisa
   * @param {string} searchInput
   * @returns {boolean} **false** caso a entrada possua uma quebra de linha
   */
  static validateSearchForm(searchInput) {
    const searchInputRegexp = /^.{1,}$/;
    return !searchInputRegexp.test(searchInput);
  }

  /**
   * Método para requisições GET à API do projeto.
   * @param {string} resource
   * @param {string} params
   * @returns {Promise} Resposta em formato JSON
   */
  static async get(resource, params = '') {
    const url = `${this.apiURL}/${resource}/${params}`;
    const res = await fetch(url);
    const json = await res.json();
    return json;
  }
}
