$(function() {
  $('.form-list input').on('click', function(e) {
    var label = $(e.target).data('event-label');
    console.log(label);
  });
});
