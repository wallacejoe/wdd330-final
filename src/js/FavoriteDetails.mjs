import { getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

export default class FavoriteDetails {
  constructor(listElement) {
    this.listElement = listElement
    this.list = [];
  }
  async init() {
    this.list = getLocalStorage("so-favorites")
    this.renderList(this.list)
    setLocalStorage("so-articles", this.list)
  }
  newsCardTemplate(article) {
    let image
    if (article.image_url == null) {
      image = `<a href="./ArticlePage/articles.html?id=${article.article_id}">View article</a>`
    } else {
      image = `<a href="./ArticlePage/articles.html?id=${article.article_id}">
      <img
      src="${article.image_url}"
      alt="Image of ${article.title}"/></a>`
    }
    return `<li class="news-card">
            <h2 class="card_title">${article.title}</h2>
            ${image}
            <h3 class="card_publisher">${article.creator}</h3>
            <p class="card_snippet">
              ${article.description}
            </p>
            <a href="${article.link}">Go to official site</a>
          </li>`;
  }
  renderList(article) {
    renderListWithTemplate(
      this.newsCardTemplate,
      this.listElement,
      article,
      true
    );
  }
}
