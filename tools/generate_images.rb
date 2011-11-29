require 'RMagick'
include Magick

pic_array = []
Dir.foreach('images/') do |item|
  next if item[0] == '.' or item[0..1] == '..'
  pic_array << ("images/" + item)
end 
 
# #output the total number of images in the folder 
puts "You have " + (pic_array.length).to_s + " images"

# #generate standardized names for focused images
pic_array.each do |a|
  image = ImageList.new(a)
  match = a.match /\/(\d+)\./
  image.write("images/" + match[1] + "_focused.JPG")
end 

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
