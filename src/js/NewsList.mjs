import { renderWithTemplate, getLocalStorage, renderListWithTemplate, setLocalStorage } from "./utils.mjs";

export default class NewsList {
  constructor(dataSource) {
    //this.category = category;
    this.dataSource = dataSource;
    this.listElement;
    this.list = [];
  }
  async init(element, param = "", search = false) {
    const data = await this.dataSource.getData(param, search)
    data.results.forEach(article => {
      this.list.push(article)
    });
    this.listElement = element
    const articles = this.list
    this.renderList(articles)
    document.getElementById("nextPage").setAttribute("value", `${data.nextPage}`)
    // stores a list of articles to local storage.
    // this allows us to "searchById" without using the api.
    setLocalStorage("so-articles", this.list)
  }
  async initHighlights(element) {
    const data = await this.dataSource.getData()
    let articles = []
    this.listElement = element
    articles.push(data.results[0])
    articles.push(data.results[1])
    this.renderList(articles)
  }
  async initFavorites(element) {
    const data = getLocalStorage("so-favorites") || []
    this.listElement = element
    if (data.length > 0) {
      this.render(data[data.length - 1])
    }
    else {
      this.listElement.textContent = "Your last favorite will be displayed here"
    }
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
  render(article) {
    this.listElement.innerHTML = this.newsCardTemplate(article)
  }
}
