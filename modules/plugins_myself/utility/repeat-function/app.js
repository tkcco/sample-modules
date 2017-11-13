/**
 *   Object.key(obj).forEach(function() {
 *     // 処理
 *   });
 **/

this.test = ['hoi', 'que', 'odn', 'ghu', 'jui', 'kea'];
var that = this;
this.test.forEach(function(element, index, array) {
  console.log(element, index, array);
});
