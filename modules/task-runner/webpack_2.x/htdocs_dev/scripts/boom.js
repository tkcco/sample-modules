export default class defaultExport {
  constructor() {
    this.init();
  }
  init() {
    this.getParameters();
    this.bindEvents();
  }
  getParameters() {
    this.target = document.getElementById('target');
  }
  bindEvents() {
   this.target.addEventListener('click', this.callTest.bind(this));
  }
  callTest() {
    console.log('this is callTest func');
  }
}

export function testFunc(test) {
  console.log(test);
}

export class MyClass {
  constructor() {
    this.init();
  }
  init() {
    console.log('this is class export!! ES6');
  }
}
