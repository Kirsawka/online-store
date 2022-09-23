import { CartValues } from "Types";
import './cart.css';

class Cart {
  cartValues: CartValues = JSON.parse(<string>localStorage.getItem('cartValues')) ?? {};
  id: string[] = this.cartValues.id ?? [];

  getAddToCartClick() {
    const cardsContainer = document.querySelector('.cards') as HTMLElement;
    cardsContainer.addEventListener('click', event => this.getCartValues(event));
  }

  getCartValues(event: MouseEvent) {
    const target = event.target as HTMLElement;
    const card = target.closest('.card') as HTMLElement;
    const cartIcon = target.closest('.card__cart-icon') as HTMLElement;

    if (cartIcon) {
      cartIcon.classList.toggle('checked');
      if (cartIcon.classList.contains('checked')) {
        if (!this.id) this.id = [];
        this.id.push(card.id);
      } else {
        this.id.splice(this.id.indexOf(card.id), 1);
      }
      this.cartValues.id = this.id;
    }
    localStorage.setItem('cartValues', JSON.stringify(this.cartValues));
    this.addToCart();
  }

  addCheckedClass() {
    const cartIcons = document.querySelectorAll('.card__cart-icon');
    cartIcons.forEach(elem => {
      const card = elem.closest('.card') as HTMLElement;
      if (this.cartValues.id && this.cartValues.id.includes(card.id)) {
        elem.classList.add('checked');
      }
    });
  }

  addToCart() {
    const counterWrapper = document.getElementById('counter-wrapper') as HTMLElement;
    const cartCounter = document.getElementById('cart-counter') as HTMLElement;

    if (this.id.length) {
      counterWrapper.classList.remove('empty');
      if (cartCounter) {
        cartCounter.textContent = this.id.length.toString();
      }
    }

    if (!this.id.length) {
      counterWrapper.classList.add('empty');
    }

    if (this.id.length > 10) {
      counterWrapper.classList.add('full');
      cartCounter.classList.add('full');
      cartCounter.textContent = 'Извините, все слоты заполнены';
    } else {
      counterWrapper.classList.remove('full');
      cartCounter.classList.remove('full');
    }
  }

  isExist() {
    return !!JSON.parse(<string>localStorage.getItem('cartValues'));
  }
}

export default Cart;