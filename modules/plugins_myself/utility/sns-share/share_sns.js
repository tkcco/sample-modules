$(function() {
  function blankOpen(url, name, width, height) {
    var options = 'status=1, scrollbars=0, resizable=1';
    if (width) options += ',width=' + width;
    if (height) options += ',height=' + height;

    var blankWindow = window.open(url, name, options);
    blankWindow.focus();
  };

  var postToSns = function(type, href,  text, hash) {
    var options = {
      'tw': {
        'url': 'https://twitter.com/share?url=',
        'text': '&amp;text=',
        'hash': '&amp;hashtags=',
        'detail': 'Tweetする'
      },
      'fb': {
        'url': 'http://www.facebook.com/share.php?u=',
        'detail': 'Facebookでシェアする'
      },
      'line': {
        // 'url': 'http://line.me/R/msg/text/?',  //    => PCでは送れない
        'url': 'https://lineit.line.me/share/ui?url=',  //     => PCでも送れる
        'detail': 'LINEで送る'
      }
    };
    var width = 632;
    var height = 456;

    if (type !== 'tw') {
      hash = false;
      text = false;
    }
    for (var val in options) {
      if (options.hasOwnProperty(val) && val == type) {
        var url = options[val].url;
        if (href) url += encodeURIComponent(href);
        if (text) url += options[val].text + encodeURIComponent(text);
        if (hash) url += options[val].hash + encodeURIComponent(hash);
      }
    }
    blankOpen(url, type, width, height);
    return false;
  };
  (this || window).postToSns = postToSns; // export to global
});
