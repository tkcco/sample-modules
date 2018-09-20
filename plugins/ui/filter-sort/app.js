'use strict';

function Links() {
  this.init();
};
Links.prototype = {
  init: function() {
    this.getParameter();
    this.bindEvent();
  },
  getParameter: function() {
    this.$categoryItem = $('.sort-category');
    this.$categoryList = $('.sort-category-list li');
    this.$linksMatch = $('.sorted-items-match');
    this.$linksElse = $('.sorted-items-unmatch');
    this.$linksItem = $('.sorted-item');
    this.$match = $('.is-match');
    this.$unmatch = $('.is-unmatch');
    this.LEFT_RIGHT_MARGIN = 40;
    this.LEFT_MARGIN = 40;
    this.TOP_DOWN_MARGIN = 40;
    this.TOP_MARGIN = 40;
    this.MATCH_BORDER = 5;
    this.UNMACTH_TOP_MARGIN = 84;
  },
  bindEvent: function() {
    var that = this;
    this.setLinks();
    this.indexNum = undefined;
    this.$categoryList.on('click', this.changeCategory.bind(this));
  },
  // linksの初期位置設定
  setLinks: function() {
    var row = -1;
    var linksItemLen = this.$linksItem.length;
    var linksItemHeight = this.$linksItem.outerHeight();
    var linksItemWidth = this.$linksItem.outerWidth();
    var matchHeight = this.$linksMatch.outerHeight();
    for (var i = 0; i < linksItemLen; i++) {
      var col = i % 4;
      if (col === 0) row++;
      this.$linksItem.eq(i).css({
        left: ((linksItemWidth + this.LEFT_RIGHT_MARGIN) * col) + this.LEFT_MARGIN + 'px',
        top: ((linksItemHeight + this.TOP_DOWN_MARGIN) * row) + this.TOP_MARGIN + this.MATCH_BORDER + 'px'
      });
    }
    this.$linksElse.css({
      height: (linksItemHeight * (row + 1)) + (row * this.TOP_DOWN_MARGIN) + (this.TOP_MARGIN * 2) + 'px'
    });
  },
  // カテゴリーの選択
  changeCategory: function(e) {
    e.preventDefault();
    $.each(this.$categoryList.find('a'), function() {
      $(this).removeClass('is-active');
    });
    var $target = $(e.target);
    this.selectedCategory = $target.data('category');
    console.log(this.selectedCategory);
    $target.addClass('is-active');
    this.sortLinks();
  },
  // カテゴリーに基づいてアニメーション
  sortLinks: function () {
    var _this = this;
    $.each(this.$linksItem, function() {
      var $this = $(this);
      var data = $this.data('category');
      console.log(data, data.indexOf(_this.selectedCategory));
      if(data.match(_this.selectedCategory)) {
        $this.removeClass('is-unmatch').addClass('is-match');
      } else {
        $this.removeClass('is-match').addClass('is-unmatch');
      }
    });
    var row = -1;
    var elseRow = -1;
    var elseI = 0;
    var matchLen = $('.is-match').length;
    var unmatchLen = $('.is-unmatch').length;
    var linksItemWidth = this.$linksItem.outerWidth();
    var linksItemHeight = this.$linksItem.outerHeight();
    for (var i = 0; i < matchLen + unmatchLen; i++) {
      var col = i % 4;
      if (i < matchLen) {
        if (!col) row++;
        $('.is-match').eq(i).animate({
          left: ((linksItemWidth + this.LEFT_RIGHT_MARGIN) * col) + this.LEFT_MARGIN + 'px',
          top: ((linksItemHeight + this.TOP_DOWN_MARGIN) * row) + this.TOP_MARGIN + 'px'
        });
        this.$linksMatch.stop().animate({
          height: (linksItemHeight * (row + 1)) + (this.TOP_DOWN_MARGIN * row) + (this.TOP_MARGIN * 2) + 'px'
        });
      } else {
        var elseCol = elseI % 4;
        if (elseCol === 0) {
          row++;
          elseRow++;
        };
        $('.is-unmatch').eq(elseI).animate({
          left: ((linksItemWidth + this.LEFT_RIGHT_MARGIN) * elseCol) + this.LEFT_MARGIN + 'px',
          top: ((linksItemHeight + this.TOP_DOWN_MARGIN) * row) + (this.TOP_MARGIN * 2) + 'px'
        });
        elseI++;
        this.$linksElse.stop().animate({
          height: (linksItemHeight * (elseRow + 1)) + (this.TOP_DOWN_MARGIN * elseRow) + (this.TOP_MARGIN * 2) + 'px'
        });
      }
    }
  }
};

$(function () {
  var links = new Links;
});
