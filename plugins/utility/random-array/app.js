var array_modules = {
  init: function() {
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function() {
    this.$simpleTarget = $('.js-simple-btn');
    this.$simpleContainer = $('.js-simple-container');

    this.array = ['apple', 'pine', 'banana', 'orange', 'grape', 'peach', 'pear', 'plum'];
  },
  bindEvent: function() {
    this.$simpleTarget.on('click', this.simpleRandom.bind(this));
  },
  simpleRandom: function(e) {
    e.preventDefault();
    var length = this.array.length;
    for(var i = length - 1; i > 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var tmp = this.array[i];
      this.array[i] = this.array[j];
      this.array[j] = tmp;
    }
    var p = document.createElement('p');
    p.prepend(this.array);
    this.$simpleContainer.append(p);
  }
};
$(function() {
  array_modules.init();
});
