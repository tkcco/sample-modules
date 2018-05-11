# Markdownの書き方

---

## これがhtmlでいうh2タグ
- リスト
- リスト
- リスト
  - リスト
  - リスト
  - リスト
- リスト
- リスト

---

### これがhtmlでいうh3タグ

**太字**

_斜体_

> 引用

`強調です`

```Javascript
dropObj.prototype.init = function() {
   var that = this;
   this.setWindow();
   this.create();
   $(window).on('resize',function() {
     that.play();
   });
 };

 dropObj.prototype.setWindow = function() {
   var $window = $(window);
   var winWidth = $window.width();
   var winHeight = $window.height();
   var $openning = $('.js-openning');
   $openning.css({
     width: winWidth,
     height: winHeight
   });
   $window.on('resize', function() {
     var winWidth = $window.width();
     var winHeight = $window.height();
     $openning.css({
       width: winWidth,
       height: winHeight
     });
   });
 };
```

~~~ruby
class Hoge
  def hoge
    print 'hoge'
  end
end
~~~

- [ ] チェックボックス
- [ ] チェックボックス
- [ ] チェックボックス
- [ ] チェックボックス

---

#### これがhtmlでいうh4タグ

~~取り消し線~~

|header1|header2|header3|
|:--|--:|:--:|
|align left|align right|align center|
|a|b|c|


[Markdown記法 サンプル集](https://qiita.com/tbpgr/items/989c6badefff69377da7)