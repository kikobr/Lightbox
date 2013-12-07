//Se o jQuery não estiver inicializado, cria um script e carrega o último jQuery
if(!window.jQuery){
	var url_jquery = "http://code.jquery.com/jquery-latest.min.js";
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', url_jquery);
	document.getElementsByTagName('head')[0].appendChild(script);
}

//Inicia Lightbox com o jQuery!
$(function(){
	
	
	
	
	
});
