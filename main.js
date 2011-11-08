$(document).ready(function() {

	var pic_array = ["1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.JPG"];

	for(pic in pic_array) {
	$("#canvas").append("<img src=\"images/" + pic_array[pic] + "\">");
	}

	var window_width = $(window).width();
	var window_height = $(window).height();
	
	var margin = 5;
	
	var rows = 3;
	var columns = 2;
	
	var canvas_width = (columns * window_width) + (columns*2*margin);
	var canvas_height = (rows * window_height) + (rows*2*margin);

	$("#canvas").css({
	"width": canvas_width,
	"height": canvas_height
	});

	$("#canvas").children().css({
	"width": window_width,
	"height": window_height,
	"margin": (margin + "px")
	});
	
	var lr_mov = window_width+(margin*2);
	var ud_mov = window_height+(margin*2); 
	
	
	
function move(dir, speed){
	var $old_top = parseInt($('#canvas').css('top'));
	var $old_left = parseInt($('#canvas').css('left'));
	
	if(dir === 'down') {		
		$('#canvas').animate({ 
			top: ($old_top - ud_mov) + 'px'
		}, speed);
	}

	else if(dir === 'up') {
		$('#canvas').animate({ 
			top: ($old_top + ud_mov) + 'px'
		}, speed);
	}

	else if(dir === 'right') {
		$('#canvas').animate({ 
			left: ($old_left - lr_mov) + 'px'
		}, speed);
	}

	else if(dir === 'left') {
		$('#canvas').animate({ 
			left: ($old_left + lr_mov) + 'px'
		}, speed);
	}
}
	
	
	$("#right_btn").click(function () {
		move('right', 1000);
	});

	$("#left_btn").click(function () {
		move('left', 1000);
	});
	
	$("#down_btn").click(function () {
		move('down', 1000);
	});
	
	$("#up_btn").click(function () {
		move('up', 1000);	
	});


});

