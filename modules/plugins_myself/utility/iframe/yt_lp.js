(function(){
  // var video_id = 'KriVsK-HOqk';
  var tag = document.createElement('script');
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName('script')[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

  console.log(tag);
  var YoutubePlayer = (function(){
    function Element(el){
      this.$el = $(el);
      this.videoId = this.$el.data('video-id');
      this.render();
    };

    $.extend(Element.prototype, {
      render: function(){
        this.player = new YT.Player(this.$el[0], {
          videoId: this.videoId,
          playerVars: {
              rel: 0, // 再生終了後に関連動画を表示するかどうか設定
              enablejsapi: 1 // 自動再生するかどうか設定
          },
      		events: {
      			'onStateChange': this.onStateChange.bind(this)
      		}
        });
      },
      onStateChange: function(event){
        console.log(event);
      //   if (event.data == YT.PlayerState.PLAYING) {
      //     // Play
      //     dataLayer.push({
      //       'event' : 'youtube_start',
      //       'video_id' : this.videoId
      //     });
      //   }
      }
    });

    return Element;
  }());

  window.onYouTubeIframeAPIReady = function(){
    $(function(){
      $('.js-youtubeplayer').each(function(){
        new YoutubePlayer(this);
      });
    });
  };
}());





// (function() {
//   //Youtube API 読み込み
//   var tag = document.createElement('script');
//   tag.src = "https://www.youtube.com/iframe_api";
//   var firstScriptTag = document.getElementsByTagName('script')[0];
//   firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
//
//
//   var topVideo = function($content) {
//     this.$content = $content;
//     this.init();
//   };
//   topVideo.prototype = {
//     init: function() {
//       this.getParamater();
//       this.bindEvent();
//     },
//     getParamater: function() {
//       this.$videoContainer = this.$content.find('.js-youtubeplayer');
//       this.$videoLinks = this.$content.find('.top-video-links');
//       this.$videoLink = this.$videoLinks.find('a');
//     },
//     bindEvent: function() {
//       this.$videoLink.on('click.youtubeChange', this.changeVideo.bind(this)).first().triggerHandler('click.youtubeChange');
//       this.$videoLink.on('click', this.changeVideoBtn.bind(this));
//     },
//     changeVideoBtn: function(e) {
//       e.preventDefault();
//       var $target = $(e.currentTarget);
//       this.$videoLink.each( function() {
//         $(this).removeClass('active');
//         $(this).find('img').attr('src', $(this).find('img').attr('src').replace('_on', '_off'));
//       });
//       $target.addClass('active');
//       $target.find('img').attr('src', $target.find('img').attr('src').replace('_off', '_on'));
//     },
//     changeVideo: function(e) {
//       var $target = $(e.currentTarget),
//           videoId = $target.data('video-id');
//       if(this.player){ // すでにyoutubeが構築されていたら一旦削除
//         this.player.destroy();
//       }
//       this.player = new YT.Player(this.$videoContainer[0], {
//         videoId: videoId,
//         playerVars: {
//           rel: 0
//         },
//         events: {
//           onStateChange: this.onStateChange.bind(this)
//         }
//       });
//       return false;
//     },
//     onStateChange: function(){
//       console.log('state changed');
//     }
//   };
//
//   window.onYouTubeIframeAPIReady = function(){
//     $(function(){
//       $('.top-content').each(function(){
//         new topVideo($(this));
//       });
//     });
//   };
// })();
