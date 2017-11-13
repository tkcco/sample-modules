'use strict';

var tab = {
  init: function() {
    this.getParameters();
    this.bindEvents();
  },
  getParameters: function() {
    this.tabMenu = $('.js-tab-menu');
    this.btn = this.tabMenu.find('a');
    this.content = $('.js-tab-content');
  },
  bindEvents: function() {
    this.setContent();
    this.btn.on('click', this.changeTab.bind(this));
  },
  setContent: function() {
    var tabNum = this.btn.data('tab');
    $.each(this.content, function() {
      var contentNum = $(this).data('tab');
      if (contentNum === tabNum) {
        $(this).show();
      }
    });
  },
  changeTab: function(e) {
    e.preventDefault();
    var $target = $(e.currentTarget);
    var $tabList = $($target[0].parentElement.parentElement);
    var tabNum = $target.data('tab');
    var pretabNum;
    $.each(this.btn, function() {
      var $this = $(this);
      if ($this.hasClass('is-active')) {
        pretabNum = $this.data('tab');
      };
      $this.removeClass('is-active');
    });
    $target.addClass('is-active');
    this.changeContents(tabNum);
    $tabList.removeClass('sample-tab-border-' + pretabNum).addClass('sample-tab-border-' + tabNum);
  },
  changeContents: function(num) {
    $.each(this.content, function() {
      var contentNum = $(this).data('tab');
      $(this).hide();
      if (contentNum === num) {
        $(this).fadeIn();
      }
    });
  }
};
tab.init();

