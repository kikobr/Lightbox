# Funções
# ---
reposition = (arg) ->
	position = if arg?.position? then arg.position else 'center'
	obj = if arg?.obj? then arg.obj else console.log 'Erro: A função reposition precisa de um objeto para reposicionar'
	top_percent = 0.5 #default para center
	left_percent = 0.5 #default para center

	if position isnt 'center'
		if position is 'left'
			lef_percent = 0.1

	# Alturas e larguras (o objeto imagem já está redimensionado)
	w_h = window.innerHeight
	w_w = window.innerWidth
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
		@container = if obj?.container? then obj.container else '.k-lightbox .front'
		@max_height = if obj?.max_height? then obj.max_height
		@max_width = if obj?.max_width? then obj.max_width
		@time_fade = if obj?.time_fade? then obj.time_fade

		# Se for um lightbox convencional, com href.
		if obj?.href?
			@img = $("<img />").attr 'src': obj.href, 'style':'/*height: 500px; width: 2500px;*/'
			# Só continua se a imagem estiver tiver sido baixada por completo.
			@img.load =>
				@append()	
				@resize()


	resize: ->
		w_h = window.innerHeight
		w_w = window.innerWidth
		c_h = @container.outerHeight()
		c_w = @container.outerWidth()
		i_h = @img.outerHeight()
		i_w = @img.outerWidth() 
		@img.addClass 'invisible' # Some no início para fazer a animação depois.

		# Calcula o tamanho da imagem.
		# ---
		# Se extrapolar limite de altura redimensiona imagem junto com a largura
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
		front = @img.closest '.front'
		reposition position: 'center', obj:front

		@img.removeClass 'invisible'
		@img.fadeOut 0
		@img.fadeIn @time_fade


	append: ->
		@container.html ''
		@container.append @img

