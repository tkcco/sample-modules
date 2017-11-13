$(function() {
  var adjust_height = function(target) {
    var $target = $(target);
    this.init($target);
  };
  adjust_height.prototype = {
    init: function($target) {
      this.getParamater($target);
      this.bindEvent($target);
    },
    getParamater: function($target) {
      this.$window = $(window);
      this.$target = $target.find('.js-height');
    },
    bindEvent: function() {
      this.adjustHeight();
      this.$window.on('orientationchange', this.adjustHeight.bind(this));
      this.$window.on('resize', this.adjustHeight.bind(this));
    },
    adjustHeight: function() {
      var maxHeight = 0;
      this.$target.each(function(){
        $(this).css('height', 'auto');
      });
      this.$target.each(function(){
        if ($(this).height() > maxHeight) maxHeight = $(this).height();
      });
      this.$target.height(maxHeight);
    }
  };
  $('.js-height-wrapper').each(function() {
    var Adjust_height = new adjust_height(this);
  });
});
