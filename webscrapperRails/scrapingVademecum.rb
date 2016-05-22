require 'mechanize'

def ExisteSiguienteNivel(p)
	if (p == 'Grupos Terapéuticos que puede consultar')
		return true
	else
		return false 
	end
end

def tercernivel(links, url, nombre)
	mechanize = Mechanize.new
	resp = []
	for i in 0..links.size-1 do
		page = mechanize.get(url + links[i].attributes['href'].to_s)
		p = page.at('.columnaizquierda').at('p').text.to_s.split(':')[0]
		if ExisteSiguienteNivel(p)
			retorno = primerNivel(url + links[i].attributes['href'].to_s)	
			resp << retorno
			#exportJson(retorno,nombre + i.to_s)
		else
			resp << [links[i]]
			#exportJson(link,nombre + i.to_s)
		end
	end
	resp = [resp]
	return resp.reduce(:+)
	#exportJson(resp,nombre)
end

def segundoNivel(links, url)
	mechanize = Mechanize.new
	resp = []
	links.each do |link|
		page = mechanize.get(url + link.attributes['href'].to_s)
		p = page.at('.columnaizquierda').at('p').text.to_s.split(':')[0]
		if ExisteSiguienteNivel(p)
			retorno = primerNivel(url + link.attributes['href'].to_s)	
			resp << retorno
		else
			resp << [link]
		end	
	end
	return resp.reduce(:+)
end

def primerNivel(url)
	mechanize = Mechanize.new
	page = mechanize.get(url)
	return page.search('.nombrecomercial')
end

def exportJson(links,nombre)
	json  = '{"ATQ":['
	links.each do |link|
		json += '"' + link.text + '",'
	end		
	json += ']}'
	File.open("#{nombre}.json","w") do |f|
  		f.write(json.to_json)
	end
end

def exportJson2(links,nombre)
	json  = '{"ATQ":['
	links.each do |link|
		json += '"' + link[0].text + '",'
	end		
	json += ']}'
	File.open("#{nombre}.json","w") do |f|
  		f.write(json.to_json)
	end
end

def principal(url2,nombre)
	url = 'http://www.medicamentos.bo/'
	puts 'iniciando'
	links = primerNivel(url2)
	puts 'nivel 1'
	links2 = segundoNivel(links, url)
	puts 'nivel 2'
	links3 = segundoNivel(links2, url)
	puts 'nivel 3'
	puts links3.size
	exportJson(links3,nombre)
end

def othercase(url2,nombre)
	url = 'http://www.medicamentos.bo/'
	puts 'iniciando'
	links = primerNivel(url2)
	puts 'nivel 1'
	links2 = segundoNivel(links, url)
	puts 'nivel 2'
	links3 = tercernivel(links2, url, nombre)
	puts 'nivel 3'
	puts links3.size
	exportJson2(links3,nombre)
end

url = 'http://www.medicamentos.bo/'
url2 = 'http://www.medicamentos.bo/grupoterapeutico?atqid=646'
#principal(url2, 'C')
othercase(url2,'R')