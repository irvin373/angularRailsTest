require 'json'
file = File.open('(S).json')

data_hash = JSON.load(file)
data_hash2 = JSON.parse(data_hash)

erb={}
data_hash2.each do |key, value|
	erb= value
	
end


	
	File.open("seed(S)txt","w") do |f|
		erb.each do |a|
			arr= a.split(" ")
			arr.shift
			puts arr
			aux=arr.join(" ")
			f.puts( "Atq.create( detail: '"+aux+"')")
		end	
	end


