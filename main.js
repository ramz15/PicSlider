$(document).ready(function() {

  var pic_array = ["1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG", "6.JPG"];

  for(pic in pic_array) {
    $("#canvas").append("<img src=\"images/" + pic_array[pic] + "\">");
  }

  var window_width = $(window).width();
  var window_height = $(window).height();

  var canvas_width = (2 * window_width + 50);
  var canvas_height = (3 * window_height + 50);
  
  $("#canvas").css({
    "width": canvas_width
    "height": canvas_height
  });
  
  $("#canvas").children().css({
    "width": window_width,
    "height": window_height
  });

  $("IMG:not(:first-child)").hide();

  var $current_img = $("#pics").children().filter(":visible");

  $("#scroll_btn").click(function () {
    
    // if($current_img.before()){
    //   $current_img.before().hide();
    // }
    var $next_img = $current_img.next();
    
    $current_img.animate({ 
      // improve to complete leave screen
      left: -($current_img.width()+30)
    }, 1000,function() {
      $next_img.show();
      $current_img.hide(function() {
        $next_img.animate({
          left: 0
        });
      });
    });

    
    // $current_img.hide();
  
    
    // $next_img.css({
    //   "left": $next_img.width() + 30
    // });
    
    // $current_img.hide();
    //     
    $current_img = $next_img;
    
  });
  
});




