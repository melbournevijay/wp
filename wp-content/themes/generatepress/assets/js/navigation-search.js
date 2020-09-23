( function() {
	'use strict';

    if ( 'querySelector' in document && 'addEventListener' in window ) {
		/**
		 * Navigation search.
		 *
		 * @param e The event.
		 * @param _this The clicked item.
		 */
		var toggleSearch = function( e, item ) {
			e.preventDefault();

			if ( ! item ) {
				var item = this;
			}

			var forms = document.querySelectorAll( '.navigation-search' ),
				toggles = document.querySelectorAll( '.search-item' ),
				focusableEls = document.querySelectorAll('a[href], area[href], input:not([disabled]):not(.navigation-search), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex="0"]'),
				nav = '';

			if ( item.closest( '.mobile-menu-control-wrapper' ) ) {
				nav = document.getElementById( 'site-navigation' );
			}

			for ( var i = 0; i < forms.length; i++ ) {
				if ( forms[i].classList.contains( 'nav-search-active' ) ) {
					forms[i].classList.remove( 'nav-search-active' );

					if ( nav ) {
						nav.classList.remove( 'has-active-search' );
					}

					for ( var t = 0; t < toggles.length; t++ ) {
						toggles[t].classList.remove( 'close-search' );
						toggles[t].classList.remove( 'active' );
						toggles[t].querySelector( 'a' ).setAttribute( 'aria-label', generatepressNavSearch.open );
						toggles[t].style.float = '';

						// Allow tabindex on items again.
						for ( var f = 0; f < focusableEls.length; f++ ) {
							if ( ! focusableEls[f].closest( '.navigation-search' ) && ! focusableEls[f].closest( '.search-item' ) ) {
								focusableEls[f].removeAttribute( 'tabindex' );
							}
						};
					}

					document.activeElement.blur();
				} else {
					var openedMobileMenu = forms[i].closest( '.toggled' );

					if ( openedMobileMenu ) {
						// Close the mobile menu.
						openedMobileMenu.querySelector( 'button.menu-toggle' ).click();
					}

					if ( nav ) {
						nav.classList.add( 'has-active-search' );
					}

					forms[i].classList.add( 'nav-search-active' );
					forms[i].querySelector( '.search-field' ).focus();

					for ( var t = 0; t < toggles.length; t++ ) {
						toggles[t].classList.add( 'active' );
						toggles[t].querySelector( 'a' ).setAttribute( 'aria-label', generatepressNavSearch.close );

						// Trap tabindex within the search element
						for ( var f = 0; f < focusableEls.length; f++ ) {
							if ( ! focusableEls[f].closest( '.navigation-search' ) && ! focusableEls[f].closest( '.search-item' ) ) {
								focusableEls[f].setAttribute( 'tabindex', '-1' );
							}
						};

						if ( ! document.body.classList.contains( 'nav-aligned-center' ) ) {
							toggles[t].classList.add( 'close-search' );
						} else {
							toggles[t].classList.add( 'close-search' );
							if ( document.body.classList.contains ( 'rtl' ) ) {
								toggles[t].style.float = 'left';
							} else {
								toggles[t].style.float = 'right';
							}
						}
					}
				}
			}
		}

		if ( document.body.classList.contains( 'nav-search-enabled' ) ) {
			var searchItems = document.querySelectorAll( '.search-item' );

			for ( var i = 0; i < searchItems.length; i++ ) {
				searchItems[i].addEventListener( 'click', toggleSearch, false );
			}

			// Close navigation search on escape key
			document.addEventListener( 'keydown', function( e ) {
				if ( document.querySelector( '.navigation-search.nav-search-active' ) ) {
					var key = e.which || e.keyCode;

					if ( key === 27 ) { // 27 is esc
						var activeSearchItems = document.querySelectorAll( '.search-item.active' );

						for ( var i = 0; i < activeSearchItems.length; i++ ) {
							toggleSearch( e, activeSearchItems[i] );
							break;
						}
					}
				}
			}, false );
		}
	}
})();