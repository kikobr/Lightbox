# Lightbox
class Lightbox
  # Constructor roda após toda a classe ser carregada
  constructor: ->
    # Opções definidas pelo usuário. A variável global lightbox_options é criada no início do script. 
    @user_options = if options? then options else null
    @click_holder = if @user_options?.click then @user_options.click else '[data-lightbox]'
    @time_fade = if @user_options?.time_fade then @user_options.time_fade else 250
    
    #---------------------------------------------------
    # Cria o html e o style do lightbox
    @create_html_css()
    #---------------------------------------------------    
    # Seta configurações personalizadas do usuário
    if @user_options? then @set(@user_options)    
    #---------------------------------------------------
    # Inicia as ações de clique
    @set_click_holders()
    # --------------------------------------------------
    
  
  # Cria html do lightbox e seu css
  create_html_css: ->
    # Cria os elementos html do lightbox.
    @lightbox = $(document.createElement 'div')
    @lightbox_front = $(document.createElement 'div')
    @lightbox_back = $(document.createElement 'div')
    
    @lightbox.addClass 'lightbox'
    @lightbox_front.addClass 'front'  
    @lightbox_back.addClass 'back'
    
    @lightbox.append @lightbox_front, @lightbox_back
    $('body').prepend @lightbox
    @lightbox.fadeOut(0) # esconde
    
    # Cria a folha de estilo primária
    style = $(document.createElement 'style')
    style.attr 'type', 'text/css'
    style_content = "
      body { margin:0; padding: 0; }
      .lightbox .front { 
        background-color: #FFFFFF; 
        padding: 10px; 
        position: absolute;
        z-index: 991;
      }
      .lightbox .back {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 990;
        background: grey; background: rgba(0,0,0,0.4);
      }
    "
    style.html style_content
    $('head').append style
  
  
  # User Config 
  set: (obj) ->
    # Ids personalizadas para customização de CSS
    id_front = if obj?.id_front? then obj.id_front else null
    id_back = if obj?.id_back? then obj.id_back else null  
    if id_front? then @lightbox_front.attr 'id', id_front # Pode definir uma id para customizar o CSS depois.
    if id_back? then @lightbox_back.attr 'id', id_back # Pode definir uma id para customizar o CSS depois.
    
    
  # Clique e inicialização
  set_click_holders: ->
    $(@click_holder).click (e) =>      
      e.preventDefault()
      @open(`$(this)`)
    $(@lightbox_back).click =>
      @close()
      
  close: ->
    @lightbox.fadeOut(@time_fade)
      
  open: (clicked) ->
    # Checa se é um link com href, para imagens
    img_link = if clicked?.attr('href')? then clicked.attr('href') else null
      
    @lightbox.fadeIn(@time_fade)
 
