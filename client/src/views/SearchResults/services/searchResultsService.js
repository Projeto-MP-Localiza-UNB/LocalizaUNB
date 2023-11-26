export default class SearchResultsService {
  static getNumberOfPages(length) {
    return Math.ceil(length / 9);
  }

  static getGridPages(results) {
    const pages = [];
    for (let i = 0; i < this.getNumberOfPages(results.length); i++) {
      pages.push(results.slice(i * 9, 9 * (i + 1)));
    }
    return pages;
  }
}
