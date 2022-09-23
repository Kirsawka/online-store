import * as noUiSlider from 'nouislider';
import { ICard, RangeValues } from "Types";
import 'nouislider/dist/nouislider.css';
import './rangeFilter.css';

class RangeFilter {
  rangeValues: RangeValues = JSON.parse(<string>localStorage.getItem('rangeValues')) ?? {};
  prices: string[] = this.rangeValues.price ?? [];
  cases: string[] = this.rangeValues.case ?? [];

  priceSlider = document.getElementById('price-slider') as noUiSlider.target;
  maxPrice = document.getElementById('max-price') as HTMLElement;
  minPrice = document.getElementById('min-price') as HTMLElement;

  caseSlider = document.getElementById('case-slider') as noUiSlider.target;
  maxCase = document.getElementById('max-case') as HTMLElement;
  minCase = document.getElementById('min-case') as HTMLElement;

  createRangeSlider() {
    noUiSlider.create(this.priceSlider, {
      start: [2390, 69990],
      connect: true,
      step: 100,
      range: {
        'min': [2390],
        'max': [69990],
      },
    });

    noUiSlider.create(this.caseSlider, {
      start: [40, 46],
      connect: true,
      step: 1,
      range: {
        'min': [40],
        'max': [46],
      },
    });
    this.caseSlider.noUiSlider?.on('change', event => this.getRangeValues(this.caseSlider));
    this.priceSlider.noUiSlider?.on('change', event => this.getRangeValues(this.priceSlider));
  }

  // getRangePriceValues(slider: noUiSlider.target, id: string, min: HTMLElement, max: HTMLElement, array: string[], field: string, obj: { [k: string]: string[] }) {
  //   const value = [this.minPrice, this.maxPrice];
  //
  //   if (slider.id === id) {
  //     if (slider) {
  //       slider.noUiSlider?.on('update', (values, handle) => {
  //         value[handle].textContent = Math.round(+values[handle]).toString();
  //       });
  //
  //       if (typeof min.textContent === "string" && typeof max.textContent === "string") {
  //         array.push(min.textContent, max.textContent);
  //         array.sort((a, b) => +a - +b);
  //         array.slice(0, array.length - 2);
  //       }
  //     }
  //     slider.noUiSlider?.on('set', (values, handle) => {
  //       if (typeof min.textContent === 'string' && typeof max.textContent === 'string') {
  //         array = [min.textContent, max.textContent];
  //         obj[field] = array;
  //       }
  //       localStorage.setItem('rangeValues', JSON.stringify(obj));
  //     });
  //   }
  // }

  getRangeValues(slider: noUiSlider.target) {

    if (slider.id === 'price-slider') {
      const prices = [this.minPrice, this.maxPrice];

      if (slider) {
        slider.noUiSlider?.on('update', (values, handle) => {
          prices[handle].textContent = Math.round(+values[handle]).toString();
        });
        if (!this.prices) this.prices = [];
        this.prices.push(<string> this.minPrice.textContent, <string> this.maxPrice.textContent);
        this.prices.sort((a, b) => +a - +b);
        this.prices.slice(0, this.prices.length - 2);
      }
      slider.noUiSlider?.on('set', (values, handle) => {
        this.prices = [<string> this.minPrice.textContent, <string> this.maxPrice.textContent];
        this.rangeValues.price = this.prices;
        localStorage.setItem('rangeValues', JSON.stringify(this.rangeValues));
      });
    }

    if (slider.id === 'case-slider') {
      const cases = [this.minCase, this.maxCase];

      if (slider) {
        slider.noUiSlider?.on('update', (values, handle) => {
          cases[handle].textContent = Math.round(+values[handle]).toString();
        });
        if (!this.cases) this.cases = [];
        this.cases.push(<string> this.minCase.textContent, <string> this.maxCase.textContent);
        this.cases.sort((a, b) => +a - +b);
        this.cases.slice(0, this.cases.length - 2);
      }
      slider.noUiSlider?.on('set', (values, handle) => {
        this.cases = [<string> this.minCase.textContent, <string> this.maxCase.textContent];
        this.rangeValues.case = this.cases;
        localStorage.setItem('rangeValues', JSON.stringify(this.rangeValues));
      });
    }
  }

  filterItemsWithRange(data: ICard[]) {
    const rangeValues = JSON.parse(<string>localStorage.getItem('rangeValues'));
    const filteredItems: ICard[] = [];
    if (rangeValues) {
      for (let i = 0; i < data.length; i++) {
        if (rangeValues.price && !(+rangeValues.price[0] <= (+data[i].price))) {
          continue;
        }
        if (rangeValues.price && !(+rangeValues.price[1] >= (+data[i].price))) {
          continue;
        }
        if (rangeValues.case && !(+rangeValues.case[0] <= (+data[i].caseSize))) {
          continue;
        }
        if (rangeValues.case && !(+rangeValues.case[1] >= (+data[i].caseSize))) {
          continue;
        }
        filteredItems.push(data[i]);
      }
    }
    return filteredItems;
  }

  addRangePosition() {

    this.minPrice.textContent = '2390';
    this.maxPrice.textContent = '69990';

    this.minCase.textContent = '40';
    this.maxCase.textContent = '46';

    if (this.prices && this.prices.length !== 0) {
      this.priceSlider.noUiSlider?.set([this.prices[0], this.prices[1]]);
      this.minPrice.textContent = this.prices[0];
      this.maxPrice.textContent = this.prices[1];
    }

    if (this.cases && this.cases.length !== 0) {
      this.caseSlider.noUiSlider?.set([this.cases[0], this.cases[1]]);
      this.minCase.textContent = this.cases[0];
      this.maxCase.textContent = this.cases[1];
    }
  }

  filterReset() {
    this.minPrice.textContent = '2390';
    this.maxPrice.textContent = '69990';
    this.minCase.textContent = '40';
    this.maxCase.textContent = '46';
    this.priceSlider.noUiSlider?.set([2390, 69990]);
    this.caseSlider.noUiSlider?.set([40, 46]);
    localStorage.removeItem('rangeValues');
  }

  isExist() {
    return !!JSON.parse(<string>localStorage.getItem('rangeValues'));
  }
}

export default RangeFilter;