$(function(){

var nav = $('.nav');
var navTop = nav.offset().top+700;//超過多少才會出現BAR
var navHeight = nav.height();
var showFlug = false;
nav.css('top', -navHeight+'px');


var topBtn = $('#pageTop');	
topBtn.hide();

$(window).scroll(function () {
if ($(this).scrollTop() > 10) {
topBtn.fadeIn();
} else {
topBtn.fadeOut();
}
});

$(window).scroll(function () {
var winTop = $(this).scrollTop();
if (winTop >= navTop) {
if (showFlug == false) {
showFlug = true;
nav.css("display","block");
nav.addClass('fixed').stop().animate({'top' : '0px'}, 500);
}
} else if (winTop <= navTop) {
if (showFlug) {
showFlug = false;
nav.stop().animate({'top' : -navHeight+'px'}, 500, 
function(){
nav.removeClass('fixed');
nav.css("display","none");
});
}
}
});

});



// t: current time, b: begInnIng value, c: change In value, d: duration
jQuery.easing['jswing'] = jQuery.easing['swing'];

jQuery.extend( jQuery.easing,
{
	def: 'easeOutQuad',
	easeOutQuad: function (x, t, b, c, d) {
	    	return -c *(t/=d)*(t-2) + b;
	},
	easeInQuad: function (x, t, b, c, d) {
		return c*(t/=d)*t + b;
	},
	easeOutQuart: function (x, t, b, c, d) {
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeInOutQuint: function (x, t, b, c, d) {
		if ((t/=d/2) < 1) return c/2*t*t*t*t*t + b;
		return c/2*((t-=2)*t*t*t*t + 2) + b;
	}
});

/* ---------------------------------------------------------------
 * smooth scroll
--------------------------------------------------------------- */

$(function(){

   $('a[href^=#], area[href^=#]').click(function() {
      
      var speed = 1500;//

      var href= $(this).attr("href");

      var target = $(href == "" ? 'html' : href);

      var position = target.offset().top;

      $('body,html').animate({scrollTop:position}, speed, 'easeInOutQuint');
      return false;
   });
});

























