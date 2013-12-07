#Se o jQuery não estiver inicializado, cria um script e carrega o último jQuery
if window.jQuery isnt on
	script = document.createElement 'script'
	script.setAttribute 'type','text/javascript'
	script.setAttribute 'src', 'http://code.jquery.com/jquery-latest.min.js'
	(document.getElementsByTagName 'head')[0].appendChild script

#Inicia Lightbox com o jQuery!
$ ->
  # Lightbox
  class Lightbox
    constructor: ->
      @config()
      
    config: (obj) ->
      nome = if obj?.nome? then obj.nome else 'Nome-padrão'
      alert(nome)
  
  
  
  
  # Inicializa
  lightbox = new Lightbox()
  window.lightbox = lightbox