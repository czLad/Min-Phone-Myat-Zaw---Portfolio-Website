/*
	Landed by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var	$window = $(window),
		$body = $('body');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '981px',   '1280px' ],
			medium:   [ '737px',   '980px'  ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');

	// Scrolly links.
		$('.scrolly').scrolly({
			speed: 2000
		});

	// Dropdowns.
		$('#nav > ul').dropotron({
			alignment: 'right',
			hideDelay: 350
		});

	// Nav.

		// Title Bar.
			$(
				'<div id="titleBar">' +
					'<a href="#navPanel" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$(
				'<div id="navPanel">' +
					'<nav>' +
						$('#nav').navList() +
					'</nav>' +
				'</div>'
			)
				.appendTo($body)
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'left',
					target: $body,
					visibleClass: 'navPanel-visible'
				});

	// Parallax.
	// Disabled on IE (choppy scrolling) and mobile platforms (poor performance).
		if (browser.name == 'ie'
		||	browser.mobile) {

			$.fn._parallax = function() {

				return $(this);

			};

		}
		else {

			$.fn._parallax = function() {

				$(this).each(function() {

					var $this = $(this),
						on, off;

					on = function() {

						$this
							.css('background-position', 'center 0px');

						$window
							.on('scroll._parallax', function() {

								var pos = parseInt($window.scrollTop()) - parseInt($this.position().top);

								$this.css('background-position', 'center ' + (pos * -0.15) + 'px');

							});

					};

					off = function() {

						$this
							.css('background-position', '');

						$window
							.off('scroll._parallax');

					};

					breakpoints.on('<=medium', off);
					breakpoints.on('>medium', on);

				});

				return $(this);

			};

			$window
				.on('load resize', function() {
					$window.trigger('scroll');
				});

		}

	// Spotlights.
		var $spotlights = $('.spotlight');

		$spotlights
			._parallax()
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					var top, bottom, mode;

					// Use main <img>'s src as this spotlight's background.
						$this.css('background-image', 'url("' + $this.find('.image.main > img').attr('src') + '")');

					// Side-specific scrollex tweaks.
						if ($this.hasClass('top')) {

							mode = 'top';
							top = '-20%';
							bottom = 0;

						}
						else if ($this.hasClass('bottom')) {

							mode = 'bottom-only';
							top = 0;
							bottom = '20%';

						}
						else {

							mode = 'middle';
							top = 0;
							bottom = 0;

						}

					// Add scrollex.
						$this.scrollex({
							mode:		mode,
							top:		top,
							bottom:		bottom,
							initialize:	function(t) { $this.addClass('inactive'); },
							terminate:	function(t) { $this.removeClass('inactive'); },
							enter:		function(t) { $this.removeClass('inactive'); },

							// Uncomment the line below to "rewind" when this spotlight scrolls out of view.

							//leave:	function(t) { $this.addClass('inactive'); },

						});

				};

				off = function() {

					// Clear spotlight's background.
						$this.css('background-image', '');

					// Remove scrollex.
						$this.unscrollex();

				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Wrappers.
		var $wrappers = $('.wrapper');

		$wrappers
			.each(function() {

				var $this = $(this),
					on, off;

				on = function() {

					$this.scrollex({
						top:		250,
						bottom:		0,
						initialize:	function(t) { $this.addClass('inactive'); },
						terminate:	function(t) { $this.removeClass('inactive'); },
						enter:		function(t) { $this.removeClass('inactive'); },

						// Uncomment the line below to "rewind" when this wrapper scrolls out of view.

						//leave:	function(t) { $this.addClass('inactive'); },

					});

				};

				off = function() {
					$this.unscrollex();
				};

				breakpoints.on('<=medium', off);
				breakpoints.on('>medium', on);

			});

	// Banner.
		var $banner = $('#banner');

		$banner
			._parallax();

	//Smooth page transitions
	$('a.internal-link').on('click', (event) => {
		if ($(event.currentTarget).attr('href').indexOf('#') === 0) {
			// Ignore internal links (e.g., those linking within the same page)
			return;
		}
	
		event.preventDefault(); // Prevent immediate navigation
		const newLocation = event.currentTarget.href;
	
		$body.addClass('fade-out'); // Add fade-out class to the body
	
		setTimeout(() => {
			window.location = newLocation; // Navigate to the new page after the fade
		}, 500); // Match this time with your CSS transition duration
	});

	// Force page reload on back/forward navigation
	$window.on('pageshow', function(event) {
        if (event.originalEvent.persisted) {
            window.location.reload();
        }
    });

	// Fly-up animation for sections.
    $(document).ready(() => {
        const $flyUpSections = $('.fly-up-section');
    
        const handleScroll = () => {
            const viewportHeight = window.innerHeight;
    
            $flyUpSections.each(function() {
                const $this = $(this);
                const rect = $this[0].getBoundingClientRect();
                if (rect.top < viewportHeight && rect.bottom > 0) {
                    $this.addClass('in-view');
                } else {
                    $this.removeClass('in-view'); // Optional: Remove class when out of view
                }
            });
        };
    
        $window.on('scroll', handleScroll);
        handleScroll(); // Initial check in case element is already in view
    });

	// Fly-in animation for image fit cards.
	$window.on('load', () => {
		const $cards = $('.image.fit.card');
	
		$cards.each(function(index) {
			const $this = $(this);
			setTimeout(() => {
				// Make the card visible but keep img and h3 hidden
				$this.addClass('loading'); // Add the 'loaded' class to trigger animations
				// Remove the 'loaded' class after the animation duration + delay to revert to default styles
				setTimeout(() => {
					$this.removeClass('loading');
					$this.addClass('loaded');
				}, 800); // Adjust this duration to match the total time of your animation
			}, (index+1) * 800); // Stagger the animations with a delay
		});
	});

	// Display message when car reaches the end
	$window.on('load', function() {
        const $car = $('.car');
        const $message = $('.message');

        $car.on('animationend', function() {
            // Delay showing the message to ensure the car animation completes
            setTimeout(() => {
                $message.addClass('show');
            }, 400); // Adjust this delay if necessary
        });
    });

})(jQuery);