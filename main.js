$(document).ready(function() {
	
	//plug in pics into DOM
	var pic_array = ["1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.JPG", "7.JPG", "8.JPG", "9.JPG"];
	var thumb_array = ["1_thumb.JPG", "2_thumb.JPG", "3_thumb.JPG", "4_thumb.JPG", "5_thumb.JPG", "6_thumb.JPG", "7_thumb.JPG", "8_thumb.JPG", "9_thumb.JPG"];
	var blur_array = ["1_blur.JPG", "2_blur.JPG", "3_blur.JPG", "4_blur.JPG", "5_blur.JPG", "6_blur.JPG", "7_blur.JPG", "8_blur.JPG", "9_blur.JPG"];
	
	// var pic_array = []

	
	//plug blurry pics into canvas
	for(pic in pic_array) {
		if(pic == 0) 
			$("#canvas").append("<img id=\"" + pic + "\" src=\"images/" + pic_array[pic] + "\">");
		else 
			$("#canvas").append("<img id=\"" + pic + "\" src=\"images/" + blur_array[pic] + "\">");
	}
	
	var test_array = [];
	
	var pics = $('#canvas').children('img');
	
	for(var i = 0; i < pics.length; i++) {
		test_array.push(($(pics[i]).attr('src')));
	}
	
	console.log(test_array);
	
	//create buttons in appropriate positions
	var rows = 3;
	var cols = 3;
	var count = 0; 
	
	//put thumbnails in thumbnail container
	for(i=0; i<rows; i++){
		for(j=0; j<cols; j++){
			$('#thumbs').append("<a href=\"#\"><img class=\"row-" + i + " col-" + j + "\"  src=\"images/" + thumb_array[count] + "\" /></a>").hide();
			count += 1
		}
	}
	
	//set thumb
	var thumb_width = 40;
	var thumb_height = 30;
	var button_container_width = thumb_width*cols;
	var button_container_height = thumb_height*rows;
	
	$('#thumbs').children().children().css({
		'width': thumb_width,
		'height': thumb_height,
		'display': 'inline-block',
		'float': 'left'
	});

	$('#thumbs').css({
		'width': button_container_width,
		'height': button_container_height
	}).show();
	
	//set pic width and height, and set movement variables
	var pic_width = $(window).width()-50;
	var pic_height = $(window).height()-50;
	
	var margin = 25;
	
	var canvas_width = (cols * pic_width) + (cols*2*margin);
	var canvas_height = (rows * pic_height) + (rows*2*margin);

	$("#canvas").css({
	"width": canvas_width,
	"height": canvas_height
	});

	$("#canvas").children().css({
	"width": pic_width,
	"height": pic_height,
	"margin": (margin + "px"),
	});
	
	var lr_mov = pic_width+(margin*2);
	var ud_mov = pic_height+(margin*2); 
	
	function coord_to_index(pic_row, pic_col) {
	  var count = 0;
	  for (i=0; i<rows; i++) {
	    for (j=0; j<cols; j++) {
	      if (i===pic_row && j===pic_col)
	        return count;
	      else
	        count++;
	    }   
	  } 
	}

	//swap a given photo for its focused counterpart; fade it in
	function focus_current_img(index){
		$('#' + index).attr("src", "images/" + pic_array[index]).fadeIn(1000);
	}

	//swap a given photo for its blurry counterpart
	function blur_current_img(index){
		$('#' + index).attr('src', "images/" + blur_array[index] );
	}

	var current_img_row = 0;
	var current_img_col = 0;
	var current_img_index = 0;
	
	
	//generic move function
function move(start_row, start_col, end_row, end_col, speed){
	var $new_top = end_row*ud_mov;
	var $new_left = end_col*lr_mov;
	
	var total_moves = 0;
	if (end_row != start_row)
		total_moves++;
	if (end_col != start_col)
		total_moves++;
		
	var moves_completed = 0;
	
	function focus_if_done() {
		moves_completed++;
		if(moves_completed === total_moves){
			focus_current_img(destination_index);
		}
	}	
	
	//left to right
	if(end_col > start_col){
		$('#canvas').animate({ 
			left: -($new_left + 100)
		}, speed).animate({left: -($new_left)}, 300, focus_if_done)
	}
	
	//right to left
	if(end_col < start_col){
		$('#canvas').animate({ 
			left: -($new_left - 100)
		}, speed).animate({left: -($new_left)}, 300, focus_if_done);
	}

	//top to bottom
	if(end_row > start_row){
		$('#canvas').animate({ 
			top: -($new_top + 100)
		}, speed).animate({top: -($new_top)}, 300, focus_if_done);
	}
	
	//bottom to top
	if(end_row < start_row){
		$('#canvas').animate({ 
			top: -($new_top - 100)
		}, speed).animate({top: -($new_top)}, 300, focus_if_done);
	}
}
	
	var destination_index = 0;
	
	//call the move function on whatever thumb you click on 
	$("#thumbs").children().click(function () {
		//deactivate the previous active element
		$('.active').removeClass('active');
		//activate this element
		$(this).children().addClass('active');
		var class_name = $(this).children().attr('class');
		//extract the row number
		row_num = class_name.charAt(4);
		//extract the col number
		col_num = class_name.charAt(10);
		//calculate the destination index
		destination_index  = coord_to_index(parseInt(row_num), parseInt(col_num));
		//move to the new img
		move(current_img_row, current_img_col, row_num, col_num, 300);
		//fade the previous img
		blur_current_img(current_img_index);
		//reset current img to the img we just moved to
		current_img_row = parseInt(row_num);
		current_img_col = parseInt(col_num);
		current_img_index = coord_to_index(current_img_row, current_img_col);
	});
	
	//temporary highlighting within the control panel 
	$("#thumbs").children().children().hover(
		function(){
			$(this).addClass('highlight');
		}, 
		function(){
			$(this).removeClass('highlight');
		});
});

