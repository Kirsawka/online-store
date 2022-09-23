import Search from "../controller/search/search";
import Filter from "../controller/filter/filter";
import Sort from "../controller/sort/sort";
import Cart from "../controller/cart/cart";
import RangeFilter from "../controller/filter/rangeFilter/rangeFilter";
import { ICard } from "Types";
import './card.css';


class Cards {
  filter: Filter;
  sort: Sort;
  search: Search;
  cart: Cart;
  rangeSlider: RangeFilter;

  constructor() {
    this.filter = new Filter();
    this.sort = new Sort();
    this.search = new Search();
    this.cart = new Cart();
    this.rangeSlider = new RangeFilter();
  }

  preapareData() {
    let allData = JSON.parse(<string>localStorage.getItem('data'));

    if (this.search.isExist()) {
      allData = this.search.searchingItems(allData);
    }
    if (this.rangeSlider.isExist()) {
      allData = this.rangeSlider.filterItemsWithRange(allData);
    }
    if (this.filter.isExist()) {
      allData = this.filter.filtrationItems(allData);
    }
    if (this.sort.isExist()) {
      this.sort.sortingItems(allData);
    }

    this.renderCards(allData);
    if (this.cart.isExist()) {
      this.cart.addCheckedClass();
    }
  }

  renderCards(data: ICard[]) {
    const cards = document.querySelector('.cards') as HTMLElement;
    cards.innerText = '';
    data.forEach(item => this.render(item, cards));
  }

  render(item: ICard, cards: HTMLElement) {
    const card = document.createElement('div');
    const cardBestseller = document.createElement('div');
    const cardImgWrapper = document.createElement('div');
    const cardImg = document.createElement('img');
    const cardSubtitle = document.createElement('p');
    const cardBuyBlock = document.createElement('div');
    const cardPrice = document.createElement('span');
    const cardCartIcon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const svgUseTag = document.createElementNS("http://www.w3.org/2000/svg", "use");
    const cardYear = document.createElement('p');
    const cardCaseSize = document.createElement('p');

    card.classList.add('card');
    cardImgWrapper.classList.add('card__img-wrapper');
    cardImg.classList.add('card__img');
    cardSubtitle.classList.add('card__subtitle');
    cardBuyBlock.classList.add('card__buy-block');
    cardPrice.classList.add('card__price');
    cardCartIcon.classList.add('card__cart-icon');
    svgUseTag.setAttribute("href", "./assets/sprite.svg#card-cart");
    cardCaseSize.classList.add('card__case-size');
    cardYear.classList.add('card__year');

    cards.appendChild(card);
    card.appendChild(cardImgWrapper);
    cardImgWrapper.appendChild(cardImg);
    card.appendChild(cardSubtitle);
    card.appendChild(cardYear);
    card.appendChild(cardCaseSize);
    card.appendChild(cardBuyBlock);
    cardBuyBlock.appendChild(cardPrice);
    cardBuyBlock.appendChild(cardCartIcon);
    cardCartIcon.appendChild(svgUseTag);

    card.setAttribute('id', item.id);
    cardImg.src = item.img;
    cardSubtitle.innerText = item.name;
    cardPrice.innerText = String(item.price);
    cardYear.innerText = `Год выпуска модели: ${item.year}`;
    cardCaseSize.innerText = `Размер корпуса: ${item.caseSize} мм`;

    if (item.bestseller) {
      card.appendChild(cardBestseller);
      cardBestseller.classList.add('card__bestseller');
      cardBestseller.textContent = 'ХИТ';
    }
  }
}

export default Cards;

