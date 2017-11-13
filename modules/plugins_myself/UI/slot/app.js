var App = App || {};
(function(){
  'use strict';

  function Slot(){
    this.init();
  };
  Slot.prototype ={
    init: function(){
      this.getParameters();
      this.bindEvents();
    },
    getParameters: function(){
      this.$number = $('.js-number');
      this.$warning = $('.slot-warn.js-show').find('p');
      this.$slotNumber = $('.js-slot-number');
      this.$number.focus();
    },
    bindEvents: function() {
      this.$number.on('change', this.slotNumber.bind(this));
    },
    slotNumber: function (e) {
      e.preventDefault();
      this.$number.blur();
      var $target = $(e.currentTarget);
      var value = $target.val();
      var numberArray = [];
      if (value.length > 6) {
        this.$warning.fadeIn();
        return false;
      }
      $.each(this.$slotNumber, function() {
        numberArray.push($(this).index());
      });
      var numberAreaLength = numberArray.length;
      var hiddenAreaLength = this.$slotNumber.length - value.length;
      var targetAreaLength = value.length;
      // console.log(hiddenAreaLength, ' <= length of hiddenAreaArray');
      // console.log(targetAreaLength, ' <= length of targetAreaArray');
      for (var i = 0, j = 0; i < numberAreaLength; i++) {
        if (i < hiddenAreaLength) {
          this.$slotNumber.eq(i).find('.slot-each-number').hide();
        } else {
          this.$slotNumber.eq(i).find('.slot-each-number').show().animate({
            backgroundPositionY: '-' + (value.charAt(j) * 100) + '%'
          }, 4000);
          j++;
        }
      }
    }
  };

  App.Slot = Slot;
  new App.Slot();
}());
