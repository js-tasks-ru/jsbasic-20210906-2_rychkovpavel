export default class Cart {
  cartItems = []; // [{product: {...}, count: N}]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    /* if (this.cartItems.length === 0) {
      this.cartItems.push({'product': product, 'count': 1});
    } */

    if (product !== null && product !== undefined) {
      let productExists = this.cartItems.find(item => item.product.id === product.id);

      if (!productExists) {
        this.cartItems.push({'product': product, 'count': 1});
      } else {
        productExists.count++;
      }

      this.onProductUpdate(this.cartItem);
    }    
  }

  updateProductCount(productId, amount) {
    let id = this.cartItems.map(item => item.product.id).join('');

    for (let item of this.cartItems) {
      if (productId === id) {
        item.count += amount;
        if (item.count < 1) {
          this.cartItems.pop(item);
        }
      }
    }

    this.onProductUpdate(this.cartItem);    
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

