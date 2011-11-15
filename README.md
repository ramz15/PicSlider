# PicSlider

*Scroll through photos, in style*

- - -

[PicSlider Demo](http://kgcreations.org/picslider/)

- - -

### What's PicSlider?

PicSlider is a jQuery plugin that lets you display pictures in a beautifully clean, fun, stylish way. 

- - -

### How do I use it?

It's really easy to install and use PicSlider. 

Step 1:
Run our simple PicSlider ruby script on your images from the command line to create blurred and thumbs images (or create your own blurred and thumb images).

  ruby blurAndThumb.rb /images_path
  
This will create two new image folders: /blur and /thumbs. 

Step 2: 
Add this script to the head of your page:
  
  <script>
    $(function() {
    		$('#div_id').picSlider({
    		  'columns': number_of_thumb_columns
    		  'speed': speed_of_animations
    			'/pic_array',
    			'/thumb_array',
    			'/blur_array', 
    		});
    });
  </script>
  
You can specify the number of thumb columns and speed of the animations if you'd like. (Default is 3 columns and speed of 350ms)
  
Step 3:
Make sure to include the div with the correct id in your HTML:

  <div id="div_id"></div>  


- - -

