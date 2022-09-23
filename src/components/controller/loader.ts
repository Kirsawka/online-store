import Cards from "../view/card";
import Sort from "./sort/sort";
import Search from "./search/search";
import Filter from "./filter/filter";
import RangeFilter from "./filter/rangeFilter/rangeFilter";
import Cart from "./cart/cart";
import { ICard } from "Types";

export class Loader {
  card: Cards;
  filter: Filter;
  sort: Sort;
  search: Search;
  cart: Cart;
  rangeSlider: RangeFilter;

  constructor() {
    this.card = new Cards();
    this.filter = new Filter();
    this.search = new Search();
    this.sort = new Sort();
    this.cart = new Cart();
    this.rangeSlider = new RangeFilter();
  }

  async start() {
    const response = await fetch('./assets/data.json');
    const data: ICard[] = await response.json();
    localStorage.setItem('data', JSON.stringify(data));

    this.filter.getFilterClick('brand');
    this.filter.getFilterClick('caseSize');
    this.filter.getFilterClick('color');
    this.filter.getFilterClick('filter-label');
    this.filter.getFilterClick('filter-input');
    this.filter.addActiveClass();

    this.sort.getSortClick('sort-price');
    this.sort.getSortClick('sort-brand');
    this.sort.getSortClick('sort-year');

    this.card.preapareData();

    this.cart.getAddToCartClick();
    this.cart.addToCart();

    this.rangeSlider.createRangeSlider();
    this.rangeSlider.addRangePosition();

    this.getSortClick();
    this.getFiltersClick();
    this.filterReset();
    this.hardReset();
    this.searchStart();
    this.searchReset();
  }

  getSortClick() {
    const sortBlocks = document.querySelectorAll('.sort-block');
    sortBlocks.forEach(elem => elem.addEventListener('click', () => this.card.preapareData()));
  }

  getFiltersClick() {
    const filters = document.querySelectorAll('.filter');
    filters.forEach(elem => elem.addEventListener('click', () => this.card.preapareData()));
  }

  filterReset() {
    const filterResetButton = document.getElementById('filter-reset') as HTMLElement;
    filterResetButton.addEventListener('click', () => {
      this.filter.filterReset();
      this.rangeSlider.filterReset();
      this.card.preapareData();
    });
  }

  hardReset() {
    const hardResetButton = document.getElementById('hard-reset') as HTMLElement;
    hardResetButton.addEventListener('click', () => {
      localStorage.removeItem('sortFilter');
      localStorage.removeItem('cartValues');
      localStorage.removeItem('rangeValues');
      localStorage.removeItem('searchValue');
      localStorage.removeItem('filterValues');
      window.location.reload();
    });
  }

  searchStart() {
    const searchStart = document.getElementById('search-start') as HTMLElement;
    if (searchStart) {
      searchStart.addEventListener('click', () => {
        this.search.searchStart();
        this.card.preapareData();
      });
    }
  }

  searchReset() {
    const searchReset = document.getElementById('search-reset') as HTMLElement;
    if (searchReset) {
      searchReset.addEventListener('click', () => {
        this.search.searchReset();
        this.card.preapareData();
      });
    }
  }

}

export default Loader;
