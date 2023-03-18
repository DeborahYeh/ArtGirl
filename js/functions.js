jQuery(function($) {
	'use strict';
	/*
		Dropdown Menu
	*/
	var dropdownMenu = function() {
		$('#sidebar nav ul .dropdown > span').on('click', function() {
			var $parent = $(this).parent();
			if (!$parent.hasClass('expanded')) {
				$('#sidebar nav ul .dropdown').removeClass('expanded');
				$('#sidebar nav ul .dropdown > ul').slideUp(300);
				$parent.find('> ul').slideDown(300);
				$parent.addClass('expanded');
			} else {
				$parent.removeClass('expanded');
				$parent.find('> ul').slideUp(300);
			}
		});
	}

	/*
		Project Carousel
	*/
	var projectCarousel = function() {
		$('#project-page #project-carousel').carousel();
	}

	/*
		Project Gallery
	*/
	var projectGallery = function() {
		$('#project-page .gallery').magnificPopup({
			delegate: 'a',
			type: 'image',
			closeOnContentClick: false,
			closeBtnInside: false,
			mainClass: 'mfp-with-zoom mfp-img-mobile',
			image: {
				verticalFit: true
			},
			gallery: {
				enabled: true
			},
			zoom: {
				enabled: true,
				duration: 300,
				opener: function(element) {
					return element.find('img');
				}
			}
		});
	}

	/*
		Contact Form
	*/
	var contactForm = function() {
		var inputName = $('#contact-name');
		var inputEmail = $('#contact-email');
		var inputSubject = $('#contact-subject');
		var inputMessage = $('#contact-message');
		$('#contact-page #submit').on('click', function() {
			var name = inputName.val();
			var email = inputEmail.val();
			var subject = inputSubject.val();
			var message = inputMessage.val();
			var valid = true;

			if (name == '') {
				inputName.addClass('invalid');
				valid = false;
			}

			if (email == '') {
				inputEmail.addClass('invalid');
				valid = false;
			}

			if (message == '') {
				inputMessage.addClass('invalid');
				valid = false;
			}

			var postData = {
				'name': name,
				'email': email,
				'subject': subject,
				'message': message
			};

			if (valid) {
				$.post('./php/mail.php', postData, function(response) {
					$('#contact-page #message .error, #contact-page #message .success').empty();
					for (var i = 0, n = response.length; i < n; i++) {
						if (response[i].status == 0) {
							$('#contact-page #message .error').append('<p>' + response[i].message + '</p>');
							$('#contact-' + response[i].field).addClass('invalid');
						}

						if (response[i].status == 1) {
							$('#contact-page #message .success').append('<p>' + response[i].message + '</p>');
						}
					}
				}, 'json');
			}
			return false;
		});

		$('#contact-page form input, #contact-page form textarea').on('keyup', function() {
			$(this).removeClass('invalid');
		});
	}

	/*
		Animsition
	*/
	var animsition = function() {
		$('.global-outer').animsition({
			inClass: 'fade-in',
			outClass: 'fade-out',
			inDuration: 400,
			outDuration: 400,
			linkElement: '.smooth-leave',
			loading: true,
			loadingParentElement: 'body',
			loadingClass: 'animsition-loading',
			loadingInner: '',
			timeout: false,
			timeoutCountdown: 5000,
			onLoadEvent: true,
			browser: [
				'animation-duration',
				'-webkit-animation-duration'
			],
			overlay : false,
			overlayClass : 'animsition-overlay-slide',
			overlayParentElement : 'body',
			transition: function(url) {
				window.location.href = url;
			}
		});
	}

	/*
		Isotope
	*/
	var isotope = function() {
		var $grid = $('#works-grid');
		var $filter = $('#works-filter');

		$grid.imagesLoaded(function() {
			$grid.isotope({
				itemSelector: '.works-item',
				masonry: {
					gutter: '.gutter'
				}
			});
		});

		$filter.find('ul li').on('click', function() {
			$filter.find('ul li').removeClass('active');
			$(this).addClass('active');
			var category = $(this).attr('data-filter');
			$grid.isotope({
				filter: category
			});
			return false;
		});
	}

	$(window).on('load', isotope);
	
	$(document).ready(function() {
		dropdownMenu();
		projectCarousel();
		projectGallery();
		contactForm();
		animsition();
	});
});