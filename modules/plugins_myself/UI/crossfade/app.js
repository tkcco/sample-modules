
var MYAPP = MYAPP || {};
'use strict';

MYAPP.crossfade = function () {
  this.init();
};

MYAPP.crossfade.prototype = {
  FADE_SPEED: 3000,

  init: function() {
    this.setParameters();
    this.bindEvent();
  },

  // DOM情報の取得
  setParameters: function() {
    this.$mainItem = $('.crossfade-item');
    this.i = 1;
  },

  //  イベントハンドラの設定
  bindEvent: function() {
    setInterval(function () { this.crossFade(); }.bind(this), 3000);
  },

  // 一枚ずつ表示
  crossFade: function() {
    if (this.i > 3) {
      this.i = 0;
      this.$mainItem.eq(3).animate({ opacity: 0 }, this.FADE_SPEED);
    } else {
      this.$mainItem.eq(this.i - 1).animate({ opacity: 0 }, this.FADE_SPEED);
    }
    this.$mainItem.eq(this.i).animate({ opacity: 1 }, this.FADE_SPEED);
    this.i++;
  }

};

$(function() {
  new MYAPP.crossfade();
});
