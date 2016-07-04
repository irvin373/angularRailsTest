require 'json'

lista = ['(B) SANGRE Y APARATO HEMATOPOYÉTICO.json','(A) TRACTO ALIMENTARIO Y METABOLISMO.json','R.json','N.json','M.json','K.json','G.json','D.json','C.json','(J).json','(L).json','(P).json','(S).json','(V).json']

def transform(lista)
	lista.each do |arch|
		transform1(arch)
	end
end


def transform1(name)
	file = File.open(name)

	data_hash = JSON.load(file)
	data_hash2 = JSON.parse(data_hash)

	erb={}
	data_hash2.each do |key, value|
		erb= value
	end
	
	File.open("name.txt","a") do |f|
		erb.each do |a|
			arr= a.split(" ")
			arr.shift
			puts arr
			aux=arr.join(" ")
			f.puts( "Atq.create( detail: '"+aux+"')")
		end	
	end	
end

transform(lista)

