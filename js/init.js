/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

 jQuery(document).ready(function($) {

/*----------------------------------------------------*/
/* FitText Settings
------------------------------------------------------ */

    setTimeout(function() {
	   $('h1.responsive-headline').fitText(1, { minFontSize: '40px', maxFontSize: '70px' });
	 }, 100);


/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");

	sections.waypoint({

      handler: function(event, direction) {

		   var active_section;

			active_section = $(this);
			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#nav-wrap a[href="#' + active_section.attr("id") + '"]');

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		},
		offset: '35%'

	});


/*----------------------------------------------------*/
/*	Make sure that #header-background-image height is
/* equal to the browser height.
------------------------------------------------------ */

   $('header').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('header').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })
   });


/*----------------------------------------------------*/
/*	Fade In/Out Primary Navigation
------------------------------------------------------*/

   $(window).on('scroll', function() {

		var h = $('header').height();
		var y = $(window).scrollTop();
      var nav = $('#nav-wrap');

	   if ( (y > h*.20) && (y < h) && ($(window).outerWidth() > 768 ) ) {
	      nav.fadeOut('fast');
	   }
      else {
         if (y < h*.20) {
            nav.removeClass('opaque').fadeIn('fast');
         }
         else {
            nav.addClass('opaque').fadeIn('fast');
         }
      }

	});


/*----------------------------------------------------*/
/*	Modal Popup
------------------------------------------------------*/

    $('.item-wrap a').magnificPopup({

       type:'inline',
       fixedContentPos: false,
       removalDelay: 200,
       showCloseBtn: false,
       mainClass: 'mfp-fade'

    });

    $(document).on('click', '.popup-modal-dismiss', function (e) {
    		e.preventDefault();
    		$.magnificPopup.close();
    });


/*----------------------------------------------------*/
/*	Flexslider
/*----------------------------------------------------*/
   $('.flexslider').flexslider({
      namespace: "flex-",
      controlsContainer: ".flex-container",
      animation: 'slide',
      controlNav: true,
      directionNav: false,
      smoothHeight: true,
      slideshowSpeed: 7000,
      animationSpeed: 600,
      randomize: false,
   });
   
/*----------------------------------------------------*/
/*	Diplomas
/*----------------------------------------------------*/
    'use strict';
    var multiItemSlider = (function () {
      return function (selector, config) {
        var
          _mainElement = document.querySelector(selector), // основный элемент блока
          _sliderWrapper = _mainElement.querySelector('.img_block'), // обертка для .slider-item
          _sliderItems = _mainElement.querySelectorAll('.img_block_item'), // элементы (.slider-item)
          _sliderControls = _mainElement.querySelectorAll('.slider__control'), // элементы управления
          _sliderControlLeft = _mainElement.querySelector('.slider__control_left'), // кнопка "LEFT"
          _sliderControlRight = _mainElement.querySelector('.slider__control_right'), // кнопка "RIGHT"
          _wrapperWidth = parseFloat(getComputedStyle(_sliderWrapper).width), // ширина обёртки
          _itemWidth = parseFloat(getComputedStyle(_sliderItems[0]).width), // ширина одного элемента    
          _positionLeftItem = 0, // позиция левого активного элемента
          _transform = 0, // значение транфсофрмации .slider_wrapper
          _step = _itemWidth / _wrapperWidth * 100, // величина шага (для трансформации)
          _items = []; // массив элементов
        // наполнение массива _items
        _sliderItems.forEach(function (item, index) {
          _items.push({ item: item, position: index, transform: 0 });
        });

        var position = {
          getMin: 0,
          getMax: _items.length - 1,
        }

        var _transformItem = function (direction) {
          if (direction === 'right') {
            if ((_positionLeftItem + _wrapperWidth / _itemWidth - 1) >= position.getMax) {
              return;
            }
            if (!_sliderControlLeft.classList.contains('slider__control_show')) {
              _sliderControlLeft.classList.add('slider__control_show');
            }
            if (_sliderControlRight.classList.contains('slider__control_show') && (_positionLeftItem + _wrapperWidth / _itemWidth) >= position.getMax) {
              _sliderControlRight.classList.remove('slider__control_show');
            }
            _positionLeftItem++;
            _transform -= _step;
          }
          if (direction === 'left') {
            if (_positionLeftItem <= position.getMin) {
              return;
            }
            if (!_sliderControlRight.classList.contains('slider__control_show')) {
              _sliderControlRight.classList.add('slider__control_show');
            }
            if (_sliderControlLeft.classList.contains('slider__control_show') && _positionLeftItem - 1 <= position.getMin) {
              _sliderControlLeft.classList.remove('slider__control_show');
            }
            _positionLeftItem--;
            _transform += _step;
          }
          _sliderWrapper.style.transform = 'translateX(' + _transform + '%)';
        }

        // обработчик события click для кнопок "назад" и "вперед"
        var _controlClick = function () {
          var direction = this.classList.contains('slider__control_right') ? 'right' : 'left';
          _transformItem(direction);
        };

        var _setUpListeners = function () {
          // добавление к кнопкам "назад" и "вперед" обрботчика _controlClick для событя click
          _sliderControls.forEach(function (item) {
            item.addEventListener('click', _controlClick);
          });
        }

        // инициализация
        _setUpListeners();

        return {
          right: function () { // метод right
            _transformItem('right');
          },
          left: function () { // метод left
            _transformItem('left');
          }
        }

      }
    }());

    var slider = multiItemSlider('.slider')

/*----------------------------------------------------*/
/*	contact form
------------------------------------------------------*/

   $('form#contactForm button.submit').click(function() {

      $('#image-loader').fadeIn();

      var contactName = $('#contactForm #contactName').val();
      var contactEmail = $('#contactForm #contactEmail').val();
      var contactSubject = $('#contactForm #contactSubject').val();
      var contactMessage = $('#contactForm #contactMessage').val();

      var data = 'contactName=' + contactName + '&contactEmail=' + contactEmail +
               '&contactSubject=' + contactSubject + '&contactMessage=' + contactMessage;

      $.ajax({

	      type: "POST",
	      url: "inc/sendEmail.php",
	      data: data,
	      success: function(msg) {

            // Message was sent
            if (msg == 'OK') {
               $('#image-loader').fadeOut();
               $('#message-warning').hide();
               $('#contactForm').fadeOut();
               $('#message-success').fadeIn();   
            }
            // There was an error
            else {
               $('#image-loader').fadeOut();
               $('#message-warning').html(msg);
	            $('#message-warning').fadeIn();
            }

	      }

      });
      return false;
   });


});








