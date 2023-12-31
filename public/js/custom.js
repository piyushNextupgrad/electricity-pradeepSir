(function($) {
    "use strict";

		//cover images
	$( ".cover-image").each(function() {
		  var attr = $(this).attr('data-image-src');
		
		  if (typeof attr !== typeof undefined && attr !== false) {
			  $(this).css('background', 'url('+attr+') center center');
		  }
	});
	
	// ______________ Horizonatl
	$(document).ready(function() {
      $("a[data-theme]").click(function() {
        $("head link#theme").attr("href", $(this).data("theme"));
        $(this).toggleClass('active').siblings().removeClass('active');
      });
      $("a[data-effect]").click(function() {
        $("head link#effect").attr("href", $(this).data("effect"));
        $(this).toggleClass('active').siblings().removeClass('active');
      });
    });


	// ______________Full screen
	$("#fullscreen-button").on("click", function toggleFullScreen() {
      if ((document.fullScreenElement !== undefined && document.fullScreenElement === null) || (document.msFullscreenElement !== undefined && document.msFullscreenElement === null) || (document.mozFullScreen !== undefined && !document.mozFullScreen) || (document.webkitIsFullScreen !== undefined && !document.webkitIsFullScreen)) {
        if (document.documentElement.requestFullScreen) {
          document.documentElement.requestFullScreen();
        } else if (document.documentElement.mozRequestFullScreen) {
          document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullScreen) {
          document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
        } else if (document.documentElement.msRequestFullscreen) {
          document.documentElement.msRequestFullscreen();
        }
      } else {
        if (document.cancelFullScreen) {
          document.cancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    })


	// ______________ Page Loading
	$(window).on("load", function(e) {
		$("#global-loader").fadeOut("slow");
	})

	// ______________Back to top Button
	$(window).on("scroll", function(e) {
    	if ($(this).scrollTop() > 0) {
            $('#back-to-top').fadeIn('slow');
        } else {
            $('#back-to-top').fadeOut('slow');
        }
    });
    $("#back-to-top").on("click", function(e){
        $("html, body").animate({
            scrollTop: 0
        }, 600);
        return false;
    });

	// ______________ StarRating
	var ratingOptions = {
		selectors: {
			starsSelector: '.rating-stars',
			starSelector: '.rating-star',
			starActiveClass: 'is--active',
			starHoverClass: 'is--hover',
			starNoHoverClass: 'is--no-hover',
			targetFormElementSelector: '.rating-value'
		}
	};
	$(".rating-stars").ratingStars(ratingOptions);

	// ______________ Chart-circle
	if ($('.chart-circle').length) {
		$('.chart-circle').each(function() {
			let $this = $(this);

			$this.circleProgress({
			  fill: {
				color: $this.attr('data-color')
			  },
			  size: $this.height(),
			  startAngle: -Math.PI / 4 * 2,
			  emptyFill: '#e5e9f2',
			  lineCap: 'round'
			});
		});
	}

	// ______________ Global Search
	$(document).on("click", "[data-toggle='search']", function(e) {
		var body = $("body");

		if(body.hasClass('search-gone')) {
			body.addClass('search-gone');
			body.removeClass('search-show');
		}else{
			body.removeClass('search-gone');
			body.addClass('search-show');
		}
	});
	var toggleSidebar = function() {
		var w = $(window);
		if(w.outerWidth() <= 1024) {
			$("body").addClass("sidebar-gone");
			$(document).off("click", "body").on("click", "body", function(e) {
				if($(e.target).hasClass('sidebar-show') || $(e.target).hasClass('search-show')) {
					$("body").removeClass("sidebar-show");
					$("body").addClass("sidebar-gone");
					$("body").removeClass("search-show");
				}
			});
		}else{
			$("body").removeClass("sidebar-gone");
		}
	}
	toggleSidebar();
	$(window).resize(toggleSidebar);

	const DIV_CARD = 'div.card';
	// ______________ Tooltip
	$('[data-toggle="tooltip"]').tooltip();

	// ______________ Popover
	$('[data-toggle="popover"]').popover({
		html: true
	});

	// ______________ Card Remove
	$(document).on('click', '[data-toggle="card-remove"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.remove();
		e.preventDefault();
		return false;
	});

	// ______________ Card Collapse
	$(document).on('click', '[data-toggle="card-collapse"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________ Card Fullscreen
	$(document).on('click', '[data-toggle="card-fullscreen"]', function(e) {
		let $card = $(this).closest(DIV_CARD);
		$card.toggleClass('card-fullscreen').removeClass('card-collapsed');
		e.preventDefault();
		return false;
	});

	// ______________ SWITCHER-toggle 
	
	/*Skin modes*/
	
	$(document).on("click", '#myonoffswitch', function () {    
		if (this.checked) {
			$('body').addClass('light-mode');
			$('body').removeClass('dark-mode');
			localStorage.setItem("light-mode", "True");
		}
		else {
			$('body').removeClass('light-mode');
			localStorage.setItem("light-mode", "false");
		}
	});
	$(document).on("click", '#myonoffswitch1', function () {    
		if (this.checked) {
			$('body').addClass('dark-mode');
			$('body').removeClass('light-mode');
			localStorage.setItem("dark-mode", "True");
		}
		else {
			$('body').removeClass('dark-mode');
			localStorage.setItem("dark-mode", "false");
		}
	});
	
	/*-- Body Styles---*/
	
	$(document).on("click", '#myonoffswitch2', function () {    
		if (this.checked) {
			$('body').addClass('default-style');
			$('body').removeClass('body-style1');
			$('body').removeClass('body-style2');
			localStorage.setItem("default-style", "True");
		}
		else {
			$('body').removeClass('default-style');
			localStorage.setItem("default-style", "false");
		}
	});
	$(document).on("click", '#myonoffswitch3', function () {    
		if (this.checked) {
			$('body').addClass('body-style1');
			$('body').removeClass('default-style');
			$('body').removeClass('body-style2');
			localStorage.setItem("body-style1", "True");
		}
		else {
			$('body').removeClass('body-style1');
			localStorage.setItem("body-style1", "false");
		}
	});
	$(document).on("click", '#myonoffswitch4', function () {    
		if (this.checked) {
			$('body').addClass('body-style2');
			$('body').removeClass('body-style1');
			$('body').removeClass('default-style');
			localStorage.setItem("body-style2", "True");
		}
		else {
			$('body').removeClass('body-style2');
			localStorage.setItem("body-style2", "false");
		}
	});
	
	/*-- Horizonatal Versions---*/
	
	$('#myonoffswitch5').click(function () {    
		if (this.checked) {
			$('body').addClass('default');
			$('body').removeClass('boxed');
			localStorage.setItem("default", "True");
		}
		else {
			$('body').removeClass('default');
			localStorage.setItem("default", "false");
		}
	});
	$('#myonoffswitch6').click(function () {    
		if (this.checked) {
			$('body').addClass('boxed');
			$('body').removeClass('default');
			localStorage.setItem("boxed", "True");
		}
		else {
			$('body').removeClass('boxed');
			localStorage.setItem("boxed", "false");
		}
	});
	
	/*------ Horizonatal-menu-------*/
	
	/*Header Style*/
	$(document).on("click", '#myonoffswitch7', function () {    
		if (this.checked) {
			$('body').addClass('default-menu');
			$('body').removeClass('menu-style1');
			$('body').removeClass('menu-style2');
			$('body').removeClass('color-menu');
			$('body').removeClass('dark-menu');
			localStorage.setItem("default-menu", "True");
		}
		else {
			$('body').removeClass('default-menu');
			localStorage.setItem("default-menu", "false");
		}
	});	
	$(document).on("click", '#myonoffswitch8', function () {    
		if (this.checked) {
			$('body').addClass('menu-style1');
			$('body').removeClass('default-menu');
			$('body').removeClass('menu-style2');
			$('body').removeClass('color-menu');
			$('body').removeClass('dark-menu');
			localStorage.setItem("menu-style1", "True");
		}
		else {
			$('body').removeClass('menu-style1');
			localStorage.setItem("menu-style1", "false");
		}
	});
	$(document).on("click", '#myonoffswitch9', function () {    
		if (this.checked) {
			$('body').addClass('menu-style2');
			$('body').removeClass('menu-style1');
			$('body').removeClass('default-menu');
			$('body').removeClass('color-menu');
			$('body').removeClass('dark-menu');
			localStorage.setItem("menu-style2", "True");
		}
		else {
			$('body').removeClass('menu-style2');
			localStorage.setItem("menu-style2", "false");
		}
	});	
	$(document).on("click", '#myonoffswitch10', function () {    
		if (this.checked) {
			$('body').addClass('color-menu');
			$('body').removeClass('menu-style1');
			$('body').removeClass('menu-style2');
			$('body').removeClass('default-menu');
			$('body').removeClass('dark-menu');
			localStorage.setItem("color-menu", "True");
		}
		else {
			$('body').removeClass('color-menu');
			localStorage.setItem("color-menu", "false");
		}
	});	
	$(document).on("click", '#myonoffswitch11', function () {    
		if (this.checked) {
			$('body').addClass('dark-menu');
			$('body').removeClass('menu-style1');
			$('body').removeClass('menu-style2');
			$('body').removeClass('color-menu');
			$('body').removeClass('default-menu');
			localStorage.setItem("dark-menu", "True");
		}
		else {
			$('body').removeClass('dark-menu');
			localStorage.setItem("dark-menu", "false");
		}
	});	
	
	/*------ left-menu-------*/
	$(document).on("click", '#myonoffswitch12', function () {    
		if (this.checked) {
			$('body').addClass('color-leftmenu');
			$('body').removeClass('dark-leftmenu');
			$('body').removeClass('reset');
			localStorage.setItem("color-leftmenu", "True");
		}
		else {
			$('body').removeClass('color-leftmenu');
			localStorage.setItem("color-leftmenu", "false");
		}
	});	
	$(document).on("click", '#myonoffswitch13', function () {    
		if (this.checked) {
			$('body').addClass('dark-leftmenu');
			$('body').removeClass('color-leftmenu');
			$('body').removeClass('reset');
			localStorage.setItem("dark-leftmenu", "True");
		}
		else {
			$('body').removeClass('dark-leftmenu');
			localStorage.setItem("dark-leftmenu", "false");
		}
	});	
	$(document).on("click", '#myonoffswitch14', function () {    
		if (this.checked) {
			$('body').addClass('reset');
			$('body').removeClass('color-leftmenu');
			$('body').removeClass('dark-leftmenu');
			$('body').removeClass('leftmenuimage2');
			$('body').removeClass('leftmenuimage1');
			localStorage.setItem("reset", "True");
		}
		else {
			$('body').removeClass('reset');
			localStorage.setItem("reset", "false");
		}
	});

	$('#leftmenuimage1').on('click', function() {
	  $('body').removeClass('leftmenuimage2');
	  $('body').addClass('leftmenuimage1');
	  return false;
	});
	
	$('#leftmenuimage2').on('click', function() {
	  $('body').removeClass('leftmenuimage1');
	  $('body').addClass('leftmenuimage2');
	  return false;
	});	

	
	// ______________Active Class
	$(document).ready(function() {
		$(".horizontalMenu-list li a").each(function() {
			var pageUrl = window.location.href.split(/[?#]/)[0];
			if (this.href == pageUrl) {
				$(this).addClass("active");
				$(this).parent().addClass("active"); // add active to li of the current link
				$(this).parent().parent().prev().addClass("active"); // add active class to an anchor
				$(this).parent().parent().prev().click(); // click the item to make it drop
			}
		});
	});
	
	
})(jQuery);

