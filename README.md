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

**Step 1:**

If you would like to use your own set of focused images and blurred images, please skip to Step 2. 

Start with the photos you'd like to display. Place them all in a folder called "picSliderImages."

Then download RMagick. Instructions here: http://rmagick.rubyforge.org/install-faq.html#osx. 

After you have RMagick installed, cd to the picSliderImages folder and run the ruby script that's part of this package. 

```bash
ruby generate_images.rb 
``` 
This will generate 3 new sets of images (a focused img set, a blurred img set, and a thumbnail img set -- all JPGs). The script will also output the number of photos you started with.   

**Step 2:**
Add this script to the head of your page:
  
    <script>
      $(function() {
      		$('#div_id').picSlider({
      		  'number': images
      		  'columns': num_of_columns
      		  'speed': speed_of_animations
      		  'focused_array' :
      		  'blurred_array' :
      		  'thumb_array' :
      		});
      });
    </script>
  
Number is a required field; it should be an integer. Columns and speed are optional fields. If you specify nothing, they will default to 3 columns and a speed of 350ms.

Focused\_array, blurred\_array, and thumb\_array are also optional fields. If you desire, you can set them as an array of paths to the appropriate photos, e.g. ('blurred array' : ['myphotosfolder/myblurredpic\_1', 'myphotosfolder/myblurredpic\_2']).
  
**Step 3:**
Make sure to include the div with the correct id in your HTML:

    <div id="div_id"></div>  

This is where the images will be inserted. The animation will take up your whole screen. 
- - -

