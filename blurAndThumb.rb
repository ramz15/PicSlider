require 'RMagick'
include Magick

pic_temp = ["images/1.JPG"]
pic_array = ["images/1.JPG", "images/2.JPG", "images/3.JPG", "images/4.JPG", "images/5.JPG", "images/6.JPG", "images/7.JPG", "images/8.JPG", "images/9.JPG"]

# #generate thumbs
# pic_array.each do |a| 
#   image = ImageList.new(a)
#   mini_image = image.scale(300, 199)
#   match = a.match /\/(\d+)\./
#   mini_image.write("images/" + match[1] + "_thumb.JPG")
# end 

#generate blurred images
pic_temp.each do |a| 
  image = ImageList.new(a)
  blur_image = image.gaussian_blur(0.0, 5.0)
  blur_image.display
end

  

