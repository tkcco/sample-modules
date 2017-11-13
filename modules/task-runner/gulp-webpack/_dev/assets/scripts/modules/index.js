import '../utils/global.js';

const moduleElements = document.querySelectorAll('[data-module]');

for(let i = 0; i < moduleElements.length; i++) {
  const el = moduleElements[i],
        attr = el.getAttribute('data-module');
  attr.split(/\s+/).forEach((name) => {
    const Module = require(`./${name}`).default;
    new Module(el);
  });
}
