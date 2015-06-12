/*!
 * avgrund 0.1
 * http://lab.hakim.se/avgrund
 * MIT licensed
 *
 * Copyright (C) 2012 Hakim El Hattab, http://hakim.se
 */
function Avgrund (popup_selector) {
	var self = this,
		popup = document.querySelector(popup_selector),
		container = document.getElementsByTagName('body')[0],
		wrapper = {},
		currentState = false

	// Deactivate on ESC
	function onDocumentKeyUp( event ) {
		if( event.keyCode === 27 ) {
			deactivate()
		}
	}

	// Deactivate on click outside
	function onDocumentClick( event ) {
		var bubble = event.target
		while (bubble) {
			if (bubble === popup)
				return
			else
				bubble = bubble.parentNode
		}
		deactivate()
	}

	function activate() {
		addClass( popup, 'show-avgrund')

		setTimeout( function() {
			addClass( container, 'avgrund-container-animate')
				
			document.addEventListener( 'keyup', onDocumentKeyUp, false )
			container.addEventListener( 'click', onDocumentClick, false )
			container.addEventListener( 'touchstart', onDocumentClick, false )
		}, 0 )

		currentState = true
	}

	function deactivate() {
		document.removeEventListener( 'keyup', onDocumentKeyUp, false )
		container.removeEventListener( 'click', onDocumentClick, false )
		container.removeEventListener( 'touchstart', onDocumentClick, false )

		removeClass( popup, 'show-avgrund')
		removeClass( container, 'avgrund-container-animate')
		
		currentState = false
	}

	function disableBlur() {
		addClass( document.documentElement, 'no-blur' )
	}

	function addClass( element, name ) {
		element.className += ' ' + name
	}

	function removeClass( element, name ) {
		element.className = element.className.replace( ' ' + name, '' )
	}

	function show(){
		wrapper = document.createElement('div')
		for (var i = -1, len = container.childNodes.length; ++i < len;) {
			var child = container.childNodes[i]
			if(child && child.tagName !== 'SCRIPT' && child.tagName !== 'STYLE' && child !== popup) {
				wrapper.appendChild(child) && --i && --len
			}
		}
		container.appendChild(wrapper)
		container.appendChild(popup)
		activate()
		return self
	}
	self.show = show
	function hide() {
		for (var i = -1, len = wrapper.childNodes.length; ++i < len;) {
			container.appendChild(wrapper.childNodes[i]) && --i && --len
		}
		container.removeChild(wrapper)
		deactivate()
	}
	self.hide = hide

	return self
}