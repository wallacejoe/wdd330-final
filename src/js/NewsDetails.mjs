import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class NewsDetails {
  constructor(articleId, dataSource) {
    this.articleId = articleId;
    this.article = {};
    this.dataSource = dataSource;
  }
  init() {
    const list = getLocalStorage("so-articles")
    this.article = this.dataSource.findArticleById(this.articleId, list);
    this.renderArticleDetails("main");
    document
      .getElementById("addToFavorites")
      .addEventListener("click", this.addToFavorites.bind(this));
  }
  addToFavorites() {
    let favorites = getLocalStorage("so-favorites") || [];
    favorites.push(this.article);
    setLocalStorage("so-favorites", favorites);
  }

  renderArticleDetails(selector) {
    const article = this.article;
    const element = document.querySelector(selector);
    let image;

    if (article.creator == null) {
      article.creator = "Unknown"
    }
    if (article.title == null) {
      article.title = "No Title"
    }
    if (article.image_url == null) {
      image = "Image not found"
    }
    else {
      `<img
        src="${article.image_url}"
        alt="Image of ${article.title}"/>`
    }

    const template = `<section class="article-detail">
        <h3>${article.creator}</h3>
        <h2>${article.title}</h2>
        ${image}
        <p class="article__content">
        ${article.content}
        </p>
        <div class="article-detail__add">
            <button id="addToFavorites" data-id="${article.article_id}">Add to favorites</button>
        </div></section>`;

    element.insertAdjacentHTML("afterbegin", template);
  }
}
