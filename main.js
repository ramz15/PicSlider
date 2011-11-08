$(document).ready(function() {

  var pic_array = ["1.JPG", "2.JPG", "3.JPG", "4.JPG", "5.JPG"];

  for(pic in pic_array) {
    $("#pics").append("<img src=\"images/" + pic_array[pic] + "\">");
  }

  var window_width = $(window).width();
  var pic_width = (pic_array.length * window_width + 50);
  
  $("#pics").css({
    "width": pic_width
  });
  
  $("#pics").children().css({
    "width": window_width,
    "height": "100%"
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




