'use strict';

(function() {
  //Youtube API 読み込み
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


  var topVideo = function($content) {
    this.$content = $content;
    this.init();
  };
  topVideo.prototype = {
    init: function() {
      this.getParamater();
      this.bindEvent();
    },
    getParamater: function() {
      this.$videoContainer = this.$content.find('.js-youtubeplayer');
      this.$videoLinks = this.$content.find('.top-video-links');
      this.$videoLink = this.$videoLinks.find('a');
    },
    bindEvent: function() {
      this.$videoLink.on('click.youtubeChange', this.changeVideo.bind(this)).first().triggerHandler('click.youtubeChange');
      this.$videoLink.on('click', this.changeVideoBtn.bind(this));
    },
    changeVideoBtn: function(e) {
      var $target = $(e.currentTarget);
      this.$videoLink.each( function() {
        $(this).removeClass('active');
        $(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on', '_off'));
      });
      $target.addClass('active');
      $target.find('img').attr('src', $target.find('img').attr('src').replace('_off', '_on'));
      return false;
    },
    changeVideo: function(e) {
      var $target = $(e.currentTarget),
          videoId = $target.data('video-id');
      if(this.player){ // すでにyoutubeが構築されていたら一旦削除
        this.player.destroy();
      }
      this.player = new YT.Player(this.$videoContainer[0], {
        videoId: videoId,
        playerVars: {
          rel: 0
        },
        events: {
          onStateChange: this.onStateChange.bind(this)
        }
      });
      return false;
    },
    onStateChange: function(){
      console.log('state changed');
    }
  };

  window.onYouTubeIframeAPIReady = function(){
    $(function(){
      $('.top-content').each(function(){
        new topVideo($(this));
      });
    });
  };
})();





/**
*
*     上に画像を乗せて、それをクリックして再生
*
**/

function Youtube(el){
  this.$videoWrap = $(el);
  this.init();
}
Youtube.prototype = {
  init: function() {
    this.getParamater();
    this.bindEvent();
  },
  getParamater: function() {
    this.$video = this.$videoWrap.find('.js-youtube-inner');
  },
  bindEvent: function() {
    this.insertVideo();
    this.$videoWrap.on('click', this.playVideo.bind(this));
  },
  insertVideo: function() {
    var videoId = this.$videoWrap.data('video-id');
    this.player = new YT.Player(this.$video[0], {
      videoId: videoId,
      playerVars: {
        rel: 0
      },
      events: {
        onReady: this.onPlayerReady.bind(this),
        onStateChange: this.onStateChange.bind(this)
      }
    });
    return false;
  },
  onPlayerReady: function() {
    this.ready = true;
  },
  onStateChange: function(e){
    console.log(e);
  },
  playVideo: function(e) {
    if(this.ready){
      var $target = $(e.currentTarget).find('img');
      $target.hide();
      this.player.playVideo();
    }
  }
};
window.onYouTubeIframeAPIReady = function(){
  $('.js-youtube').each(function () {
    new Youtube(this);
  });
};
