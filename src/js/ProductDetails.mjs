import { setLocalStorage, getLocalStorage } from "./utils.mjs";

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    // use our datasource to get the details for the current product. findProductById will return a promise! use await or .then() to process it
    // once we have the product details we can render out the HTML
    // once the HTML is rendered we can add a listener to Add to Cart button
    // Notice the .bind(this). Our callback will not work if we don't include that line. Review the readings from this week on 'this' to understand why.
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails("main");
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addToCart.bind(this));
  }
  addToCart() {
    let cart = getLocalStorage("so-cart") || [];

    // Check if the product is already in the cart
    const existingProductIndex = cart.findIndex(
      (item) => item.Id === this.product.Id
    );

    if (existingProductIndex !== -1) {
      // If the product is already in the cart, increment its quantity
      cart[existingProductIndex].quantity =
        (cart[existingProductIndex].quantity || 1) + 1;
    } else {
      // If the product is not in the cart, add it with quantity 1
      this.product.quantity = 1;
      cart.push(this.product);
    }

    // Update the final price based on quantity
    if (cart[existingProductIndex]) {
      cart[existingProductIndex].FinalPrice =
        (cart[existingProductIndex].FinalPrice || 0) *
        cart[existingProductIndex].quantity;
    }

    setLocalStorage("so-cart", cart);
    document.querySelector(".cart-num").innerHTML = getLocalStorage("so-cart").length;
  }

  renderProductDetails(selector) {
    const product = this.product;
    const element = document.querySelector(selector);

    const template = `<section class="product-detail"> <h3>${product.Brand.Name}</h3>
        <h2 class="divider">${product.NameWithoutBrand}</h2>
        <img
            class="divider"
            src="${product.Images.PrimaryLarge}"
            alt="${product.NameWithoutBrand}"
        />
        <p class="product-card__price">
           <span class="product-card__discount">$${product.SuggestedRetailPrice} </span>
           $${product.FinalPrice}
           <span class="flag-discount">sale</span>
        </p>
        <p class="product__color">${product.Colors[0].ColorName}</p>
        <p class="product__description">
        ${product.DescriptionHtmlSimple}
        </p>
        <div class="product-detail__add">
            <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
        </div></section>`;

    element.insertAdjacentHTML("afterbegin", template);
  }
}
