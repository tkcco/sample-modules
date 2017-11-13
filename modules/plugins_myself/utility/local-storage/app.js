$(function() {
  var local_storage = function($container) {
    this.$container = $container;
    this.init();
  };
  local_storage.prototype = {
    init: function() {
      this.getParamater();
      this.bindEvent();
    },
    getParamater: function() {
      this.$window = $(window);
      this.$document = $(document);
      this.$body = $('html, body');
      this.$btn = this.$container.find('.js-btn');
      this.$links =  this.$container.find('.js-links');
      this.$movedLists = this.$links.find('li');
    },
    bindEvent: function() {
      this.$btn.click(this.randomItems.bind(this));
    },
    randomItems: function(e) {
      e.preventDefault();
    },
    addCookie: function() {
      var status = '';
      status = 'cookieOn = open; path = /';
      document.cookie = status;
    },
    setSessionStrage: function() {
      sessionStorage.access_count = this.box;
    }
  };
  $(function(){
    $('.js-container').each(function(){
      new local_storage($(this));
    });
  });
});
