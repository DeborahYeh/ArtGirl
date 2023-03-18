// 版頭AD輪撥
var mySwiper = new Swiper('.slider_box .swiper-container', {
	effect: 'fade',
	loop: true,
	autoplay: {
		delay: 4000,
		disableOnInteraction: false,
	},
	pagination: {
		el: 'slider_box .swiper-pagination',
	},
	mousewheel: true,
	navigation: {
		nextEl: '.slider_box .swiper-button-next',
		prevEl: '.slider_box .swiper-button-prev',
	},
	on: {
		init: function () {
			swiperAnimateCache(this);
			swiperAnimate(this);
		},
		slideChangeTransitionEnd: function () {
			swiperAnimate(this);
		}
	}
});
// 全版版頭輪撥
var mainSwiper = new Swiper('#main_slider .swiper-container', {
	loop: true,
	mousewheel: false,
	autoplay: {
		delay: 3500,
		disableOnInteraction: false,
	},
	pagination: {
		el: '#main_slider .swiper-pagination',
	},
	navigation: {
		nextEl: '#main_slider .swiper-button-next',
		prevEl: '#main_slider .swiper-button-prev',
	}
});

// 右側邊欄控制
$(window).scroll(function () {
	if ($(window).scrollTop() >= 10) {
		$('.right_box').addClass('show');
	} else {
		$('.right_box').removeClass('show');
	}
});

// 左側選單控制
$('.navbox .arrow_box').click(function () {
	$('.navbox .arrow_box').toggleClass('rotate');
	$('.navbox').toggleClass('act');
	$('nav').toggleClass('gohide');
});
$(window).scroll(function () {
	if ($(window).scrollTop() >= 110) {
		$('.navbox').addClass('subfixed');
	} else {
		$('.navbox').removeClass('subfixed');
	}
});

// 行動裝置選單
$('.navbar-toggler').click(function () {
	$(this).toggleClass('is-open');
	$('.nav_wrap, .nav_mb').toggleClass('visible');
	$('.menuMask').toggleClass('cover-bg');
	$('body, html').toggleClass('act');
});
if ($(window).width() < 769) {
	mbMenu();
}
var resizeTimer = null;
$(window).bind('resize', function () {
	if (resizeTimer) clearTimeout(resizeTimer);
	resizeTimer = setTimeout(function () {
		mbMenu();
	}, 300);
});
function mbMenu() {
	$('.nav_wrap ul li').click(function () {
		$(this).nextAll('li').removeClass('act');
		$(this).prevAll('li').removeClass('act');
		$(this).toggleClass('act');
	});
}

// hashtag Smooth scrolling
var $clickTag = $('area[href^="#"], .menu_box a[href^="#"], .gotop a.pc[href^="#"], a.gotheme');
$clickTag.click(function () {
	var target = $(this.getAttribute('href'));
	if ($(window).width() < 768) {
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top - 50
			}, 300);
		}
		return false;
	} else {
		if (target.length) {
			event.preventDefault();
			$('html, body').stop().animate({
				scrollTop: target.offset().top
			}, 300);
		}
		return false;
	}
});
$('.gotop a.mb[href^="#"]').click(function () {
	event.preventDefault();
	jQuery("html,body").animate({
		scrollTop: 0
	}, 300);
});

// modal 影片
var $videoSrc;
$('.video-btn').click(function () {
	$videoSrc = $(this).data("src");
});
$('#video_box').on('shown.bs.modal', function (e) {
	$("#video").attr('src', $videoSrc + "?autoplay=1&amp;modestbranding=1&amp;showinfo=0");
});
$('#video_box').on('hide.bs.modal', function (e) {
	$("#video").attr('src', $videoSrc);
})

// 影像地圖RWD
// $('map').imageMapResize();


$(document).on('click', 'a[href^="#"]', function (event) {
	event.preventDefault();
	$('html, body').animate({
		scrollTop: $($.attr(this, 'href')).offset().top - 125
	}, 700);

});
