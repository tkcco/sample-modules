changeImage();

function changeImage() {
  var $keyVisual = $('.url-param-image');
  var KEYVISUAL_SWITCH_PARAM = 'bkv';
  var KEYVISUAL_SWITCH_ACCEPT_VALUES = ['a', 'b', 'c', 'd'];

  var matches = window.location.href.match(new RegExp('\\?(?:.)*?' + KEYVISUAL_SWITCH_PARAM + '=([^=&]+)'));
  var kv = matches ? matches[1] : null;
  // 無効な値が指定された場合、aをデフォルトとする
  if (!kv || KEYVISUAL_SWITCH_ACCEPT_VALUES.indexOf(kv) === -1) {
    kv = KEYVISUAL_SWITCH_ACCEPT_VALUES[0];
  }

  $keyVisual.each(function () {
    var $this = $(this);
    var $container = $this.parent();
    var src = $(this).attr('src').replace('_a', '_' + kv);
    $container.html('<img src="' + src + '" />');
    // $(this).attr('src', $(this).data('src').replace('_A', '_' + kv));
  });
};
