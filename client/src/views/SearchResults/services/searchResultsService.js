export default class SearchResultsService {
  static getGridPages(results) {
    const pages = [];
    for (let i = 0; i < Math.ceil(results.length / 9); i++) {
      pages.push(results.slice(i * 9, 9 * (i + 1)));
    }
    return pages;
  }
}
