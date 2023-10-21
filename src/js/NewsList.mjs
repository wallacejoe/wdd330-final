import { renderListWithTemplate } from "./utils.mjs";

export default class NewsList {
  constructor(dataSource, listElement) {
    //this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list = {};
  }
  async init() {
    this.list = await this.dataSource.getData()
    //this.sortNewsList()
    const articles = this.list.results
    this.renderList(articles)
    document.getElementById("nextPage").setAttribute("value", `${this.list.nextPage}`)
  }
  async initHighlights() {
    this.list = await this.dataSource.getData()
    let articles = []
    articles.push(this.list.results[0])
    articles.push(this.list.results[1])
    this.renderList(articles)
  }
  newsCardTemplate(article) {
    let image
    if (article.image_url == null) {
      image = `<a href="#">View article</a>`
    } else {
      image = `<a href="#">
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
      article
    );
  }
}
