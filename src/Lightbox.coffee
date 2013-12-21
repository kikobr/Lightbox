# Lightbox
class Lightbox
  # Constructor roda após toda a classe ser carregada
  constructor: ->
    # Opções definidas pelo usuário. A variável global lightbox_options é criada no início do script. 
    @user_options = if options? then options else null
    @click_holder = if @user_options?.click then @user_options.click else '[data-lightbox]'
    @time_fade = if @user_options?.time_fade then @user_options.time_fade else 250
    @max_width = if @user_options?.max_width then @user_options.max_width else 0.8
    @max_height = if @user_options?.max_height then @user_options.height else 0.85
    @opened = false
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
    # Depois do jQuery ser inicializado, a função global window.lightbox_options irá
    # puxar a função @set. Isso permite que o usuário chame o lightbox_options tanto
    # dentro ou fora de $(function(){  })
    @set_2()
    
  
  # Cria html do lightbox e seu css
  create_html_css: ->
    # Cria os elementos html do lightbox.
    @lightbox = $(document.createElement 'div')
    @lightbox_front = $(document.createElement 'div')
    @lightbox_content = $ '<div></div>'
    @lightbox_back = $(document.createElement 'div')
    
    @lightbox.addClass 'k-lightbox'
    @lightbox_front.addClass 'k-front'
    @lightbox_content.addClass 'k-content'
    @lightbox_back.addClass 'k-back'
    
    @lightbox_front.append @lightbox_content
    @lightbox.append @lightbox_front, @lightbox_back
    $('body').prepend @lightbox
    @lightbox.fadeOut(0) # esconde
    
    # Cria a folha de estilo default
    style = $(document.createElement 'style')
    style.attr 'type', 'text/css'
    style_content = "
      body { margin:0; padding: 0; }
      .k-lightbox .k-front { 
        background-color: transparent; 
        padding: 0px; 
        position: fixed;
        z-index: 991;
      }
      .k-lightbox .k-front img { display:block; }
      .k-lightbox .k-front img.invisible { visibility: hidden; }
      .k-lightbox .k-back {
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
    # Overrides
    # Propriedades simples
    if obj?.time_fade? then @time_fade = obj.time_fade
    if obj?.max_width? then @max_width = obj.max_width
    if obj?.max_height? then @max_height = obj.max_height
    # Click Holder
    default_holder = @click_holder # Guarda antigo click_holder para remover ouvinte
    if obj?.click_holder? 
      @click_holder = obj.click_holder # Seta o novo click_holder a ser ouvido
      @set_click_holders(default_holder)

  set_2: ->
    window.lightbox_options = (obj) =>
      @set(obj)
    
  # Clique e inicialização
  set_click_holders: (override) ->
    if override?
      $(override).unbind('click') # Tira o ouvinte do holder padrão
    $(@click_holder).click (e) => 
      e.preventDefault()
      @open(`$(this)`)
    # Se for um override, só precisar atualizar o click_holder, não precisa redefinir
    # tudo de novo, até pra evitar bugs.
    if override? then return false 
    # Clique no fundo  
    $(@lightbox_back).click =>
      @close()
    # Tecla Esc
    $('body').keydown (e) =>
      if e.keyCode is 27 or e.charCode is 27 or e.which is 27
        if @opened is on
          @close()
      
  close: ->
    @opened = false
    @lightbox_content.html '' # Esvazia o contâiner
    @lightbox.fadeOut(@time_fade)
      
  open: (clicked) ->
    @opened = true
    @lightbox.fadeIn(@time_fade)

    # Checa se é um link com href, para imagens
    href = if clicked?.attr('href')? then clicked.attr('href') else null
    img = new ImageHandler 
      container: @lightbox_content, 
      href: href,
      time_fade: @time_fade,
      max_width: @max_width,
      max_height: @max_height
 
