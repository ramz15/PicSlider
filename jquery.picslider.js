(function( $ ) {
	
	$.fn.picSlider = function(options) {
		
	//LIST FUNCTIONS HERE//
		
		//convert row/column coordinates to an index number 
		function coord_to_index(pic_row, pic_col) {
		  var index = 0;
		  for (i=0; i<rows; i++) {
		    for (j=0; j<cols; j++) {
		      if (i===pic_row && j===pic_col)
		        return index;
		      else
		        index++;
		    }   
		  } 
		}

		//swap a given photo for its focused counterpart; fade it in
		function focus_current_img(index){		  
		  $(".picSliderClear").remove();
		  
			$('#' + index).after("<img class=\"picSliderClear\" src=\"" + options.pic_array[index] + "\">");
			
			$(".picSliderClear").hide().fadeIn(800);
			
			var clear_top = parseInt($(".picScrollerCanvas").css("top"))*-1;
			var clear_left = parseInt($(".picScrollerCanvas").css("left"))*-1;
			
			$(".picSliderClear").css({
			"width": pic_width,
			"height": pic_height,
			"margin": (margin + "px"),
			"top": clear_top,
			"left": clear_left,
			//"z-index": 2,
			"position": "absolute",
			});
				
			//$('#' + index).attr("src", "" + options.pic_array[index]).fadeIn(3000);
		}

		//swap a given photo for its blurry counterpart
		function blur_current_img(index){
			$('#' + index).attr('src', options.blur_array[index] );
		}

		//move the canvas from a starting location to an ending location, at a certain speed
		function move(start_row, start_col, end_row, end_col, speed){
			//calculate the new top/new left value
			var $new_top = end_row*ud_mov;
			var $new_left = end_col*lr_mov;
			
			//determine if we're calling for 1 or 2 total moves
			var total_moves = 0;
			if (end_row != start_row)
				total_moves++;
			if (end_col != start_col)
				total_moves++;
			
			//keep track of the number of moves that have been completed
			var moves_completed = 0;
			
			//function that calls focus_current_img when we're done moving.
			function focus_if_done() {
				moves_completed++;
				if(moves_completed === total_moves){
					focus_current_img(destination_index);
				}
			}	
			
			var overshoot = 100;
			var duration = 300;
			//left to right
			if(end_col > start_col){
				$('.picScrollerCanvas').animate({ 
					left: -($new_left + overshoot)
				}, speed).animate({left: -($new_left)}, duration, focus_if_done)
			}

			//right to left
			if(end_col < start_col){
				$('.picScrollerCanvas').animate({ 
					left: -($new_left - overshoot)
				}, speed).animate({left: -($new_left)}, duration, focus_if_done);
			}

			// //top to bottom
			if(end_row > start_row){
				$('.picScrollerCanvas').animate({ 
					top: -($new_top + overshoot)
				}, speed).animate({top: -($new_top)}, duration, focus_if_done);
			}

			//bottom to top
			if(end_row < start_row){
				$('.picScrollerCanvas').animate({ 
					top: -($new_top - overshoot)
				}, speed).animate({top: -($new_top)}, duration, focus_if_done);
			}
		}
			
		//FUNCTION LIST ENDS HERE//	
			
			//give the selected container a "canvas" class, so that we can identify it in css and js
			this.addClass("picScrollerCanvas");
			
			//plug pics into canvas; all but first pic should be blurry
			for(pic in options.pic_array) {
				if(pic == 0) 
					this.html("<img id=\"" + pic + "\" class=\"picSliderFirst\" src=\"" + options.pic_array[pic] + "\">");
				else 
					this.append("<img id=\"" + pic + "\" class=\"picSliderBlur\" src=\"" + options.blur_array[pic] + "\">");
			}
			
			//create a thumbnail container within the main container 
			this.after("<div class='picScrollerThumbs'></div>");

			//calculate the number of rows, given the user's choice of columns (default is 3 cols)
			if(options.columns === undefined)
				var cols = 3;
			else
				var cols = options.columns;
			var rows = Math.ceil(options.pic_array.length/cols);
			var count = 0; 

			//put thumbnails in thumbnail container
			for(i=0; i<rows; i++){
				for(j=0; j<cols; j++){
					$('.picScrollerThumbs').append("<a href=\"#\"><img class=\"row-" + i + " col-" + j + "\"  src=\"" + options.thumb_array[count] + "\" /></a>").hide();
					count += 1
				}
			}

			//set dimensions of the thumbnails and the container for the thumbnails
			var thumb_width = 40;
			var thumb_height = 30;
			var button_container_width = thumb_width*cols;
			var button_container_height = thumb_height*rows;
			
			//set css properties for each element
			$('.picScrollerThumbs').children().children().css({
				'width': thumb_width,
				'height': thumb_height,
				'display': 'inline-block',
				'float': 'left'
			});

			$('.picScrollerThumbs').css({
				'width': button_container_width,
				'height': button_container_height,
				'position': 'fixed',
				'top': '30px',
				'right': '30px',
				'z-index': 10
			}).show();

			//for temporary highlighting within the control panel 
			$(".picScrollerThumbs").children().children().hover(
				function(){
					$(this).addClass('picScrollerHighlight');
				}, 
				function(){
					$(this).removeClass('picScrollerHighlight');
			});

			//set pic width and height
			var pic_width = $(window).width()-50;
			var pic_height = $(window).height()-50;

			var margin = 25;

			//set canvas width and height
			var canvas_width = (cols * pic_width) + (cols*2*margin);
			var canvas_height = (rows * pic_height) + (rows*2*margin);

			this.css({
			"width": canvas_width,
			"height": canvas_height
			});

			this.children().css({
			"width": pic_width,
			"height": pic_height,
			"margin": (margin + "px"),
			});

			//set variables for movement
			var lr_mov = pic_width+(margin*2);
			var ud_mov = pic_height+(margin*2); 

			//set current_img row and col to 0, 0 and current_img index to 0 (since we start at top left)
			var current_img_row = 0;
			var current_img_col = 0;
			var current_img_index = 0;

			var destination_index = 0;

			//call the move function on whatever thumb you click on 
			$(".picScrollerThumbs").children().click(function () {
				//deactivate the previous active element
				$('.picScrollerActive').removeClass('picScrollerActive');

				//activate this element
				$(this).children().addClass('picScrollerActive');
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
	
	};
})( jQuery );