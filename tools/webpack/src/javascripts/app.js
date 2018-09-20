import '../stylesheets/style.scss';


class SearchBooks {
  constructor() {
    this.getParamaters();
    this.bindEvents();
  }

  getParamaters() {
    this.input = document.getElementsByClassName('input-text')[0];
    this.btn = document.getElementsByClassName('search-btn')[0];
  }

  bindEvents() {
    this.btn.addEventListener('click', this.getBooks.bind(this));
  }

  getBooks(e) {
    console.log('test');
  }
}

const searchBooks = new SearchBooks();