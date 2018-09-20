(function() {
  var addCookieBtn = document.getElementById('sample-cookie-add');
  var removeCookieBtn = $('#sample-cookie-remove');
  addCookieBtn.addEventListener('click', function(e) {
    e.preventDefault();
    setCookie();
  });
  removeCookieBtn.on('click', function(e) {
    e.preventDefault();
    removeCookie();
  });
  function setCookie() {
    // クッキーに保存
    var status;
    var getDate;
    var expiresDate = new Date();
    var date = expiresDate.getTime();
    expiresDate.setTime(date + 24 * 60 * 60 * 1000 * 365);
    status = 'sample-cookie = on; max-age = 86400; path = /';
    getDate = 'on-sample-cookieDate = ' + date + '; max-age = 86400; path = /';
    document.cookie = status;
    document.cookie = getDate;
    console.log(status);
    console.log(getDate);
    // // js.cookie.jsを使った場合
    // // expires: 有効期限（日数）
    // Cookies.set('sample-cookie', 'on', { expires: 7, path: '/', domain: 'xxxxxxxxxx.com' });
    // // cookieの取得
    // Cookies.get('sample-cookie', { domain: 'xxxxxxxxxx.com' });
  }
  function removeCookie() {
    // クッキーか削除
    var status;
    var getDate;
    var expiresDate = new Date();
    var date = expiresDate.getTime();
    expiresDate.setTime(date + 24 * 60 * 60 * 1000 * 365);
    status = 'sample-cookie = on; max-age = 0; path = /';
    getDate = 'on-sample-cookieDate = ' + date + '; max-age = 0; path = /';
    document.cookie = status;
    document.cookie = getDate;
    console.log(status);
    console.log(getDate);
    // // js.cookie.jsを使った場合
    // // expires: 有効期限（日数）
    // Cookies.remove('sample-cookie', { expires: 7, path: '/', domain: 'xxxxxxxxxx.com' });
  }
}());
