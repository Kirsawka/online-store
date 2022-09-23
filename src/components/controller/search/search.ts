import { ICard } from "Types";
import './search.css';

class Search {
  searchInput: HTMLInputElement | null;

  constructor() {
    this.searchInput = document.getElementById('search') as HTMLInputElement;
  }

  searchingItems(data: ICard[]) {
    const searchValue = <string>localStorage.getItem('searchValue');
    (document.getElementById('search') as HTMLInputElement).value = searchValue;

    return data.filter(item => {
      if (searchValue) {
        return item.brand.toLowerCase().includes(searchValue.toLowerCase())
          || item.name.toLowerCase().includes(searchValue.toLowerCase())
          || item.color.toLowerCase().includes(searchValue.toLowerCase());
      }
    });
  }

  searchStart() {
    if (this.searchInput) {
      localStorage.setItem('searchValue', this.searchInput.value);
    }
  }

  searchReset() {
    if (this.searchInput) {
      this.searchInput.value = '';
    }
    localStorage.removeItem('searchValue');
  }

  isExist() {
    return !!localStorage.getItem('searchValue');
  }
}

export default Search;