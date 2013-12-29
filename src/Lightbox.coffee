# Lightbox
class Lightbox
  # Constructor roda após toda a classe ser carregada
  constructor: ->
    # Opções definidas pelo usuário. A variável global lightbox_options é criada no início do script. 
    @user_options = if options? then options else null
    @click_holder = if @user_options?.click then @user_options.click else '[data-lightbox]'
    @time_fade = if @user_options?.time_fade then @user_options.time_fade else 250
    @max_width = if @user_options?.max_width then @user_options.max_width else 0.8
    @max_height = if @user_options?.max_height then @user_options.height else 0.8
    @custom_style = if @user_options?.custom_style then @user_options.custom_style else false
    @opened = false
    #---------------------------------------------------
    # Cria o html e o style do lightbox
    @create_html_css()
    #---------------------------------------------------    
    # Seta configurações personalizadas do usuário e
    if @user_options? then @set(@user_options)  
    #---------------------------------------------------
    # Inicia as ações de clique default
    # Se o custom_set_click da função set() já estiver definido,
    # o set_click_holders será chamado sozinho, então poderemos
    # pular essa parte para não duplicar.
    if @custom_set_click? isnt on then @set_click_holders()
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
    @lightbox_description = $ '<div></div>'
    @lightbox_close = $ close # Definido em icons.coffee
    @lightbox_prev = $ next_arrow
    @lightbox_next = $ next_arrow
    @lightbox_loading = $ loading
    @lightbox_back = $(document.createElement 'div')

    @lightbox.addClass 'autolightbox'
    @lightbox_front.addClass 'autolightbox-front'
    @lightbox_close.attr 'class':'autolightbox-close', 'title':'Fechar [Pressione Esc]' # Só aplica com attr.
    @lightbox_prev.attr 'class':'autolightbox-prev', 'title':'Imagem anterior [Pressione seta esquerda]'
    @lightbox_next.attr 'class':'autolightbox-next', 'title':'Próxima Imagem [Pressione seta direita]'
    @lightbox_loading.attr 'class':'autolightbox-loading', 'title':'Carregando'
    @lightbox_content.addClass 'autolightbox-content'
    @lightbox_description.addClass 'autolightbox-description'
    @lightbox_back.addClass 'autolightbox-back'
    
    @lightbox_content.append(
      @lightbox_prev,
      @lightbox_next
    )
    @lightbox_front.append(
      @lightbox_content,
      @lightbox_description, 
      @lightbox_close
    )
    @lightbox.append(
      @lightbox_front, 
      @lightbox_back
    )
    $('body').prepend @lightbox
    @lightbox.fadeOut(0) # esconde
    
    # Cria a folha de estilo default
    @style = $ '<style />'
    @style.attr 'type':'text/css'
    # Maldito IE8-7
    if (@style[0].styleSheet)
      @style[0].styleSheet.cssText = style_content + loader_style + custom_style
    # Navegadores bons
    else
      @style.append style_content+loader_style # styles.coffee
      # Só carrega o estilo padrão se o usuário não definir um custom_style.
      if @custom_style is off then @style.append custom_style 

    # Carrega a folha de estilo no head.
    $('head').append @style

  # User Config 
  set: (obj) ->
    # Prepara para retirar!
    # Ids personalizadas para customização de CSS
    id_front = if obj?.id_front? then obj.id_front else null
    id_back = if obj?.id_back? then obj.id_back else null  
    if id_front? then @lightbox_front.attr 'id', id_front # Pode definir uma id para customizar o CSS depois.
    if id_back? then @lightbox_back.attr 'id', id_back # Pode definir uma id para customizar o CSS depois.
    
    # Propriedades simples
    if obj?.time_fade? then @time_fade = obj.time_fade
    if obj?.max_width? then @max_width = obj.max_width
    if obj?.max_height? then @max_height = obj.max_height

    # Estilo Customizado dentro da $(function(){})
    # Certifica de preencher novamente a tag só com o estilo necessário.
    if obj?.custom_style?
      @custom_style = true;
      @style.html ''
      @style.append style_content+loader_style

    # Click Holder
    default_holder = @click_holder # Guarda antigo click_holder para remover ouvinte
    if obj?.click_holder?
      @custom_set_click = true
      @click_holder = obj.click_holder # Seta o novo click_holder a ser ouvido
      @set_click_holders(default_holder)

  set_2: ->
    window.lightbox_options = (obj) =>
      @set(obj)
    
  # Clique e inicialização
  set_click_holders: (override) ->
    if override? then $(override).unbind('click') # Tira o ouvinte do holder padrão
    $(@click_holder).click (e) => 
      e.preventDefault()
      @open(`$(this)`)

    # Botão de fechar
    $(@lightbox_close).click =>
      @close()
    # Clique no fundo ou em close  
    $(@lightbox_back).click =>
      @close()
    # Teclas
    $('body').keydown (e) =>
      # Esc
      if e.keyCode is 27 or e.charCode is 27 or e.which is 27
        if @opened is on
          @close()
      # Seta Esquerda
      if e.keyCode is 37 or e.charCode is 37 or e.which is 37
        if @opened and @groups.enable and @groups.prev
          @open @groups.prev
      # Seta Direita
      if e.keyCode is 39 or e.charCode is 39 or e.which is 39
        if @opened and @groups.enable and @groups.next?
          @open @groups.next

  close: ->
    @opened = false
    # Primeiro dá o fadeOut, depois limpa os containeres.
    @lightbox.fadeOut @time_fade, =>
      @lightbox_content.find('img').remove() # Esvazia o contâiner
      @lightbox_description.html '' # Esvazia descrição
      @lightbox_close.fadeOut 0
      @lightbox_prev.fadeOut 0
      @lightbox_next.fadeOut 0

  open: (clicked) ->
    # Checa se tem uma imagem atualmente carregada
    # (Navegação pelo grupo)
    if @opened = true
      @lightbox_content.find('img').remove()
      @lightbox_description.html ''
    else
      @opened = true

    # Certeza que não vão aparecer pra bugar
    @lightbox_prev.fadeOut 0
    @lightbox_next.fadeOut 0
    @lightbox_close.fadeOut 0

    # Abre o lightbox
    @lightbox.fadeIn @time_fade

    # Adiciona o loading e centraliza na tela.
    @lightbox_content.append @lightbox_loading
    reposition obj:@lightbox_front
    @lightbox_content.addClass 'loading'

    # --------------------------------------------------
    # Nova instância do GroupsHandler
    @groups = new GroupHandler clicked
    # Handlers de próximo e anterior
    @lightbox_prev.unbind 'click'
    @lightbox_next.unbind 'click'
    if @groups.prev?
      @lightbox_prev.click =>
        @open @groups.prev
    if @groups.next?
      @lightbox_next.click =>
        @open @groups.next

    # ---
    # Leitura do href
    # ---    
    href = if clicked?.attr 'href' then clicked.attr 'href' else null
    if href
      # Se for um link de imagem
      # ---
      is_img_link = /http:\/\/(.+)(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.tiff|\.svg|\.gif)$/ # começa com 'http://', seguido de qualquer tipo de caractere, quantas vezes forem, desde que termine com .jpg. 
      if is_img_link.test(href)
        # Se tiver descrições
        description = ''
        if clicked?.attr 'title'
          description = clicked.attr 'title'
        # Pode-se pegar as descrições pelo data-title também.
        else if clicked?.attr 'data-title'
          description = clicked.attr 'data-title'
        
        @description = new DescriptionHandler
          description: description,
          container: @lightbox_description,
          group_output: @groups.output

        @img = new ImageHandler
          load: @load,
          container: @lightbox_content,
          href: href,
          description: @description,
          time_fade: @time_fade,
          max_width: @max_width,
          max_height: @max_height

 
  # Vai ser chamado de alguma outra classe, por isso precisa do contexto definido =>.
  load: (obj) =>
    content = if obj?.content? then obj.content #imagem
    if @lightbox_content.find '.autolightbox-loading'
      @lightbox_loading.remove()
      @lightbox_content.removeClass 'loading'
    @lightbox_content.append content

    # Botões e descrição    
    setTimeout =>
      if @description.is_on
        @lightbox_description.fadeOut 0
        @lightbox_description.css 'visibility', 'visible'
        @lightbox_description.fadeIn 500
      if @groups.enable
        if @groups.prev?
          @lightbox_prev.fadeIn 500
        if @groups.next?
          @lightbox_next.fadeIn 500
      @lightbox_close.fadeIn 500
    , @time_fade
