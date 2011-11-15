require 'RMagick'
include Magick

pic_array = ["images/1.JPG", "images/2.JPG", "images/3.JPG", "images/4.JPG", "images/5.JPG", "images/6.JPG", "images/7.JPG", "images/8.JPG", "images/9.JPG"]

#generate standardized names for focused images
pic_array.each do |a|
  image = ImageList.new(a)
  match = a.match /\/(\d+)\./
  mini_image.write("images/" + match[1] + "_focused.JPG")

#generate thumbs
pic_array.each do |a| 
  image = ImageList.new(a)
  mini_image = image.scale(300, 199)
  match = a.match /\/(\d+)\./
  mini_image.write("images/" + match[1] + "_thumb.JPG")
end 
 
#generate blurred images
pic_array.each do |a| 
  image = ImageList.new(a)
  #resize and blur
  blur_image = image.resize(1500,996).gaussian_blur(15.0, 15.0)
  match = a.match /\/(\d+)\./
  blur_image.write("images/" + match[1] + "_blurred.JPG") 
end 
