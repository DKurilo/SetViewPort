/*!
 * SetViewPort
 *
 * Copyright © 2015 Dmitry Kurilo | BSD & MIT license | https://github.com/DKurilo/SetViewPort
 *
 * Add to a <head>:
 * <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
 * <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
 * <script>window.jQuery || document.write('<script src="jquery-1.11.1.min.js"><\/script>')</script>
 * <script src="setviewport.js"></script>
 */
// set viewport for mobile devices
var widthToSet = 1024, // width to achieve
    scalable = false,  // make it scalable
    minScale = 1,      // set minimum scale
    maxScale = 1;      // set maximum scale
var ios7safariregex = new RegExp(/.*iP[ha].*;.*CPU.*OS \d\_\d.*Safari.*/i);
var ios7 = ios7safariregex.test(navigator.userAgent);
var ie9 = navigator.userAgent.toLowerCase().indexOf( 'iemobile/9.0' ) != -1;
var ie = navigator.userAgent.toLowerCase().indexOf( 'iemobile' ) != -1;
if( ie9 ) {
  document.write( '<meta name="viewport" content="width=device-width, user-scalable='+(scalable?'yes':'no')+'">' );
  document.write( '<link rel="stylesheet" type="text/css" href="/mobile/css/ie9.css" />' );
} else if( ie  ) {
  document.write( '<link rel="stylesheet" type="text/css" href="/mobile/css/ie.css" />' );
} else if ( navigator.userAgent.toLowerCase().indexOf( 'android 2.3.6' ) != -1  ) {
  document.write( '<meta name="viewport" content="width='+($(window).width()>0?$(window).width()-80:widthToSet)+', user-scalable='+(scalable?'yes':'no')+'">' );
} else if (ios7) {
  document.write( '<meta name="viewport" content="width='+widthToSet+', user-scalable='+(scalable?'yes':'no')+'">' );
} else if ( navigator.userAgent.toLowerCase().indexOf( 'iphone' ) != -1 ) {
  document.write( '<meta name="viewport" content="width='+widthToSet+', user-scalable='+(scalable?'yes':'no')+'">' );
} else if ( navigator.userAgent.toLowerCase().indexOf( 'ipad' ) != -1 ) {
  document.write( '<meta name="viewport" content="width='+widthToSet+', user-scalable='+(scalable?'yes':'no')+'">' );
} else {
  document.write( '<meta name="viewport" content="width=360,initial-scale=1.0,target-densityDPI=360dpi">' );
  $(function(){
    $('html,body').animate({scrollTop: 0}, 1);
    setTimeout(function (){
      var w1 = $(window).height() < $(window).width() ? $(window).height() : $(window).width();
      $('meta[name="viewport"]').remove();
      var x = 360/w1;
      var out = Math.ceil(widthToSet*x);
      $('<meta name="viewport" id="the_vp_special" content="width=360,target-densityDPI='+out+'dpi,initial-scale=1.0,maximum-scale=1.0,minimum-scale=1.0,user-scalable='+(scalable?'yes':'no')+'">').appendTo('head');//insert the new meta tag on the head  
      var dimension = window.innerHeight < window.innerWidth ? window.innerHeight : window.innerWidth
      if (window.devicePixelRatio !== undefined && dimension != widthToSet) {
        var viewPortScale = dimension / widthToSet;
        $('#the_vp_special').attr('content', 'user-scalable='+(scalable?'yes':'no')+', initial-scale='+viewPortScale+',maximum-scale='+(viewPortScale*maxScale)+',minimum-scale='+(viewPortScale*maxScale)+', width=device-width');
      }
    },250);
  });
}
// end of viewport