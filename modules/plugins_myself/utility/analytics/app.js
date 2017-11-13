'use strict';
$(function(){
  var getEvent = {
    init: function() {
      this.getParamater();
      this.bindEvent();
    },
    getParamater: function() {
      var _this = this;
      this.$window = $(window);
      this.$applyBtn = $('.js-click-event');
      this.watchArrey = [];

      $('[data-scroll]').each(function() {
        _this.watchArrey.push(this);
      });
    },
    bindEvent: function() {
      this.$applyBtn.on('click', this.getClick.bind(this));
      this.$window.on('resize', this.getScroll.bind(this));
      this.$window.on('scroll', this.getScroll.bind(this));
    },
    getClick: function(e) {
      e.preventDefault();
      var $target = $(e.currentTarget);
      var clickData = $target.data('click'),
          event = clickData.event,
          category = clickData.category,
          action = clickData.action,
          label = clickData.label;
      console.log(event);
      console.log(category);
      console.log(action);
      console.log(label);
      // dataLayer.push({
      //   'event' : event,
      //   'eventCategory' : category,
      //   'eventAction' : action,
      //   'eventLabel' : label
      // });
    },
    getScroll: function() {
      var scrollData,
          event,
          category,
          action,
          label;
      for(var i = 0; i < this.watchArrey.length; i++) {
        var winHeight = this.$window.height();
        var scrollTop = this.$window.scrollTop();
        var $target = $(this.watchArrey[i]);
        var conHeight = $target.outerHeight();
        var fromTop = $target.offset().top;
        if($target.is(':visible') && (fromTop + conHeight) <= (scrollTop + winHeight)) {
          scrollData = $target.data('scroll');
          event = scrollData.event;
          category = scrollData.category;
          action = scrollData.action;
          label = scrollData.label;
          this.watchArrey.splice(i, 1);
          console.log(event);
          console.log(category);
          console.log(action);
          console.log(label);
          // dataLayer.push({
          //   'event': event,
          //   'eventCategory': category,
          //   'eventAction': action,
          //   'eventLabel': label
          // });
        }
      }
    }
  };
  getEvent.init();
});
