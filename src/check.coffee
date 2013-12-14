jquery_solicitado = false
options = {}

# É chamado do HTML, depois que a página é carregada.
window.lightbox_options = (obj) ->
  options = obj

###  
     Se o jQuery não estiver inicializado, cria um elemento script,
     carrega a última versão e inicializa o lightbox.  
###
check_jQuery = ->
  # Se o jQuery não tiver sido inicializado ainda
  if !jQuery?    
    alert 'nao'
    if !jquery_solicitado       
      jquery_solicitado = true # Só permite a criação do script do jQuery uma vez, depois trava.
      document.write("<script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>") # Última versão
    
    # Repete até que o jQuery seja carregado e inicializado
    setTimeout check_jQuery,50 
  
  #jQuery inicializado     
  else 
    $ -> 
      # Inicializa o Lightbox
      lightbox = new Lightbox      
      # Colocar no window para que seja acessível globalmente,
      # como dentro de um <script> no html.
      window.lightbox = lightbox

check_jQuery();
