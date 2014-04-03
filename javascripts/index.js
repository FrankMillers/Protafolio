jQuery(function ($) {
	rotator({
		selector: '.screenshots',
		selector_nav: '.links',
		delay: 4,
		duration: .5
	});
});

function rotator(opts) {
	var $container = $(opts.selector),
		$nav = $(opts.selector_nav),
		$shots = $container.find('.shot'), 
		$current,
		$prev,
		timeout,
		just_clicked_timeout,
		just_clicked = false;


	// checar parametros
	if(!opts.duration) opts.duration = .5;
	if(!opts.delay) opts.delay = 2;
	opts.duration = opts.duration * 1000;
	opts.delay =  opts.delay * 1000;

	$nav.find('a').click(function () {
		var $self = $(this);

		do_just_clicked();

		set_current($shots.filter('[href="'+$self.attr('href')+'"]'));

		return false;
	});

	// cambiar a la primera imagen
	$shots.hide()
	
	reset();

	// retrasar el tiemout cuando se haya echo click
	function do_just_clicked() {
		if(just_clicked_timeout) clearTimeout(just_clicked_timeout);

		just_clicked = true;

		just_clicked_timeout = setTimeout(function () {
			just_clicked = false;
			just_clicked_timeout = null;
		}, opts.delay/2);
	}

	// loop principal de rotacion
	function reset() {
		+function () {
			// cambiar a la siguiente imagen
			if(!just_clicked) {
				var $new;
				if(!$current) $new  = $shots.first('.shot');
				else 
					$new = $current.next('.shot');
					if($new.size() == 0) $new = $shots.first('.shot');
				
				set_current($new);
			}

			timeout = setTimeout(arguments.callee, opts.delay);
		}();
	}

	/*
		Cambiar a una imagen nueva 
		@$new la nueva imagen que se quiere mostrar
	*/
	function set_current($new) {
		// swap de las  imagenes
		$prev = $current;
		$current = $new;

		// hacer el efecto de transicion
		do_effect();
	}

	/*
		Hacer la transicion 
	*/
	function do_effect() {
		// al principio $prev estara vacio
		if($prev) $prev.fadeOut(opts.duration);

		$nav.find('.actual').removeClass('actual');
		$nav.find('[href="'+$current.attr('href')+'"]').parent().addClass('actual');
		// mostrar la imagen actual
		$current.fadeIn(opts.duration);
	}
}