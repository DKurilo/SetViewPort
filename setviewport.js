/*!
 * SetViewPort
 *
 * Copyright © 2015 Dmitry Kurilo | BSD & MIT license
 *
 * Add to a <head>:
 * <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
 * <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
 * <script>window.jQuery || document.write('<script src="jquery-1.11.1.min.js"><\/script>')</script>
 * <script src="setviewport.js"></script>
 */
// set viewport for mobile devices
var ios7safariregex = new RegExp(/.*iP[ha].*;.*CPU.*OS \d\_\d.*Safari.*/i);
var ios7 = ios7safariregex.test(navigator.userAgent);
var ie9 = navigator.userAgent.toLowerCase().indexOf( 'iemobile/9.0' ) != -1;
var ie = navigator.userAgent.toLowerCase().indexOf( 'iemobile' ) != -1;
var iwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
if( ie9 ) {
  document.write( '<meta name="viewport" content="width=device-width, user-scalable=yes">' );
  document.write( '<link rel="stylesheet" type="text/css" href="/mobile/css/ie9.css" />' );
} else if( ie  ) {
  document.write( '<link rel="stylesheet" type="text/css" href="/mobile/css/ie.css" />' );
} else if ( navigator.userAgent.toLowerCase().indexOf( 'android 2.3.6' ) != -1  ) {
  document.write( '<meta name="viewport" content="width='+($(window).width()>0?$(window).width()-80:640)+', user-scalable=yes">' );
} else if (ios7) {
  document.write( '<meta name="viewport" content="width=640, user-scalable=yes">' );
} else if ( navigator.userAgent.toLowerCase().indexOf( 'iphone' ) != -1 ) {
  document.write( '<meta name="viewport" content="width=640, user-scalable=yes">' );
} else if ( navigator.userAgent.toLowerCase().indexOf( 'ipad' ) != -1 ) {
  document.write( '<meta name="viewport" content="width=640, user-scalable=yes">' );
} else {
  document.write( '<meta name="viewport" content="width=360,initial-scale=1.0,target-densityDPI=360dpi">' );
  $(function(){
    $('html,body').animate({scrollTop: 0}, 1);
    setTimeout(function (){
      var w1 = $(window).height() < $(window).width() ? $(window).height() : $(window).width();
      $('meta[name="viewport"]').remove();
      var px = 640;//target width to achieve
      var x = 360/w1;
      var out = Math.ceil(px*x);
      $('<meta name="viewport" id="the_vp_special" content="width=360,target-densityDPI='+out+'dpi,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable=yes">').appendTo('head');//insert the new meta tag on the head  
      var dimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
      if (window.devicePixelRatio !== undefined && dimension != px) {
        var viewPortScale = dimension / px;
        $('#the_vp_special').attr('content', 'user-scalable=yes, initial-scale='+viewPortScale+',maximum-scale='+viewPortScale*8+',minimum-scale='+viewPortScale+', width=device-width');
      }
    },250);
  });
}
// end of viewport