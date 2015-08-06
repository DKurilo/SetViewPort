/*!
 * SetViewPort
 *
 * Copyright © 2015 Dmitry Kurilo | BSD & MIT license | https://github.com/DKurilo/SetViewPort
 *
 * Add to a <head>:
 * <meta name="viewport" content="width=device-width,initial-scale=1.0, maximum-scale=1.0, user-scalable=no"/>
 *
 * And before </body>
 *
 * <script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
 * <script>window.jQuery || document.write('<script src="jquery-1.11.1.min.js"><\/script>')</script>
 * <script src="setviewport.js"></script>
 */
// set viewport for mobile devices
'use strict';
(function() {
  var widthToSet = 640, // width to achieve,
      widthToSetHoriz = 1282,
      scalable = false,  // make it scalable
      minScale = 1,      // set minimum scale
      maxScale = 1;      // set maximum scale
  var ios7safariregex = new RegExp(/.*iP[ha].*;.*CPU.*OS \d\_\d.*Safari.*/i);
  var ios7 = ios7safariregex.test(navigator.userAgent);
  var ie9 = navigator.userAgent.toLowerCase().indexOf( 'iemobile/9.0' ) !== -1;
  var ie = navigator.userAgent.toLowerCase().indexOf( 'iemobile' ) !== -1;
  var iwidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  var iheight = window.innerHeight || document.documentElement.clientHeight|| document.body.clientHeight;
  var horiz = false;
  if (iheight < iwidth) {
    horiz = true;
  }
  if (horiz) {
    iwidth = iheight;
    widthToSet = widthToSetHoriz;
  } else if (iwidth > 640) {
    widthToSet = 1124;
  }
  if ( iwidth > 1024 && navigator.userAgent.toLowerCase().indexOf( 'ipad' ) !== -1 ) {
    $('head').append('<meta name="ismobile" content="">');
  }
  if (iwidth > 1024) {
    return;
  }
  $('head').append('<meta name="ismobile" content="">');
  $('head meta[name="viewport"]').remove();
  if( ie9 ) {
    $('head').append( '<meta name="viewport" content="width=device-width, user-scalable='+(scalable?'yes':'no')+'">' );
    $('head').append( '<link rel="stylesheet" type="text/css" href="/assets/css/ie.css" />' ); // if if you need additional styles for IE
  } else if( ie  ) {
    $('head').append( '<link rel="stylesheet" type="text/css" href="/assets/css/ie.css" />' ); // if if you need additional styles for IE
  } else if ( navigator.userAgent.toLowerCase().indexOf( 'android 2.3.6' ) !== -1  ) {
    $('head').append( '<meta name="viewport" content="width='+($(window).width()>0?$(window).width()-80:widthToSet)+', user-scalable='+(scalable?'yes':'no')+'">' );
  } else if (ios7) {
    $('head').append( '<meta name="viewport" content="width='+widthToSet+', user-scalable='+(scalable?'yes':'no')+'">' );
  } else if ( navigator.userAgent.toLowerCase().indexOf( 'iphone' ) !==-1 ) {
    $('head').append( '<meta name="viewport" content="width='+widthToSet+', user-scalable='+(scalable?'yes':'no')+'">' );
  } else if ( navigator.userAgent.toLowerCase().indexOf( 'ipad' ) !== -1 ) {
    $('head').append( '<meta name="viewport" content="width='+widthToSet+', user-scalable='+(scalable?'yes':'no')+'">' );
  } else {
    $(function(){
      $('html,body').animate({scrollTop: 0}, 1);
      setTimeout(function (){
        $('meta[name="viewport"]').remove();
        var x = 360/iwidth;
        var out = Math.ceil(widthToSet*x);
        $('<meta name="viewport" id="the_vp_special" content="width=360,target-densityDPI='+out+'dpi,initial-scale=1,maximum-scale=1,minimum-scale=1,user-scalable='+(scalable?'yes':'no')+'">').appendTo('head');//insert the new meta tag on the head
        var dimension = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        if (window.devicePixelRatio !== undefined && dimension !== widthToSet) {
          var viewPortScale = dimension / widthToSet;
          $('#the_vp_special').attr('content', 'user-scalable='+(scalable?'yes':'no')+', initial-scale='+viewPortScale+',maximum-scale='+(viewPortScale*maxScale)+',minimum-scale='+(viewPortScale*minScale)+', width=device-width');
        }
      },250);
    });
  }
})();
// end of viewport