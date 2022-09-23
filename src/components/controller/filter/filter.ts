import { FilterValue, ICard } from "Types";
import './filter.css';

class Filter {
  filterValues: FilterValue = JSON.parse(<string>localStorage.getItem('filterValues')) ?? {};
  brand: string[] = this.filterValues.brand ?? [];
  caseSize: string[] = this.filterValues.caseSize ?? [];
  color: string[] = this.filterValues.color ?? [];
  bestseller: string[] = this.filterValues.bestseller ?? [];

  getFilterClick(id: string) {
    const filterContainer = document.getElementById(id) as HTMLElement;
    filterContainer.addEventListener('click', event => this.getFilterValues(event));
  }

  getFilterValues(event: MouseEvent) {
    const target = event.target as HTMLElement;

    if (target.classList.contains('filter-input') || target.classList.contains('filter-label')) {
      if ((target as HTMLInputElement).checked) {
        this.bestseller = ['true'];
      } else {
        this.bestseller = [];
      }
      this.filterValues.bestseller = this.bestseller;
    }

    if (target.classList.contains('filter__button')) {
      target.classList.toggle('active');
    }

    if (target.classList.contains('active')) {
      this.createFilterObj(event, target, 'brand', this.brand, this.filterValues);
      this.createFilterObj(event, target, 'caseSize', this.caseSize, this.filterValues);
      this.createFilterObj(event, target, 'color', this.color, this.filterValues);
    } else {
      this.changeFilterObj(event, target, 'brand', this.brand, this.filterValues);
      this.changeFilterObj(event, target, 'caseSize', this.caseSize, this.filterValues);
      this.changeFilterObj(event, target, 'color', this.color, this.filterValues);
    }
    localStorage.setItem('filterValues', JSON.stringify(this.filterValues));
  }

  createFilterObj(event: MouseEvent, target: HTMLElement, id: string, array: string[], obj: { [k: string]: string[] }) {
    const parentTarget = event.currentTarget as HTMLElement;
    if (parentTarget.id === id) {
      if (array) {
        array.push(target.id);
        obj[id] = array;
      } else {
        const arr: string[] = [];
        arr.push(target.id);
        obj[id] = arr;
      }
    }
    return obj;
  }

  changeFilterObj(event: MouseEvent, target: HTMLElement, id: string, array: string[], obj: { [k: string]: string[] }) {
    const parentTarget = event.currentTarget as HTMLElement;
    if (parentTarget.id === id) {
      if (array) {
        array.splice(array.indexOf(target.id), 1);
        obj[id] = array;
        if (array.length === 0) {
          delete obj[id];
        }
      }
    }
    return obj;
  }

  addActiveClass() {
    const filterButtons = document.querySelectorAll('.filter__button');
    filterButtons.forEach(elem => {
      if (this.brand && this.brand.includes(elem.id)) {
        elem.classList.add('active');
      }
      if (this.caseSize && this.caseSize.includes(elem.id)) {
        elem.classList.add('active');
      }
      if (this.color && this.color.includes(elem.id)) {
        elem.classList.add('active');
      }
    });
    const filterInput = document.getElementById('filter-input') as HTMLInputElement;
    if (this.bestseller && this.bestseller.length > 0) {
      filterInput.checked = true;
    }
  }

  filtrationItems(data: ICard[]) {
    const filterValues = JSON.parse(<string>localStorage.getItem('filterValues'));
    const filteredItems: ICard[] = [];
    if (filterValues) {
      for (let i = 0; i < data.length; i++) {
        if (filterValues.brand && !filterValues.brand.includes(data[i].brand)) {
          continue;
        }
        if (filterValues.caseSize && !filterValues.caseSize.includes(data[i].caseSize)) {
          continue;
        }
        if (filterValues.color && !filterValues.color.includes(data[i].color)) {
          continue;
        }
        if (filterValues.bestseller && filterValues.bestseller.length > 0 && !filterValues.bestseller.includes(data[i].bestseller)) {
          continue;
        }
        filteredItems.push(data[i]);
      }
    }
    this.noCardsRender(filteredItems);
    return filteredItems;
  }

  noCardsRender(filteredItems: ICard[]) {
    const noCardsText = document.querySelector('.no-cards') as HTMLElement;
    if (filteredItems.length === 0) {
      noCardsText.classList.remove('empty');
      noCardsText.textContent = 'Товары по запросу не найдены, измените параметры поиска';
    } else {
      noCardsText.classList.add('empty');
    }
  }

  filterReset() {
    const filterInput = document.getElementById('filter-input') as HTMLInputElement;
    const filterButtons = document.querySelectorAll('.filter__button');
    filterButtons.forEach((elem) => elem.classList.remove('active'));
    filterInput.checked = false;
    this.bestseller = [];
    this.brand = [];
    this.color = [];
    this.caseSize = [];
    this.filterValues.bestseller = this.bestseller;
    this.filterValues.brand = this.brand;
    this.filterValues.color = this.color;
    this.filterValues.caseSize = this.caseSize;
    this.filterValues = {};
    localStorage.setItem('filterValues', JSON.stringify(this.filterValues));
  }

  isExist() {
    return !!JSON.parse(<string>localStorage.getItem('filterValues'));
  }
}

export default Filter;
