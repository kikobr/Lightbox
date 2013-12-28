# Funções
# ---
reposition = (arg) ->
	position = if arg?.position? then arg.position else 'center'
	obj = if arg?.obj? then arg.obj else console.log 'Erro: A função reposition precisa de um objeto para reposicionar'
	top_percent = 0.5 #default para center
	left_percent = 0.5 #default para center

	if position isnt 'center'
		if position is 'left'
			left_percent = 0

	# Alturas e larguras (o objeto imagem já está redimensionado)
	# Browsers bons
	if window.innerHeight || window.innerWidth
		w_h = window.innerHeight
		w_w = window.innerWidth
	# IE 7-8
	else
		w_h = document.documentElement.clientHeight
		w_w = document.documentElement.clientWidth
	o_h = obj.outerHeight()
	o_w = obj.outerWidth()

	# Posicionamento
	top = (w_h - o_h) * top_percent
	left = (w_w - o_w) * left_percent
	obj.css 'top':top+'px', 'left':left+'px'

#Classes
# ---
class ImageHandler	
	constructor: (obj) ->
		@description = if obj?.description? then obj.description else null
		@load = if obj?.load? then obj.load else null
		@container = if obj?.container? then obj.container else '.k-lightbox .k-front'
		@max_height = if obj?.max_height? then obj.max_height
		@max_width = if obj?.max_width? then obj.max_width
		@time_fade = if obj?.time_fade? then obj.time_fade
		@resize_anim = 'scale'

		# Se for um lightbox convencional, com href.
		if obj?.href?				
			@img = $("<img />")
			# Assim que a imagem tiver sido carregada, da o load do lightbox.
			@img.bind('load', => 
				@load {
					content: @img, 
					description: @description
				}
				@resize()
			).attr('src', obj.href)
			


	resize: ->
		# Browsers bons
		if window.innerHeight || window.innerWidth
			w_h = window.innerHeight
			w_w = window.innerWidth
		# IE 7-8
		else
			w_h = document.documentElement.clientHeight
			w_w = document.documentElement.clientWidth
		c_h = @container.outerHeight()
		c_w = @container.outerWidth()
		i_h = @img.outerHeight()
		i_w = @img.outerWidth() 
		@img.addClass 'invisible' # Some no início para fazer a animação depois.
		
		# Calcula o tamanho da imagem.
		# ---
		# Se extrapolar limite de altura redimensiona imagem junto com a largura
		image_height =
		image_width =
		if c_h >= w_h
			max_height = @max_height*w_h
			container_infos = c_h - i_h
			image_height = max_height - container_infos
			@img.css 'height': image_height+'px', 'width' : 'auto'

		# Se por acaso for a largura que extrapole, redimensiona a imagem junto com a altura
		else if c_w >= w_w
			max_width = @max_width*w_w
			container_infos = c_w - i_w
			image_width = max_width - container_infos
			@img.css 'width':image_width+'px', 'height': 'auto'

		# Alinha ao centro da tela
		front = @img.closest '.k-front'
		reposition position: 'center', obj:front

		@img.removeClass 'invisible'

		# Animação de Entrada
		switch @resize_anim
			when 'scale'
				# Guarda os tamanhos atuais, para zerar e depois animar até o que era.
				w_backup = @img.outerWidth()
				h_backup = @img.outerHeight()
				# A posição também é importante para o efeito se dar a partir do centro
				front = @img.closest '.k-front'
				t_backup = parseInt((front.css 'top').slice 0,-2) # remove 'px' e vira int
				l_backup = parseInt((front.css 'left').slice 0,-2) # remove 'px' e vira int
				t = t_backup + (@img.outerHeight()/2) # centro da imagem
				l = l_backup + (@img.outerWidth()/2) # centro da imagem

				# Inicia
				@img.css 'width':'0', 'height':'0'				
				@img.animate { 
					'width': w_backup+'px',
					'height': h_backup+'px' 
				}, @time_fade

				front.css 'top':t, 'left':l
				front.animate {
					'top':t_backup+'px',
					'left':l_backup+'px'
				}, @time_fade
			else
				@img.fadeOut 0
				@img.fadeIn @time_fade


class DescriptionHandler
	constructor: (obj) ->
		@description = if obj?.description? then obj.description else ''
		@is_on = if @description? then true else false
		@container = if obj?.container? then obj.container
		@group_output = if obj?.group_output? then obj.group_output else null
		@output()
	output: ->
		@container.append @description
		if @group_output? then @container.append '<span>'+@group_output+'</span>'
		@container.css 'visibility', 'hidden'


class GroupHandler
	constructor: (clicked) ->
		@group_handler = $ '[data-lightbox]'
		@enable = false # Default. Isso será atualizado a cada clique.
		@clicked = if clicked? then clicked else null
		@groups = {}
		@get_groups() # Atualiza todos os grupos da página
		
		# Define a posição do item atual e os links para anterior e próximo
		@group_item_info() 

	get_groups: ->
		# Loop entre todos os lightboxes procurando grupos
		groups = @groups
		@group_handler.each ->
			group = $(@).attr 'data-lightbox'
			# Se tiver um grupo definido no Html:
			if group isnt ''
				# Se esse grupo ainda não existir na nossa array, será criado.
				if groups[group] == undefined
					groups[group] = []
				# Adiciona o elemento ao grupo pertencente.
				groups[group].push $ @
		# Checa se o elemento clicado faz parte dos grupos registrados
		if groups.hasOwnProperty @clicked.attr 'data-lightbox'
			@enable = true

	group_item_info: ->
		if @enable
			# Loop pelos dos principais grupos
			for group of @groups
				# Procura no grupo do loop se ele contém o elemento
				for elem, i in @groups[group]
					# Se o elemento for reconhecido, retorna o seu indice
					if elem.is @clicked
						# Mensagem de output
						index = i+1 # Começa com 0
						total = @groups[group].length
						@output = 'Imagem '+index+' de '+total
						
						# Item anterior
						if @groups[group][i-1]?
							@prev = @groups[group][i-1]
						else @prev = null

						# Próximo item
						if @groups[group][i+1]?
							@next = @groups[group][i+1]
						else @next = null

						# Termina todo o loop.
						breakLoop = true
						break
				if breakLoop then break
		else return null

