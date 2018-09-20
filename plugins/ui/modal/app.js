'use strict';

function Modal() {
  this.init();
};

Modal.prototype = {
  init: function () {
    this.getParameter();
    this.bindEvent();
  },
  getParameter: function(){
    this.$window = $(window);
    this.$body = $('body');
    this.$openBtn01 = $('.js-open01');
    this.$openBtn02 = $('.js-open02');
    this.$openContent = $('.js-open-content');
  },
  bindEvent: function(){
    this.$openBtn01.on('click', this.openModal.bind(this));
    this.$openBtn02.on('click', this.openModal.bind(this));
    $(document).on('click', '.js-modal-slide', this.slideModalContent.bind(this));
    $(document).on('click', this.closeModal.bind(this));
  },

  flexibleModalTemplate: '<div class="modal-wrap">' +
                  '<div class="modal-body">' +
                    '<a class="modal-close" href="">×</a>' +
                    '<p></p>' +
                    '<div class="modal-content">' +
                      '<h2 class="modal-content__title"></h2>' +
                      '<a class="modal-content__title__link js-modal-slide" href="">slide</a>' +
                      '<ul class="modal-content__list">' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="modal-content">' +
                      '<h2 class="modal-content__title"></h2>' +
                      '<a class="modal-content__title__link js-modal-slide" href="">slide</a>' +
                      '<ul class="modal-content__list">' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="modal-content">' +
                      '<h2 class="modal-content__title"></h2>' +
                      '<a class="modal-content__title__link js-modal-slide" href="">slide</a>' +
                      '<ul class="modal-content__list">' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="modal-content">' +
                      '<h2 class="modal-content__title"></h2>' +
                      '<a class="modal-content__title__link js-modal-slide" href="">slide</a>' +
                      '<ul class="modal-content__list">' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="modal-content">' +
                      '<h2 class="modal-content__title"></h2>' +
                      '<a class="modal-content__title__link js-modal-slide" href="">slide</a>' +
                      '<ul class="modal-content__list">' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="modal-content">' +
                      '<h2 class="modal-content__title"></h2>' +
                      '<a class="modal-content__title__link js-modal-slide" href="">slide</a>' +
                      '<ul class="modal-content__list">' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                    '<div class="modal-content">' +
                      '<h2 class="modal-content__title"></h2>' +
                      '<a class="modal-content__title__link js-modal-slide" href="">slide</a>' +
                      '<ul class="modal-content__list">' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                        '<li>' +
                          '<a class="modal-content__link" href="">リンク</a>' +
                          '<p class="modal-content__text">テキスト</p>' +
                        '</li>' +
                      '</ul>' +
                    '</div>' +
                  '</div>' +
                '</div>',

  solidModalTemplate: '<div class="modal-wrap">' +
                           '<div class="modal-body-flexible">' +
                             '<a class="modal-close" href="">×</a>' +
                             '<div class="modal-body-wrap"></div>' +
                           '</div>' +
                          '</div>',

  // アンケートのモーダルを開く
  openModal: function(e){
    e.preventDefault();
    var $target = $(e.currentTarget);
    var className = $target.attr('class');
    if (className.match('01')) {
      $('body').prepend(this.flexibleModalTemplate).addClass('is-modal-open');
      $('.modal-wrap').css('height', 100 + '%').fadeIn(500);
    } else {
      $('body').prepend(this.solidModalTemplate).addClass('is-modal-open');
      $('.modal-wrap').css('height', 100 + '%').fadeIn(500);
      var height = $('.modal-body-flexible').outerHeight();
      $('.modal-body-flexible').height(height).css({
        top: 0,
        bottom: 0,
        margin: 'auto auto'
      });
    }
  },
  // アンケートのモーダルを閉じる
  closeModal: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    if ($target[0].className === 'modal-wrap' || $target[0].className === 'modal-close') {
      $('.modal-wrap').fadeOut(500).queue(function() {
        $(this).remove();
        $('body').removeClass('is-modal-open');
      });
    }
  },
  // モーダルの中のコンテンツ開閉
  slideModalContent: function(e) {
    e.preventDefault();
    var $target = $(e.target);
    var $currentTarget = $(e.currentTarget);
    console.log($currentTarget.next());
    // var src = $target.attr('src');
    // if(src.indexOf('_open') >= 0) {
    //   $target.attr('src', $target.attr('src').replace('_open', '_close'));
    // } else {
    //   $target.attr('src', $target.attr('src').replace('_close', '_open'));
    // }
    $currentTarget.next().slideToggle();
  }
};

$(function () {
  var modal = new Modal;
});
