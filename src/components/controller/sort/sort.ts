import { ICard, SortValue } from "Types";
import './sort.css';

class Sort {
  sortValues: SortValue = {};
  priceArrow: HTMLElement | null;
  brandArrow: HTMLElement | null;
  yearArrow: HTMLElement | null;

  constructor() {
    this.priceArrow = document.getElementById('price-arrow');
    this.brandArrow = document.getElementById('brand-arrow');
    this.yearArrow = document.getElementById('year-arrow');
  }

  getSortClick(id: string) {
    const sortContainer = document.getElementById(id) as HTMLElement;
    sortContainer.addEventListener('click', event => this.getSortValues(event));
  }

  getSortValues(event: MouseEvent) {
    const target = event.currentTarget as HTMLElement;
    target.classList.toggle('applied');

    if (target.classList.contains('applied')) {
      this.sortValues = { field: target.id, direction: 'up' };
    } else {
      this.sortValues = { field: target.id, direction: 'down' };
    }
    localStorage.setItem('sortFilter', JSON.stringify(this.sortValues));
  }

  sortingItems(data: ICard[]) {
    const sortFilter = JSON.parse(<string>localStorage.getItem('sortFilter'));

    if (sortFilter.field === 'sort-price' && sortFilter.direction === 'up' && this.priceArrow) {
      this.priceArrow.textContent = '🠕';
      if (this.brandArrow) this.brandArrow.textContent = '';
      if (this.yearArrow) this.yearArrow.textContent = '';
      return data.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    }

    if (sortFilter.field === 'sort-price' && sortFilter.direction === 'down' && this.priceArrow) {
      this.priceArrow.textContent = '🠗';
      if (this.brandArrow) this.brandArrow.textContent = '';
      if (this.yearArrow) this.yearArrow.textContent = '';
      return data.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }

    if (sortFilter.field === 'sort-brand' && sortFilter.direction === 'up' && this.brandArrow) {
      this.brandArrow.textContent = '🠕';
      if (this.priceArrow) this.priceArrow.textContent = '';
      if (this.yearArrow) this.yearArrow.textContent = '';
      return data.sort((a, b) => {
        if (a.brand < b.brand)
          return -1;
        if (a.brand > b.brand)
          return 1;
        return 0;
      });
    }

    if (sortFilter.field === 'sort-brand' && sortFilter.direction === 'down' && this.brandArrow) {
      this.brandArrow.textContent = '🠗';
      if (this.priceArrow) this.priceArrow.textContent = '';
      if (this.yearArrow) this.yearArrow.textContent = '';
      return data.sort((a, b) => {
        if (b.brand < a.brand)
          return -1;
        if (b.brand > a.brand)
          return 1;
        return 0;
      });
    }

    if (sortFilter.field === 'sort-year' && sortFilter.direction === 'up' && this.yearArrow) {
      this.yearArrow.textContent = '🠕';
      if (this.priceArrow) this.priceArrow.textContent = '';
      if (this.brandArrow) this.brandArrow.textContent = '';
      return data.sort((a, b) => parseFloat(a.year) - parseFloat(b.year));
    }

    if (sortFilter.field === 'sort-year' && sortFilter.direction === 'down' && this.yearArrow) {
      this.yearArrow.textContent = '🠗';
      if (this.priceArrow) this.priceArrow.textContent = '';
      if (this.brandArrow) this.brandArrow.textContent = '';
      return data.sort((a, b) => parseFloat(b.year) - parseFloat(a.year));
    }
  }

  isExist() {
    return !!JSON.parse(<string>localStorage.getItem('sortFilter'));
  }
}

export default Sort;