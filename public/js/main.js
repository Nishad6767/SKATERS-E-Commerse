
(function ($) {
    "use strict";

    /*[ Load page ]
    ===========================================================*/
    $(".animsition").animsition({
        inClass: 'fade-in',
        outClass: 'fade-out',
        inDuration: 1500,
        outDuration: 800,
        linkElement: '.animsition-link',
        loading: true,
        loadingParentElement: 'html',
        loadingClass: 'animsition-loading-1',
        loadingInner: '<div class="loader05"></div>',
        timeout: false,
        timeoutCountdown: 5000,
        onLoadEvent: true,
        browser: [ 'animation-duration', '-webkit-animation-duration'],
        overlay : false,
        overlayClass : 'animsition-overlay-slide',
        overlayParentElement : 'html',
        transition: function(url){ window.location.href = url; }
    });
    
    /*[ Back to top ]
    ===========================================================*/
    var windowH = $(window).height()/2;

    $(window).on('scroll',function(){
        if ($(this).scrollTop() > windowH) {
            $("#myBtn").css('display','flex');
        } else {
            $("#myBtn").css('display','none');
        }
    });

    $('#myBtn').on("click", function(){
        $('html, body').animate({scrollTop: 0}, 300);
    });


    /*==================================================================
    [ Fixed Header ]*/
    var headerDesktop = $('.container-menu-desktop');
    var wrapMenu = $('.wrap-menu-desktop');

    if($('.top-bar').length > 0) {
        var posWrapHeader = $('.top-bar').height();
    }
    else {
        var posWrapHeader = 0;
    }
    

    if($(window).scrollTop() > posWrapHeader) {
        $(headerDesktop).addClass('fix-menu-desktop');
        $(wrapMenu).css('top',0); 
    }  
    else {
        $(headerDesktop).removeClass('fix-menu-desktop');
        $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
    }

    $(window).on('scroll',function(){
        if($(this).scrollTop() > posWrapHeader) {
            $(headerDesktop).addClass('fix-menu-desktop');
            $(wrapMenu).css('top',0); 
        }  
        else {
            $(headerDesktop).removeClass('fix-menu-desktop');
            $(wrapMenu).css('top',posWrapHeader - $(this).scrollTop()); 
        } 
    });


    /*==================================================================
    [ Menu mobile ]*/
    $('.btn-show-menu-mobile').on('click', function(){
        $(this).toggleClass('is-active');
        $('.menu-mobile').slideToggle();
    });

    var arrowMainMenu = $('.arrow-main-menu-m');

    for(var i=0; i<arrowMainMenu.length; i++){
        $(arrowMainMenu[i]).on('click', function(){
            $(this).parent().find('.sub-menu-m').slideToggle();
            $(this).toggleClass('turn-arrow-main-menu-m');
        })
    }

    $(window).resize(function(){
        if($(window).width() >= 992){
            if($('.menu-mobile').css('display') == 'block') {
                $('.menu-mobile').css('display','none');
                $('.btn-show-menu-mobile').toggleClass('is-active');
            }

            $('.sub-menu-m').each(function(){
                if($(this).css('display') == 'block') { console.log('hello');
                    $(this).css('display','none');
                    $(arrowMainMenu).removeClass('turn-arrow-main-menu-m');
                }
            });
                
        }
    });


    /*==================================================================
    [ Show / hide modal search ]*/
    $('.js-show-modal-search').on('click', function(){
        $('.modal-search-header').addClass('show-modal-search');
        $(this).css('opacity','0');
    });

    $('.js-hide-modal-search').on('click', function(){
        $('.modal-search-header').removeClass('show-modal-search');
        $('.js-show-modal-search').css('opacity','1');
    });

    $('.container-search-header').on('click', function(e){
        e.stopPropagation();
    });


    /*==================================================================
    [ Isotope ]*/
    var $topeContainer = $('.isotope-grid');
    var $filter = $('.filter-tope-group');

    // filter items on button click
    $filter.each(function () {
        $filter.on('click', 'button', function () {
            var filterValue = $(this).attr('data-filter');
            $topeContainer.isotope({filter: filterValue});
        });
        
    });

    // init Isotope
    $(window).on('load', function () {
        var $grid = $topeContainer.each(function () {
            $(this).isotope({
                itemSelector: '.isotope-item',
                layoutMode: 'fitRows',
                percentPosition: true,
                animationEngine : 'best-available',
                masonry: {
                    columnWidth: '.isotope-item'
                }
            });
        });
    });

    var isotopeButton = $('.filter-tope-group button');

    $(isotopeButton).each(function(){
        $(this).on('click', function(){
            for(var i=0; i<isotopeButton.length; i++) {
                $(isotopeButton[i]).removeClass('how-active1');
            }

            $(this).addClass('how-active1');
        });
    });

    /*==================================================================
    [ Filter / Search product ]*/
    $('.js-show-filter').on('click',function(){
        $(this).toggleClass('show-filter');
        $('.panel-filter').slideToggle(400);

        if($('.js-show-search').hasClass('show-search')) {
            $('.js-show-search').removeClass('show-search');
            $('.panel-search').slideUp(400);
        }    
    });

    $('.js-show-search').on('click',function(){
        $(this).toggleClass('show-search');
        $('.panel-search').slideToggle(400);

        if($('.js-show-filter').hasClass('show-filter')) {
            $('.js-show-filter').removeClass('show-filter');
            $('.panel-filter').slideUp(400);
        }    
    });




    /*==================================================================
    [ Cart ]*/
    $('.js-show-cart').on('click',function(){
        $('.js-panel-cart').addClass('show-header-cart');
    });

    $('.js-hide-cart').on('click',function(){
        $('.js-panel-cart').removeClass('show-header-cart');
    });

    /*==================================================================
    [ Cart ]*/
    $('.js-show-sidebar').on('click',function(){
        $('.js-sidebar').addClass('show-sidebar');
    });

    $('.js-hide-sidebar').on('click',function(){
        $('.js-sidebar').removeClass('show-sidebar');
    });

    /*==================================================================
    [ +/- num product ]*/
    $('.btn-num-product-down').on('click', function(){
        var numProduct = Number($(this).next().val());
        if(numProduct > 0) $(this).next().val(numProduct - 1);
    });

    $('.btn-num-product-up').on('click', function(){
        var numProduct = Number($(this).prev().val());
        $(this).prev().val(numProduct + 1);
    });

    /*==================================================================
    [ Rating ]*/
    $('.wrap-rating').each(function(){
        var item = $(this).find('.item-rating');
        var rated = -1;
        var input = $(this).find('input');
        $(input).val(0);

        $(item).on('mouseenter', function(){
            var index = item.index(this);
            var i = 0;
            for(i=0; i<=index; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });

        $(item).on('click', function(){
            var index = item.index(this);
            rated = index;
            $(input).val(index+1);
        });

        $(this).on('mouseleave', function(){
            var i = 0;
            for(i=0; i<=rated; i++) {
                $(item[i]).removeClass('zmdi-star-outline');
                $(item[i]).addClass('zmdi-star');
            }

            for(var j=i; j<item.length; j++) {
                $(item[j]).addClass('zmdi-star-outline');
                $(item[j]).removeClass('zmdi-star');
            }
        });
    });
    
    /*==================================================================
    [ Show modal1 ]*/
    $('.js-show-modal1').on('click',function(e){
        e.preventDefault();
        $('.js-modal1').addClass('show-modal1');
    });

    $('.js-hide-modal1').on('click',function(){
        $('.js-modal1').removeClass('show-modal1');
    });



})(jQuery);






/*!
 * jQuery Magnify Plugin v2.3.3 by T. H. Doan (https://thdoan.github.io/magnify/)
 * Based on http://thecodeplayer.com/walkthrough/magnifying-glass-for-images-using-jquery-and-css3
 *
 * jQuery Magnify by T. H. Doan is licensed under the MIT License.
 * Read a copy of the license in the LICENSE file or at https://choosealicense.com/licenses/mit/
 */

(function($) {
    $.fn.magnify = function(oOptions) {
      // Default options
      oOptions = $.extend({
        'src': '',
        'speed': 100,
        'timeout': -1,
        'touchBottomOffset': 0,
        'finalWidth': null,
        'finalHeight': null,
        'magnifiedWidth': null,
        'magnifiedHeight': null,
        'limitBounds': false,
        'mobileCloseEvent': 'touchstart',
        'afterLoad': function(){}
      }, oOptions);
  
      var $that = this, // Preserve scope
        $html = $('html'),
  
        // Initiate
        init = function(el) {
          var $image = $(el),
            $anchor = $image.closest('a'),
            oDataAttr = {};
  
          // Get data attributes
          for (var i in oOptions) {
            oDataAttr[i] = $image.attr('data-magnify-' + i.toLowerCase());
          }
  
          // Disable zooming if no valid large image source
          var sZoomSrc = oDataAttr['src'] || oOptions['src'] || $anchor.attr('href') || '';
          if (!sZoomSrc) return;
  
          var $container,
            $lens,
            nImageWidth,
            nImageHeight,
            nMagnifiedWidth,
            nMagnifiedHeight,
            nLensWidth,
            nLensHeight,
            nBoundX = 0,
            nBoundY = 0,
            nPosX, nPosY,     // Absolute cursor position
            nX, nY,           // Relative cursor position
            oContainerOffset, // Relative to document
            oImageOffset,     // Relative to container
            // Get true offsets
            getOffset = function() {
              var o = $container.offset();
              // Store offsets from container border to image inside
              // NOTE: .offset() does NOT take into consideration image border and padding.
              oImageOffset = {
                'top': ($image.offset().top-o.top) + parseInt($image.css('border-top-width')) + parseInt($image.css('padding-top')),
                'left': ($image.offset().left-o.left) + parseInt($image.css('border-left-width')) + parseInt($image.css('padding-left'))
              };
              o.top += oImageOffset['top'];
              o.left += oImageOffset['left'];
              return o;
            },
            // Hide the lens
            hideLens = function() {
              if ($lens.is(':visible')) $lens.fadeOut(oOptions['speed'], function() {
                $html.removeClass('magnifying').trigger('magnifyend'); // Reset overflow-x
              });
            },
            moveLens = function(e) {
              // Reinitialize if image initially hidden
              if (!nImageHeight) {
                refresh();
                return;
              }
              if (e) {
                e.preventDefault();
                // Save last coordinates in case we need to call this function directly (required when
                // updating magnifiedWidth/magnifiedHeight while the lens is visible).
                nPosX = e.pageX || e.originalEvent.touches[0].pageX;
                nPosY = e.pageY || e.originalEvent.touches[0].pageY;
                $image.data('lastPos', {
                  'x': nPosX,
                  'y': nPosY
                });
              } else {
                nPosX = $image.data('lastPos').x;
                nPosY = $image.data('lastPos').y;
              }
              // x/y coordinates of the mouse pointer or touch point. This is the position of
              // .magnify relative to the document.
              //
              // We deduct the positions of .magnify from the mouse or touch positions relative to
              // the document to get the mouse or touch positions relative to the container.
              nX = nPosX - oContainerOffset['left'],
              nY = (nPosY - oContainerOffset['top']) - oOptions['touchBottomOffset'];
              // Toggle magnifying lens
              if (!$lens.is(':animated')) {
                if (nX>nBoundX && nX<nImageWidth-nBoundX && nY>nBoundY && nY<nImageHeight-nBoundY) {
                  if ($lens.is(':hidden')) {
                    $html.addClass('magnifying').trigger('magnifystart'); // Hide overflow-x while zooming
                    $lens.fadeIn(oOptions['speed']);
                  }
                } else {
                  hideLens();
                }
              }
              if ($lens.is(':visible')) {
                // Move the magnifying lens with the mouse
                var sBgPos = '';
                if (nMagnifiedWidth && nMagnifiedHeight) {
                  // Change the background position of .magnify-lens according to the position of
                  // the mouse over the .magnify-image image. This allows us to get the ratio of
                  // the pixel under the mouse pointer with respect to the image and use that to
                  // position the large image inside the magnifying lens.
                  var nRatioX = -Math.round(nX/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                    nRatioY = -Math.round(nY/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                  if (oOptions['limitBounds']) {
                    // Enforce bounds to ensure only image is visible in lens
                    var nBoundRight = -Math.round((nImageWidth-nBoundX)/nImageWidth*nMagnifiedWidth-nLensWidth/2),
                      nBoundBottom = -Math.round((nImageHeight-nBoundY)/nImageHeight*nMagnifiedHeight-nLensHeight/2);
                    // Left and right edges
                    if (nRatioX>0) nRatioX = 0;
                    else if (nRatioX<nBoundRight) nRatioX = nBoundRight;
                    // Top and bottom edges
                    if (nRatioY>0) nRatioY = 0;
                    else if (nRatioY<nBoundBottom) nRatioY = nBoundBottom;
                  }
                  sBgPos = nRatioX + 'px ' + nRatioY + 'px';
                }
                // Now the lens moves with the mouse. The logic is to deduct half of the lens's
                // width and height from the mouse coordinates to place it with its center at the
                // mouse coordinates. If you hover on the image now, you should see the magnifying
                // lens in action.
                $lens.css({
                  'top': Math.round(nY-nLensHeight/2) + oImageOffset['top'] + 'px',
                  'left': Math.round(nX-nLensWidth/2) + oImageOffset['left'] + 'px',
                  'background-position': sBgPos
                });
              }
            };
  
          // Data attributes have precedence over options object
          if (!isNaN(+oDataAttr['speed'])) oOptions['speed'] = +oDataAttr['speed'];
          if (!isNaN(+oDataAttr['timeout'])) oOptions['timeout'] = +oDataAttr['timeout'];
          if (!isNaN(+oDataAttr['finalWidth'])) oOptions['finalWidth'] = +oDataAttr['finalWidth'];
          if (!isNaN(+oDataAttr['finalHeight'])) oOptions['finalHeight'] = +oDataAttr['finalHeight'];
          if (!isNaN(+oDataAttr['magnifiedWidth'])) oOptions['magnifiedWidth'] = +oDataAttr['magnifiedWidth'];
          if (!isNaN(+oDataAttr['magnifiedHeight'])) oOptions['magnifiedHeight'] = +oDataAttr['magnifiedHeight'];
          if (oDataAttr['limitBounds']==='true') oOptions['limitBounds'] = true;
          if (typeof window[oDataAttr['afterLoad']]==='function') oOptions.afterLoad = window[oDataAttr['afterLoad']];
  
          // Implement touch point bottom offset only on mobile devices
          if (/\b(Android|BlackBerry|IEMobile|iPad|iPhone|Mobile|Opera Mini)\b/.test(navigator.userAgent)) {
            if (!isNaN(+oDataAttr['touchBottomOffset'])) oOptions['touchBottomOffset'] = +oDataAttr['touchBottomOffset'];
          } else {
            oOptions['touchBottomOffset'] = 0;
          }
  
          // Save any inline styles for resetting
          $image.data('originalStyle', $image.attr('style'));
  
          // Activate magnification:
          // 1. Try to get large image dimensions
          // 2. Proceed only if able to get large image dimensions OK
  
          // [1] Calculate the native (magnified) image dimensions. The zoomed version is only shown
          // after the native dimensions are available. To get the actual dimensions we have to create
          // this image object.
          var elZoomImage = new Image();
          $(elZoomImage).on({
            'load': function() {
              // [2] Got image dimensions OK.
  
              // Fix overlap bug at the edges during magnification
              $image.css('display', 'block');
              // Create container div if necessary
              if (!$image.parent('.magnify').length) {
                $image.wrap('<div class="magnify"></div>');
              }
              $container = $image.parent('.magnify');
              // Create the magnifying lens div if necessary
              if ($image.prev('.magnify-lens').length) {
                $container.children('.magnify-lens').css('background-image', 'url(\'' + sZoomSrc + '\')');
              } else {
                $image.before('<div class="magnify-lens loading" style="background:url(\'' + sZoomSrc + '\') 0 0 no-repeat"></div>');
              }
              $lens = $container.children('.magnify-lens');
              // Remove the "Loading..." text
              $lens.removeClass('loading');
              // Cache dimensions and offsets for improved performance
              // NOTE: This code is inside the load() function, which is important. The width and
              // height of the object would return 0 if accessed before the image is fully loaded.
              nImageWidth = oOptions['finalWidth'] || $image.width();
              nImageHeight = oOptions['finalHeight'] || $image.height();
              nMagnifiedWidth = oOptions['magnifiedWidth'] || elZoomImage.width;
              nMagnifiedHeight = oOptions['magnifiedHeight'] || elZoomImage.height;
              nLensWidth = $lens.width();
              nLensHeight = $lens.height();
              oContainerOffset = getOffset(); // Required by refresh()
              // Set zoom boundaries
              if (oOptions['limitBounds']) {
                nBoundX = (nLensWidth/2) / (nMagnifiedWidth/nImageWidth);
                nBoundY = (nLensHeight/2) / (nMagnifiedHeight/nImageHeight);
              }
              // Enforce non-native large image size?
              if (nMagnifiedWidth!==elZoomImage.width || nMagnifiedHeight!==elZoomImage.height) {
                $lens.css('background-size', nMagnifiedWidth + 'px ' + nMagnifiedHeight + 'px');
              }
              // Store zoom dimensions for mobile plugin
              $image.data('zoomSize', {
                'width': nMagnifiedWidth,
                'height': nMagnifiedHeight
              });
              // Store mobile close event for mobile plugin
              $container.data('mobileCloseEvent', oDataAttr['mobileCloseEvent'] || oOptions['mobileCloseEvent']);
              // Clean up
              elZoomImage = null;
              // Execute callback
              oOptions.afterLoad();
              // Simulate a lens move to update positioning if magnifiedWidth/magnifiedHeight is
              // updated while the lens is visible
              if ($lens.is(':visible')) moveLens();
              // Handle mouse movements
              $container.off().on({
                'mousemove touchmove': moveLens,
                'mouseenter': function() {
                  // Need to update offsets here to support accordions
                  oContainerOffset = getOffset();
                },
                'mouseleave': hideLens
              });
  
              // Prevent magnifying lens from getting "stuck"
              if (oOptions['timeout']>=0) {
                $container.on('touchend', function() {
                  setTimeout(hideLens, oOptions['timeout']);
                });
              }
              // Ensure lens is closed when tapping outside of it
              $('body').not($container).on('touchstart', hideLens);
  
              // Support image map click-throughs while zooming
              var sUsemap = $image.attr('usemap');
              if (sUsemap) {
                var $map = $('map[name=' + sUsemap.slice(1) + ']');
                // Image map needs to be on the same DOM level as image source
                $image.after($map);
                $container.click(function(e) {
                  // Trigger click on image below lens at current cursor position
                  if (e.clientX || e.clientY) {
                    $lens.hide();
                    var elPoint = document.elementFromPoint(
                        e.clientX || e.originalEvent.touches[0].clientX,
                        e.clientY || e.originalEvent.touches[0].clientY
                      );
                    if (elPoint.nodeName==='AREA') {
                      elPoint.click();
                    } else {
                      // Workaround for buggy implementation of elementFromPoint()
                      // See https://bugzilla.mozilla.org/show_bug.cgi?id=1227469
                      $('area', $map).each(function() {
                        var a = $(this).attr('coords').split(',');
                        if (nX>=a[0] && nX<=a[2] && nY>=a[1] && nY<=a[3]) {
                          this.click();
                          return false;
                        }
                      });
                    }
                  }
                });
              }
  
              if ($anchor.length) {
                // Make parent anchor inline-block to have correct dimensions
                $anchor.css('display', 'inline-block');
                // Disable parent anchor if it's sourcing the large image
                if ($anchor.attr('href') && !(oDataAttr['src'] || oOptions['src'])) {
                  $anchor.click(function(e) {
                    e.preventDefault();
                  });
                }
              }
  
            },
            'error': function() {
              // Clean up
              elZoomImage = null;
            }
          });
  
          elZoomImage.src = sZoomSrc;
        }, // END init()
  
        // Simple debounce
        nTimer = 0,
        refresh = function() {
          clearTimeout(nTimer);
          nTimer = setTimeout(function() {
            $that.destroy();
            $that.magnify(oOptions);
          }, 100);
        };
  
      /**
       * Public Methods
       */
  
      // Turn off zoom and reset to original state
      this.destroy = function() {
        this.each(function() {
          var $this = $(this),
            $lens = $this.prev('div.magnify-lens'),
            sStyle = $this.data('originalStyle');
          if ($this.parent('div.magnify').length && $lens.length) {
            if (sStyle) $this.attr('style', sStyle);
            else $this.removeAttr('style');
            $this.unwrap();
            $lens.remove();
          }
        });
        // Unregister event handler
        $(window).off('resize', refresh);
        return $that;
      }
  
      // Handle window resizing
      $(window).resize(refresh);
  
      return this.each(function() {
        // Initiate magnification powers
        init(this);
      });
  
    };
  }(jQuery));