export default class Cart {
  cartItems = []; // [{product: {...}, count: N}]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (product !== null && product !== undefined) {
      let productExists = this.cartItems.find(item => item.product.id === product.id);
      let cartItem = null;

      if (!productExists) {
        cartItem = {'product': product, 'count': 1};
        this.cartItems.push(cartItem);
      } else {
        productExists.count++;
        cartItem = productExists;
      }

      this.onProductUpdate(cartItem);
    }    
  }

  updateProductCount(productId, amount) {
    let cartItem = null;

    this.cartItems.forEach((item, index) => {
      if (item.product.id === productId) {
        item.count += amount;
        if (item.count < 1) {
          this.cartItems.splice(index, 1);
        }
        cartItem = item;
      }
    });

    this.onProductUpdate(cartItem);    
  }

  isEmpty() {
    for (let product of this.cartItems) {
      return false;
    }

    return true;
  }

  getTotalCount() {
    let count = this.cartItems.map(item => item.count);

    let totalCount = count.reduce((sum, current) => sum + current, 0);

    return totalCount;
    
  }

  getTotalPrice() {
    let price = this.cartItems.map(item => item.product.price * item.count);

    let totalPrice = price.reduce((sum, current) => sum + current, 0);

    return totalPrice;
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

