/**
 *    レスポンシブのための画像切り替え
 **/
$(function() {
  var $window = $(window);
  function changeImg() {
    var $imgChanged = $('.img-change');
    var windowWidth = window.innerWidth;
    var MEDIA_QUERY = 767;
    $imgChanged.each(function() {
      var $this = $(this);
      if (windowWidth <= MEDIA_QUERY) {
        $this.attr('src', $this.attr('src').replace('_pc', '_sp'));
      } else {
        $this.attr('src', $this.attr('src').replace('_sp', '_pc'));
      }
    });
  };
  changeImg();
  $window.on('resize', changeImg.bind(this));
  $window.on('orientationchange', changeImg.bind(this));
});
