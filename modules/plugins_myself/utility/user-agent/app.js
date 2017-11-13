var $btn = $('.js-ua-btn');
var $container = $('.js-container');

$btn.on('click', function(e) {
  e.preventDefault();
  showUserAgent();
});

function showUserAgent() {
  var nav = window.navigator;
  var userAgent = navigator.userAgent.toLowerCase();
  var version = navigator.appVersion.toLowerCase();
  var browser;
  console.log(nav);
  console.log(userAgent);
  console.log(version);
  /**
   *     PC
   */
  // IE(11以外)
  var isMSIE = (userAgent.indexOf('msie') > -1) && (userAgent.indexOf('opera') === -1);
  // IE6
  var isIE6 = isMSIE && (version.indexOf('msie 6.') > -1);
  // IE7
  var isIE7 = isMSIE && (version.indexOf('msie 7.') > -1);
  // IE8
  var isIE8 = isMSIE && (version.indexOf('msie 8.') > -1);
  // IE9
  var isIE9 = isMSIE && (version.indexOf('msie 9.') > -1);
  // IE10
  var isIE10 = isMSIE && (version.indexOf('msie 10.') > -1);
  // IE11
  var isIE11 = (userAgent.indexOf('trident/7') > -1);
  // IE
  var isIE = isMSIE || isIE11;
  // Edge
  var isEdge = (userAgent.indexOf('edge') > -1);
  // Google Chrome
  var isChrome = (userAgent.indexOf('chrome') > -1) && (userAgent.indexOf('edge') === -1);
  // Firefox
  var isFirefox = (userAgent.indexOf('firefox') > -1);
  // Safari
  var isSafari = (userAgent.indexOf('safari') > -1) && (userAgent.indexOf('chrome') === -1);
  // Opera
  var isOpera = (userAgent.indexOf('opera') > -1);
  // 使用例
  if(isIE) {
    browser = 'IE';
  }
  if(isIE6) {
    browser = 'IE6';
  }
  if(isIE7) {
    browser = 'IE7';
  }
  if(isIE8) {
    browser = 'IE8';
  }
  if(isIE9) {
    browser = 'IE9';
  }
  if(isIE10) {
    browser = 'IE10';
  }
  if(isIE11) {
    browser = 'IE11';
  }
  if(isEdge) {
    browser = 'Edge';
  }
  if(isChrome) {
    browser = 'Google Chrome';
  }
  if(isFirefox) {
    browser = 'Firefox';
  }
  if(isSafari) {
    browser = 'Safari';
  }
  if(isOpera) {
    browser = 'Opera';
  }
  /**
   *     SP / Tablet
   */
  // iPhone
  var isiPhone = (userAgent.indexOf('iphone') > -1);
  // iPad
  var isiPad = (userAgent.indexOf('ipad') > -1);
  // Android
  var isAndroid = (userAgent.indexOf('android') > -1) && (userAgent.indexOf('mobile') > -1);
  // Android Tablet
  var isAndroidTablet = (userAgent.indexOf('android') > -1) && (userAgent.indexOf('mobile') === -1);
  // 使用例
  if(isiPhone) {
    browser = 'iPhone';
  }
  if(isiPad) {
    browser = 'iPad';
  }
  if(isAndroid) {
    browser = 'Android';
  }
  if(isAndroidTablet) {
    browser = 'Android Tablet';
  }
  $container.append('<p>' + browser + '</p>');
}
