Auto Lightbox
========
O Auto Lightbox é um plugin extremamente rápido e fácil de colocar em funcionamento, de simples customização e que garante o encaixe perfeito do conteúdo na tela.

Um lightbox mais fácil de fazer funcionar? Só pagando alguém pra fazer por você!

### Botando pra funcionar ###

1o. Passo: Importe o script da pasta 'js-final' dentro do head da sua página:
```html
<script src="link/para/autolightbox.min.js" type="text/javascript"></script>
</head><!-- Final do head -->
```

2o. Passo: crie um link para a imagem com o atributo 'data-lightbox':
```html
<a href="imagem.jpg" data-lightbox>Clique para ver a imagem</a>
```

Pronto, já está funcionando! Se você quiser brincar um pouco mais, tente isso:

### Colocando descrições nas imagens ###
Basta incluir um atributo title ao seu link. Caso ache o title um fanfarrão aparecido, também pode usar o data-title.
```html
<a href="imagem.jpg" data-lightbox title="Descrição da imagem!">Imagem</a>
<a href="imagem.jpg" data-lightbox data-title="Descrição da imagem!">Imagem</a>
```
### Criando grupos de imagens ###
Você pode agrupar imagens em grupos de exibição definindo um mesmo valor no atributo data-lightbox:
```html
<a href="imagem1.jpg" title="Imagem 1" data-lightbox="galeria">Imagem 1</a>
<a href="imagem2.jpg" title="Imagem 2" data-lightbox="galeria">Imagem 2</a>
```
Você vai perceber a presença de uma seta na lateral do conteúdo. Clique nela ou aperte as setas esquerda e direita do teclado para navegar.

Quero personalizar!
========
O Auto Lightbox permite que você configure algumas de suas propriedades. Após carregar o lightbox da forma dita acima, crie um novo script e defina algum desses parâmetros:
```html
<script type="text/javascript">
	lightbox_options({
		time_fade: 500,
		max_height: 0.8,
		max_width: 0.8,
		click_holder: '.lightbox',
		custom_style: false
	});
</script>
```
### Preciso do jQuery? ###
Sim e não! O Auto Lightbox depende do jQuery para funcionar, mas isso não significa que você precisa inicializá-lo antes, isso é muito chato. Caso o Auto Lightbox perceba que jQuery não foi iniciado ainda, ele mesmo o inclui por você.

### Parâmetros ###

**time_fade**: é o tempo de transição/abertura/fechamento das imagens. O valor deve ser em números inteiros, e é contado em milissegundos.

**max_height**: é a altura máxima, em porcentagem, que o conteúdo deve ocupar da tela. Por padrão, o valor é 0.8 (80%).

**max_width**: caso a imagem seja maior em largura, este é o valor máximo que o conteúdo deve ocupar da largura da tela. Por padrão, o valor também é 0.8 (80%).

**click_holder**: por padrão, o lightbox é acionado em elementos que contenham o atributo data-lightbox. Caso queira mudar essa regra, basta colocar um seletor para ativar o lightbox. No caso de '.lightbox', ele só será ativado se o usuário clicar em um elemento que possua a classe 'lightbox'.

**id_back e id_front**: servem para facilitar a customização. O valor informado aqui será repassado como id para a parte de conteúdo e fundo do lightbox. Ao customizar o lightbox num CSS externo, referencie esse id para ter certeza que suas declarações funcionarão: #frente img { border: 1px solid black; }

**custom_style**: determina se o estilo padrão para o lightbox será carregado ou não. Por padrão, vem como false. Defina-o como true para personalizar o CSS como quiser (Veja mais abaixo).

O visual está uma porcaria, quero mudar!
========
Primeiro, defina como true no lightbox_options o parâmetro custom_style. Isso vai deixar o visual do lightbox todo cru, pra que você possa mexer no que quiser. Para ajudar a criar seu próprio CSS, veja os elementos que constituem o auto lightbox:
```html
<div class="autolightbox">
	<div class="autolightbox-front">
		<div class="autolightbox-content">
			<img src="" alt=""> <!-- Imagem  -->
			<svg class="autolightbox-prev"></svg> <!-- Botão de anterior -->
			<svg class="autolightbox-next"></svg> <!-- Botão de próximo -->
		</div><!-- Contâiner da imagem e botões de navegação -->
		
		<div class="autolightbox-description">
			<span></span> <!-- Numeração (Página x de z) -->
		</div> <!-- Descrição da imagem -->
		<svg class="autolightbox-close"></svg> <!-- Botão de fechar -->
	</div><!-- Toda a informação do lightbox -->

	<div class="autolightbox-back"></div> <!-- Background/Fundo -->
</div>
```
Favor notar que os botões de navegação e fechar são SVG, portanto, aplique estilos para SVG neles.

Quero modificar o código!
========
O código está escrito em CoffeeScript e a build é feita com o Grunt. Portanto, ao baixar o repositório certifique-se de ter o grunt instalado, vá pelo terminal até a página do projeto e rode "grunt".
