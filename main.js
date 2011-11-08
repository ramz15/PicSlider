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
	"width": (window_width-(margin*2)),
	"height": (window_height-(margin*2)),
	"margin": (margin + "px")
	});
	
	$("#scroll_btn").click(function () {
		$('#canvas').animate({ 
		  left: -(window_width+(margin*2))
		});
	});
});





