$(document).ready(function() {
	
	//plug in pics into DOM
	var pic_array = ["1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.JPG"];
	var thumb_array = ["1_thumb.JPG", "2_thumb.JPG", "3_thumb.JPG", "4_thumb.JPG", "5_thumb.JPG", "6_thumb.JPG"];
	
	for(pic in pic_array) {
	$("#canvas").append("<img src=\"images/" + thumb_array[pic] + "\">");
	}
	
	//create buttons in appropriate positions
	var rows = 3;
	var cols = 2;
	var count = 0; 
	
	for(i=0; i<rows; i++){
		for(j=0; j<cols; j++){
			$('#thumbs').append("<a href=\"#\"><img class=\"row-" + i + " col-" + j + "\" src=\"images/" + thumb_array[count] + "\" /></a>").hide();
			count += 1
		}
	}

	var button_width = 40;
	var button_height = 30;
	var button_container_width = button_width*cols;
	var button_container_height = button_height*rows;
	
	$('#thumbs').children().children().css({
		'width': button_width,
		'height': button_height,
		'display': 'inline-block',
		'float': 'left'
	});

	$('#thumbs').css({
		'width': button_container_width,
		'height': button_container_height
	}).show();
	
	//set width and movement variables
	var pic_width = $(window).width()/4;
	var pic_height = $(window).height()/4;
	
	var margin = 5;
	
	var canvas_width = (cols * pic_width) + (cols*2*margin);
	var canvas_height = (rows * pic_height) + (rows*2*margin);

	$("#canvas").css({
	"width": canvas_width,
	"height": canvas_height
	});

	$("#canvas").children().css({
	"width": pic_width,
	"height": pic_height,
	"margin": (margin + "px")
	});
	
	var lr_mov = pic_width+(margin*2);
	var ud_mov = pic_height+(margin*2); 

//generic move function
function move(end_row, end_col, speed){
	var $new_top = end_row*pic_height;
	var $new_left = end_col*pic_width;
	
	$('#canvas').animate({ 
		top: -($new_top)
	}, speed);

	$('#canvas').animate({ 
		left: -($new_left)
	}, speed);
}
	
	$("#thumbs").children().click(function () {
		var class_name = $(this).children().attr('class');
		row_num = class_name.charAt(4);
		col_num = class_name.charAt(10);
		move(row_num, col_num, 600);
	});

	$("#thumbs").children().children().hover(
		function(){
			$(this).css('opacity', 1.0)
		}, 
		function(){
			$(this).css('opacity', 0.4)
		});
});

