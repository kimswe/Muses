(function(){

	var ESC_KEY = 27;
	var RETURN_KEY = 13;

	var add_btn = document.querySelector('.addNew');
	var overlay = $('.new_overlay');
	var noteInput = document.querySelector('.new_note');

	add_btn.addEventListener('click', function(event) {
		overlay.addClass('open');
		$('.new_overlay .new_note').focus();
		$('.addNew').animate({"transform" : "rotate(45deg)"}, 700, 'easeOutElastic');
	});

	noteInput.addEventListener('keydown', function(event) {
		if(event.which === ESC_KEY) {
			noteInput.value = "";
			overlay.removeClass('open');
		}else if(event.which === RETURN_KEY) {
			event.preventDefault();
			if(noteInput.value === ""){
				noteInput.placeholder = "Type a note or hit esc. to exit";
			}else{
				overlay.removeClass('open');
				chrome.extension.getBackgroundPage().saveNote(noteInput.value);
				add_btn.src = "images/check_icon.png";
				$('.addNew').addClass('animated wobble');
				setTimeout(function(){
					add_btn.src = "images/add_new_icon.png";
					$('.addNew').removeClass('animated wobble');
				}, 3000);
				noteInput.value = "";
			}
		}
	});
})();