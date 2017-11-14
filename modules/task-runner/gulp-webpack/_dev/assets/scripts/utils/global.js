export default (() => {
  // ブレイクポイント検知
  const breakpoint = 794;
  const displayEvent = document.createEvent('HTMLEvents');
  let display = document.body.display = document.documentElement.clientWidth > breakpoint ? 'pc' : 'sp';
  document.body.beforeDisplay = display === 'pc' ? 'sp' : 'pc';
  console.log(document.body.display + ' this. document.body.display');
  console.log(document.body.beforeDisplay + ' this. document.body.beforeDisplay');
  const resize = () => {
    if(document.documentElement.clientWidth > breakpoint && display === 'sp') {
      display = document.body.display = 'pc';
      document.body.beforeDisplay = 'sp';
      document.body.dispatchEvent(displayEvent);
    } else if(document.documentElement.clientWidth <= breakpoint && display === 'pc') {
      display = document.body.display = 'sp';
      document.body.beforeDisplay = 'pc';
      document.body.dispatchEvent(displayEvent);
    }
    console.log(document.body.display + ' this. document.body.display');
    console.log(document.body.beforeDisplay + ' this. document.body.beforeDisplay');
  };

  // ロード終わったらする処理
  const loadedFunc = () => {
    document.body.classList.add('is-loaded');
    console.log('is-loaded');
  };

  displayEvent.initEvent('changedisplay', true, true);
  window.addEventListener('load', loadedFunc, false);
  window.addEventListener('resize', resize, false);
  return;
})();
