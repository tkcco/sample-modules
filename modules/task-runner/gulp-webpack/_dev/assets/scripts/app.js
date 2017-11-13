import jQuery from 'jquery';
import './modules';
import Menu from './views/menu';

if (!window.$) {
  window.$ = jQuery;
}

class App {
  constructor() {
    const menu = new Menu();
    menu();
  }
}

const app = new App();
app();
