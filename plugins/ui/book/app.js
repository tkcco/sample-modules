'use ctrict';

function bookSlide() {
  this.init();
};

bookSlide.prototype = {
  init: function() {
    this.getParameters();
    this.bindEvents();
  },
  getParameters: function() {
    this.$book = $('.js-book-slide');
    this.$btn = $('.js-btn-slide').find('a');
    this.i = 0;
  },
  bindEvents: function() {
    this.$btn.on('click', this.movePage.bind(this));
  },
  movePage: function(e) {
    e.preventDefault();
    var next = $(e.currentTarget).hasClass('next'),
        length = this.$book.find('li').length,
        width = this.$book.outerWidth();
    if (next) {
      if (this.i === length - 1) return;
      this.$book.find('li').eq(this.i).animate({
        marginLeft: '-' + width + 'px'
      }, 600);
      console.log('next', this.i);
      this.i++;
      console.log(this.i);
    } else {
      if (this.i === 0) return;
      this.$book.find('li').eq(this.i - 1).animate({
        marginLeft: 0
      }, 600);
      console.log('prev', this.i);
      this.i--;
      console.log(this.i);
    }
  }
};
var BookSlide = new bookSlide();

function bookRotate() {
  this.init();
};
bookRotate.prototype = {
  init: function() {
    this.getParameters();
    this.bindEvents();
  },
  getParameters: function() {
    this.$book = $('.js-book-rotate');
    this.$btn = $('.js-btn-rotate').find('a');
    this.i = 0;
  },
  bindEvents: function() {
    this.$btn.on('click', this.movePage.bind(this));
  },
  movePage: function(e) {
    e.preventDefault();
    var _this = this,
        next = $(e.currentTarget).hasClass('next'),
        length = this.$book.find('li').length;
    if (next) {
      if (this.i === length - 1) return;
      $({ deg: 0 }).stop().animate({ deg: 180 }, {
        duration: 400,
        progress: function() {
          _this.$book.find('li').eq(_this.i).find('img').css({
            transform: 'rotateY(-' + this.deg + 'deg)'
          });
        },
        complete: function() {
          _this.$book.find('li').eq(_this.i).addClass('is-active');
          console.log('next', _this.i);
          _this.i++;
          console.log(_this.i);
        }
      });
    } else {
      if (this.i === 0) return;
      $({ deg: 180 }).stop().animate({ deg: 0 }, {
        duration: 400,
        progress: function() {
          _this.$book.find('li').eq(_this.i - 1).find('img').css({
            transform: 'rotateY(-' + this.deg + 'deg)'
          });
        },
        complete: function() {
          _this.$book.find('li').eq(_this.i).removeClass('is-active');
          console.log('prev', _this.i);
          _this.i--;
          console.log(_this.i);
        }
      });
    }
  }
};
var BookRotate = new bookRotate();


function bookFlip() {
  this.init();
};
bookFlip.prototype = {
  init: function() {
    this.getParameters();
    this.bindEvents();
  },
  getParameters: function() {
    this.$book = $('.js-book-flip');
    this.$btn = $('.js-btn-flip').find('a');
  },
  bindEvents: function() {
    this.$btn.on('click', this.movePage.bind(this));
  },
  movePage: function(e) {
    /**
     *    ⬇ ボタンの切り替え
     */
    e.preventDefault();
    var $target = $(e.currentTarget);
    $.each(this.$btn, function() {
      $(this).removeClass('is-active');
    });
    $target.addClass('is-active');
    /**
     *    ⬇ 画像の切り替え
     */
    var i = $target.index() + 1;
    var _this = this;
    // $.each(this.$book.find('li'), function() {
    //   $(this).find('a').append('<img alt="" src="./img/test0' + i + '.jpg">');
    //   $(this).addClass('test');
    // });
    // this.$book.find('li').addClass('test');

    // $({ deg: 0 }).stop().animate({ deg: 180 }, {
    //   duration: 900,
    //   progress: function() {
    //     _this.$book.find('li').find('a').find('img').eq(0).css({
    //       transform: 'rotateY(-' + this.deg + 'deg) translateZ(0px)'
    //     });
    //     _this.$book.find('li').find('a').find('img').eq(1).css({
    //       transform: 'rotateY(' + this.deg + 'deg) translateZ(1px)'
    //     });
    //   },
    //   complete: function() {
    //     // _this.$book.find('li:visible').hide();
    //     // _this.$book.find('li[data-index="' + i + '"]').show().addClass('is-active');
    //   }
    // });
  }
};
var BookFlip = new bookFlip();
