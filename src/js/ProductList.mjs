import { renderListWithTemplate } from "./utils.mjs";

export default class ProductListing {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
    this.list = {};
  }
  async init() {
    this.list = await this.dataSource.getData(this.category);
    this.sortProductList();
    document.querySelector(".category-title").innerHTML = this.category;
  }
  productCardTemplate(product) {
    return `<li class="product-card">
            <a href="/product_pages/index.html?product=${product.Id}">
            <img
            src="${product.Images.PrimaryMedium}"
            alt="Image of ${product.Name}"
            />
            <div class="badge-overlay">
            <span class="top-right badge">Sale</span></div>
            <h3 class="card__brand">${product.Brand.Name}</h3>
            <h2 class="card__name">${product.NameWithoutBrand}</h2>
            <p class="product-card__price">
              <span class="product-card__discount">$${product.SuggestedRetailPrice} </span>
              $${product.FinalPrice}
            </p>
          </li>`;
  }
  renderList(list) {
    renderListWithTemplate(
      this.productCardTemplate,
      this.listElement,
      this.filterProducts(list)
    );
  }
  filterProducts(list) {
    let filteredList = list.filter((tent) => tent.FinalPrice != "179.99");
    return filteredList;
  }
  sortProductList() {
    const btnElement = document.getElementById("sortBtn");
    this.list.sort(function (a, b) {
      return a.NameWithoutBrand > b.NameWithoutBrand ? 1 : -1;
    });
    this.renderList(this.list);

    btnElement.addEventListener("click", () => {
      if (btnElement.getAttribute("class") == "sortAlpha") {
        btnElement.setAttribute("class", "sortNum");
        btnElement.innerHTML = "Sort alphabetically";
        this.list.sort(function (a, b) {
          return a.FinalPrice - b.FinalPrice;
        });
      } else {
        btnElement.setAttribute("class", "sortAlpha");
        btnElement.innerHTML = "Sort by price";
        this.list.sort(function (a, b) {
          return a.NameWithoutBrand > b.NameWithoutBrand ? 1 : -1;
        });
      }
      this.listElement.innerHTML = "";
      this.renderList(this.list);
    });
  }
}
