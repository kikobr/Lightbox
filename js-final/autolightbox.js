(function() {
  var DescriptionHandler, GroupHandler, ImageHandler, Lightbox, check_jQuery, close, custom_style, jquery_solicitado, loader_style, loading, next_arrow, options, reposition, style_content,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  jquery_solicitado = false;

  options = {};

  window.lightbox_options = function(obj) {
    return options = obj;
  };

  /*  
       Se o jQuery não estiver inicializado, cria um elemento script,
       carrega a última versão e inicializa o lightbox.
  */


  check_jQuery = function() {
    if (typeof jQuery === "undefined" || jQuery === null) {
      if (!jquery_solicitado) {
        jquery_solicitado = true;
        document.write("<script type=\"text/javascript\" src=\"http://code.jquery.com/jquery-latest.min.js\"></script>");
      }
      return setTimeout(check_jQuery, 50);
    } else {
      return $(function() {
        var lightbox;
        lightbox = new Lightbox;
        return window.lightbox = lightbox;
      });
    }
  };

  check_jQuery();

  close = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
		<image width="40" height="40" src="http://iconmonstr.com/g/gd/makefg.php?i=s2/default/iconmonstr-x-mark-icon.png" />\
		<polygon id="x-mark-icon" points="438.393,374.595 319.757,255.977 438.378,137.348 374.595,73.607 255.995,192.225 137.375,73.622 73.607,137.352 192.246,255.983 73.622,374.625 137.352,438.393 256.002,319.734 374.652,438.378 "/>\
		</svg>';

  loading = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="40px" height="40px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
			<path id="loading-2-icon" d="M236,163.117V50h40v113.117c-6.449-1.382-13.139-2.116-20-2.116S242.449,161.735,236,163.117z M227.021,165.509L170.322,67.6l-34.641,20l56.678,97.873C202.248,176.542,214.027,169.667,227.021,165.509z M185.479,192.351 L87.6,135.681l-20,34.641l97.912,56.689C169.672,214.017,176.547,202.24,185.479,192.351z M161,256.001 c0-6.861,0.734-13.551,2.117-20H50v40h113.117C161.734,269.552,161,262.862,161,256.001z M256,351c-5.979,0-11.826-0.559-17.5-1.615 V462h35V349.385C267.828,350.441,261.98,351,256,351z M165.592,285.24L67.6,341.681l20,34.641l98.053-56.475 C176.693,309.98,169.787,298.22,165.592,285.24z M331.289,313.934l96.863,55.893l12.5-21.65l-96.84-55.879 C340.59,300.086,336.361,307.351,331.289,313.934z M290.008,344.725l56.002,97.177l25.98-15l-56.025-97.221 C308.23,335.983,299.484,341.09,290.008,344.725z M192.139,326.334l-56.459,98.068l34.641,20l56.42-98.001 C213.762,342.203,202.002,335.295,192.139,326.334z M350.477,246.001c0.344,3.287,0.523,6.622,0.523,10c0,3.377-0.18,6.713-0.523,10 H462v-20H350.477z M309.602,177.562l56.457-98.197l-12.124-7l-56.436,98.159C301.718,172.577,305.761,174.933,309.602,177.562z M342.252,216.143l97.266-56.282l-8.5-14.722l-97.26,56.279C337.009,206.04,339.855,210.966,342.252,216.143z"/>\
			</svg>';

  loading = '\
<div class="loader">\
  <div></div>\
  <div></div>\
  <div></div>\
  <div></div>\
  <div></div>\
</div>\
';

  next_arrow = '\
	<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="45px" height="45px" viewBox="0 0 512 512" enable-background="new 0 0 512 512" xml:space="preserve">\
	<image width="40" height="40" src="http://iconmonstr.com/g/gd/makefg.php?i=s2/default/iconmonstr-x-mark-icon.png" />\
	<polygon id="arrow-25-icon" points="142.332,104.886 197.48,50 402.5,256 197.48,462 142.332,407.113 292.727,256 "/>\
	</svg>\
';

  style_content = "      body { margin:0; padding: 0; } /* Certeza que nao vao ficar margens brancas */      .autolightbox { background-color: black; }      .autolightbox-front {        position: fixed;        z-index: 991;      }      .autolightbox-front img { display:block; }      .autolightbox-front img.invisible { visibility: hidden; }      .autolightbox-description {        margin-top: 10px;        font-size: 15px;        line-height: 1.1em;        color: white;      }      .autolightbox-description span {        display: block;        font-size: 0.85em;        *color: #AAA; /* IE7 */        opacity: 0.5;         filter: alpha(opacity=50); /* IE 8 */       }      .autolightbox-prev, .autolightbox-next {        position: absolute;        top: 50%;        left: auto; right: 15px; /* Default k-next */        border:none;        cursor:pointer;        -moz-transform: translateY(-100%); /* Default k-next */        -o-transform: translateY(-100%); /* Default k-next */        -ms-transform: translateY(-100%); /* Default k-next */        -webkit-transform: translateY(-100%); /* Default k-next */        transform: translateY(-100%); /* Default k-next */      }      .autolightbox-prev {        left: 15px; right: auto;        -moz-transform: rotate(180deg) translateY(50%);        -o-transform: rotate(180deg) translateY(50%);        -ms-transform: rotate(180deg) translateY(50%);        -webkit-transform: rotate(180deg) translateY(50%);        transform: rotate(180deg) translateY(50%);        -moz-transform-origin: 50% 25%;         -o-transform-origin: 50% 25%;        -ms-transform-origin: 50% 25%;\        -webkit-transform-origin: 50% 25%;        transform-origin: 50% 25%;       }      .autolightbox-close {        display:none;        position:absolute;         top: 15px; right: 15px;        cursor:pointer;      }      .autolightbox-back {        width: 100%; height: 100%;        position: fixed;        z-index: 990;        background: black; /* Init IE7-8 */        background-color: rgba(0,0,0,0.7);              -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\"; /* IE 8 */                filter: alpha(opacity=70); /* IE 7 */      }";

  custom_style = '\
  /* Imagem do Slider */\
  .autolightbox-content > img {\
    border: 1px solid #DDD;\
    border: 1px solid rgba(255,255,255,0.5);\
    -webkit-border-radius: 8px;\
    -moz-border-radius: 8px;\
    -o-border-radius: 8px;\
    -ms-border-radius: 8px;\
    border-radius: 8px;\
  }\
  .autolightbox-content.loading > * { border-color:transparent; }\
  .autolightbox svg {\
    fill: grey; fill: rgba(0,0,0,0);\
    stroke: rgba(255,255,255,0.5);\
    stroke-width: 12px;\
    -ms-transition: fill 250ms ease-in-out;\
    transition: fill 250ms ease-in-out;\
  }\
  .autolightbox svg:hover { fill: white; }\
';

  loader_style = '\
  .autolightbox-loading {\
  width: 50px;\
  height: 50px;\
  /*border:  1px solid black;*/\
  }\
\
  @keyframes "rotate" {\
    to {\
      -webkit-transform: rotateZ(410deg);\
      -moz-transform: rotateZ(410deg);\
      -o-transform: rotateZ(410deg);\
      -ms-transform: rotateZ(410deg);\
      transform: rotateZ(410deg); }\
\
    /* If it starts with 50deg, a complete turn ends with 410deg */ }\
\
  @-moz-keyframes rotate {\
    to {\
      -webkit-transform: rotateZ(410deg);\
      -moz-transform: rotateZ(410deg);\
      -o-transform: rotateZ(410deg);\
      -ms-transform: rotateZ(410deg);\
      transform: rotateZ(410deg); }\
\
    /* If it starts with 50deg, a complete turn ends with 410deg */ }\
\
  @-webkit-keyframes "rotate" {\
    to {\
      -webkit-transform: rotateZ(410deg);\
      -moz-transform: rotateZ(410deg);\
      -o-transform: rotateZ(410deg);\
      -ms-transform: rotateZ(410deg);\
      transform: rotateZ(410deg); }\
\
    /* If it starts with 50deg, a complete turn ends with 410deg */ }\
\
  @-ms-keyframes "rotate" {\
    to {\
      -webkit-transform: rotateZ(410deg);\
      -moz-transform: rotateZ(410deg);\
      -o-transform: rotateZ(410deg);\
      -ms-transform: rotateZ(410deg);\
      transform: rotateZ(410deg); }\
\
    /* If it starts with 50deg, a complete turn ends with 410deg */ }\
\
  @-o-keyframes "rotate" {\
    to {\
      -webkit-transform: rotateZ(410deg);\
      -moz-transform: rotateZ(410deg);\
      -o-transform: rotateZ(410deg);\
      -ms-transform: rotateZ(410deg);\
      transform: rotateZ(410deg); }\
  }\
\
  .autolightbox-loading div {\
    position: absolute;\
    left: 7%;\
    top: 9%;\
    width: 8px;\
    height: 8px;\
    border-radius: 50%;\
    background-color: white;\
\
    -webkit-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);\
    -moz-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);\
    -ms-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);\
    -o-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);\
    animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);\
    \
    /* Starts from the middle */\
    -webkit-transform: rotateZ(50deg);\
    -moz-transform: rotateZ(50deg);\
    -o-transform: rotateZ(50deg);\
    -ms-transform: rotateZ(50deg);\
    transform: rotateZ(50deg);\
\
    -webkit-transform-origin: 275% 275%;\
    -moz-transform-origin: 275% 275%;\
    -o-transform-origin: 275% 275%;\
    -ms-transform-origin: 275% 275%;\
    transform-origin: 275% 275%;\
  }\
\
  .autolightbox-loading div:nth-child(2) {\
    -webkit-animation-delay: 0.17s;\
    -moz-animation-delay: 0.17s;\
    -ms-animation-delay: 0.17s;\
    -o-animation-delay: 0.17s;\
    animation-delay: 0.17s; }\
\
  .autolightbox-loading div:nth-child(3) {\
    -webkit-animation-delay: 0.34s;\
    -moz-animation-delay: 0.34s;\
    -ms-animation-delay: 0.34s;\
    -o-animation-delay: 0.34s;\
    animation-delay: 0.34s; }\
\
  .autolightbox-loading div:nth-child(4) {\
    -webkit-animation-delay: 0.51s;\
    -moz-animation-delay: 0.51s;\
    -ms-animation-delay: 0.51s;\
    -o-animation-delay: 0.51s;\
    animation-delay: 0.51s; }\
\
  .autolightbox-loading div:nth-child(5) {\
    -webkit-animation-delay: 0.68s;\
    -moz-animation-delay: 0.68s;\
    -ms-animation-delay: 0.68s;\
    -o-animation-delay: 0.68s;\
    animation-delay: 0.68s; }\
';

  reposition = function(arg) {
    var left, left_percent, o_h, o_w, obj, position, top, top_percent, w_h, w_w;
    position = (arg != null ? arg.position : void 0) != null ? arg.position : 'center';
    obj = (arg != null ? arg.obj : void 0) != null ? arg.obj : console.log('Erro: A função reposition precisa de um objeto para reposicionar');
    top_percent = 0.5;
    left_percent = 0.5;
    if (position !== 'center') {
      if (position === 'left') {
        left_percent = 0;
      }
    }
    if (window.innerHeight || window.innerWidth) {
      w_h = window.innerHeight;
      w_w = window.innerWidth;
    } else {
      w_h = document.documentElement.clientHeight;
      w_w = document.documentElement.clientWidth;
    }
    o_h = obj.outerHeight();
    o_w = obj.outerWidth();
    top = (w_h - o_h) * top_percent;
    left = (w_w - o_w) * left_percent;
    return obj.css({
      'top': top + 'px',
      'left': left + 'px'
    });
  };

  ImageHandler = (function() {
    function ImageHandler(obj) {
      var _this = this;
      this.description = (obj != null ? obj.description : void 0) != null ? obj.description : null;
      this.load = (obj != null ? obj.load : void 0) != null ? obj.load : null;
      this.container = (obj != null ? obj.container : void 0) != null ? obj.container : '.autolightbox-front';
      this.max_height = (obj != null ? obj.max_height : void 0) != null ? obj.max_height : void 0;
      this.max_width = (obj != null ? obj.max_width : void 0) != null ? obj.max_width : void 0;
      this.time_fade = (obj != null ? obj.time_fade : void 0) != null ? obj.time_fade : void 0;
      this.resize_anim = 'scale';
      if ((obj != null ? obj.href : void 0) != null) {
        this.img = $("<img />");
        this.img.bind('load', function() {
          _this.load({
            content: _this.img,
            description: _this.description
          });
          return _this.resize();
        }).attr('src', obj.href);
      }
    }

    ImageHandler.prototype.resize = function() {
      var c_h, c_w, container_infos, front, h_backup, i_h, i_w, image_height, image_width, l, l_backup, max_height, max_width, t, t_backup, w_backup, w_h, w_w;
      if (window.innerHeight || window.innerWidth) {
        w_h = window.innerHeight;
        w_w = window.innerWidth;
      } else {
        w_h = document.documentElement.clientHeight;
        w_w = document.documentElement.clientWidth;
      }
      c_h = this.container.outerHeight();
      c_w = this.container.outerWidth();
      i_h = this.img.outerHeight();
      i_w = this.img.outerWidth();
      this.img.addClass('invisible');
      image_height = image_width = c_h >= w_h ? (max_height = this.max_height * w_h, container_infos = c_h - i_h, image_height = max_height - container_infos, this.img.css({
        'height': image_height + 'px',
        'width': 'auto'
      })) : c_w >= w_w ? (max_width = this.max_width * w_w, container_infos = c_w - i_w, image_width = max_width - container_infos, this.img.css({
        'width': image_width + 'px',
        'height': 'auto'
      })) : void 0;
      front = this.img.closest('.autolightbox-front');
      reposition({
        position: 'center',
        obj: front
      });
      this.img.removeClass('invisible');
      switch (this.resize_anim) {
        case 'scale':
          w_backup = this.img.outerWidth();
          h_backup = this.img.outerHeight();
          front = this.img.closest('.autolightbox-front');
          t_backup = parseInt((front.css('top')).slice(0, -2));
          l_backup = parseInt((front.css('left')).slice(0, -2));
          t = t_backup + (this.img.outerHeight() / 2);
          l = l_backup + (this.img.outerWidth() / 2);
          this.img.css({
            'width': '0',
            'height': '0'
          });
          this.img.animate({
            'width': w_backup + 'px',
            'height': h_backup + 'px'
          }, this.time_fade);
          front.css({
            'top': t,
            'left': l
          });
          return front.animate({
            'top': t_backup + 'px',
            'left': l_backup + 'px'
          }, this.time_fade);
        default:
          this.img.fadeOut(0);
          return this.img.fadeIn(this.time_fade);
      }
    };

    return ImageHandler;

  })();

  DescriptionHandler = (function() {
    function DescriptionHandler(obj) {
      this.description = (obj != null ? obj.description : void 0) != null ? obj.description : '';
      this.is_on = this.description != null ? true : false;
      this.container = (obj != null ? obj.container : void 0) != null ? obj.container : void 0;
      this.group_output = (obj != null ? obj.group_output : void 0) != null ? obj.group_output : null;
      this.output();
    }

    DescriptionHandler.prototype.output = function() {
      this.container.append(this.description);
      if (this.group_output != null) {
        this.container.append('<span>' + this.group_output + '</span>');
      }
      return this.container.css('visibility', 'hidden');
    };

    return DescriptionHandler;

  })();

  GroupHandler = (function() {
    function GroupHandler(clicked) {
      this.group_handler = $('[data-lightbox]');
      this.enable = false;
      this.clicked = clicked != null ? clicked : null;
      this.groups = {};
      this.get_groups();
      this.group_item_info();
    }

    GroupHandler.prototype.get_groups = function() {
      var groups;
      groups = this.groups;
      this.group_handler.each(function() {
        var group;
        group = $(this).attr('data-lightbox');
        if (group !== '') {
          if (groups[group] === void 0) {
            groups[group] = [];
          }
          return groups[group].push($(this));
        }
      });
      if (groups.hasOwnProperty(this.clicked.attr('data-lightbox'))) {
        return this.enable = true;
      }
    };

    GroupHandler.prototype.group_item_info = function() {
      var breakLoop, elem, group, i, index, total, _i, _len, _ref, _results;
      if (this.enable) {
        _results = [];
        for (group in this.groups) {
          _ref = this.groups[group];
          for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
            elem = _ref[i];
            if (elem.is(this.clicked)) {
              index = i + 1;
              total = this.groups[group].length;
              this.output = 'Imagem ' + index + ' de ' + total;
              if (this.groups[group][i - 1] != null) {
                this.prev = this.groups[group][i - 1];
              } else {
                this.prev = null;
              }
              if (this.groups[group][i + 1] != null) {
                this.next = this.groups[group][i + 1];
              } else {
                this.next = null;
              }
              breakLoop = true;
              break;
            }
          }
          if (breakLoop) {
            break;
          } else {
            _results.push(void 0);
          }
        }
        return _results;
      } else {
        return null;
      }
    };

    return GroupHandler;

  })();

  Lightbox = (function() {
    function Lightbox() {
      this.load = __bind(this.load, this);
      var _ref, _ref1, _ref2, _ref3, _ref4;
      this.user_options = options != null ? options : null;
      this.click_holder = ((_ref = this.user_options) != null ? _ref.click_holder : void 0) ? this.user_options.click_holder : '[data-lightbox]';
      this.time_fade = ((_ref1 = this.user_options) != null ? _ref1.time_fade : void 0) ? this.user_options.time_fade : 250;
      this.max_width = ((_ref2 = this.user_options) != null ? _ref2.max_width : void 0) ? this.user_options.max_width : 0.8;
      this.max_height = ((_ref3 = this.user_options) != null ? _ref3.max_height : void 0) ? this.user_options.height : 0.8;
      this.custom_style = ((_ref4 = this.user_options) != null ? _ref4.custom_style : void 0) ? this.user_options.custom_style : false;
      this.opened = false;
      this.create_html_css();
      if (this.user_options != null) {
        this.set(this.user_options);
      }
      if ((this.custom_set_click != null) !== true) {
        this.set_click_holders();
      }
      this.set_2();
    }

    Lightbox.prototype.create_html_css = function() {
      this.lightbox = $(document.createElement('div'));
      this.lightbox_front = $(document.createElement('div'));
      this.lightbox_content = $('<div></div>');
      this.lightbox_description = $('<div></div>');
      this.lightbox_close = $(close);
      this.lightbox_prev = $(next_arrow);
      this.lightbox_next = $(next_arrow);
      this.lightbox_loading = $(loading);
      this.lightbox_back = $(document.createElement('div'));
      this.lightbox.addClass('autolightbox');
      this.lightbox_front.addClass('autolightbox-front');
      this.lightbox_close.attr({
        'class': 'autolightbox-close',
        'title': 'Fechar [Pressione Esc]'
      });
      this.lightbox_prev.attr({
        'class': 'autolightbox-prev',
        'title': 'Imagem anterior [Pressione seta esquerda]'
      });
      this.lightbox_next.attr({
        'class': 'autolightbox-next',
        'title': 'Próxima Imagem [Pressione seta direita]'
      });
      this.lightbox_loading.attr({
        'class': 'autolightbox-loading',
        'title': 'Carregando'
      });
      this.lightbox_content.addClass('autolightbox-content');
      this.lightbox_description.addClass('autolightbox-description');
      this.lightbox_back.addClass('autolightbox-back');
      this.lightbox_content.append(this.lightbox_prev, this.lightbox_next);
      this.lightbox_front.append(this.lightbox_content, this.lightbox_description, this.lightbox_close);
      this.lightbox.append(this.lightbox_front, this.lightbox_back);
      $('body').prepend(this.lightbox);
      this.lightbox.fadeOut(0);
      this.style = $('<style />');
      this.style.attr({
        'type': 'text/css'
      });
      if (this.style[0].styleSheet) {
        this.style[0].styleSheet.cssText = style_content + loader_style + custom_style;
      } else {
        this.style.append(style_content + loader_style);
        if (this.custom_style === false) {
          this.style.append(custom_style);
        }
      }
      return $('head').append(this.style);
    };

    Lightbox.prototype.set = function(obj) {
      var default_holder, id_back, id_front;
      id_front = (obj != null ? obj.id_front : void 0) != null ? obj.id_front : null;
      id_back = (obj != null ? obj.id_back : void 0) != null ? obj.id_back : null;
      if (id_front != null) {
        this.lightbox_front.attr('id', id_front);
      }
      if (id_back != null) {
        this.lightbox_back.attr('id', id_back);
      }
      if ((obj != null ? obj.time_fade : void 0) != null) {
        this.time_fade = obj.time_fade;
      }
      if ((obj != null ? obj.max_width : void 0) != null) {
        this.max_width = obj.max_width;
      }
      if ((obj != null ? obj.max_height : void 0) != null) {
        this.max_height = obj.max_height;
      }
      if ((obj != null ? obj.custom_style : void 0) != null) {
        this.custom_style = true;
        this.style.html('');
        this.style.append(style_content + loader_style);
      }
      default_holder = this.click_holder;
      if ((obj != null ? obj.click_holder : void 0) != null) {
        this.custom_set_click = true;
        this.click_holder = obj.click_holder;
        return this.set_click_holders(default_holder);
      }
    };

    Lightbox.prototype.set_2 = function() {
      var _this = this;
      return window.lightbox_options = function(obj) {
        return _this.set(obj);
      };
    };

    Lightbox.prototype.set_click_holders = function(override) {
      var _this = this;
      if (override != null) {
        $(override).unbind('click on');
      }
      $(document).on('click', this.click_holder, function(e) {
        e.preventDefault();
        return _this.open($(this));
      });
      $(this.lightbox_close).click(function() {
        return _this.close();
      });
      $(this.lightbox_back).click(function() {
        return _this.close();
      });
      return $('body').keydown(function(e) {
        if (e.keyCode === 27 || e.charCode === 27 || e.which === 27) {
          if (_this.opened === true) {
            _this.close();
          }
        }
        if (e.keyCode === 37 || e.charCode === 37 || e.which === 37) {
          if (_this.opened && _this.groups.enable && _this.groups.prev) {
            _this.open(_this.groups.prev);
          }
        }
        if (e.keyCode === 39 || e.charCode === 39 || e.which === 39) {
          if (_this.opened && _this.groups.enable && (_this.groups.next != null)) {
            return _this.open(_this.groups.next);
          }
        }
      });
    };

    Lightbox.prototype.close = function() {
      var _this = this;
      this.opened = false;
      return this.lightbox.fadeOut(this.time_fade, function() {
        _this.lightbox_content.find('img').remove();
        _this.lightbox_description.html('');
        _this.lightbox_close.fadeOut(0);
        _this.lightbox_prev.fadeOut(0);
        return _this.lightbox_next.fadeOut(0);
      });
    };

    Lightbox.prototype.open = function(clicked) {
      var description, href, is_img_link,
        _this = this;
      if (this.opened = true) {
        this.lightbox_content.find('img').remove();
        this.lightbox_description.html('');
      } else {
        this.opened = true;
      }
      this.lightbox_prev.fadeOut(0);
      this.lightbox_next.fadeOut(0);
      this.lightbox_close.fadeOut(0);
      this.lightbox.fadeIn(this.time_fade);
      this.lightbox_content.append(this.lightbox_loading);
      reposition({
        obj: this.lightbox_front
      });
      this.lightbox_content.addClass('loading');
      this.groups = new GroupHandler(clicked);
      this.lightbox_prev.unbind('click');
      this.lightbox_next.unbind('click');
      if (this.groups.prev != null) {
        this.lightbox_prev.click(function() {
          return _this.open(_this.groups.prev);
        });
      }
      if (this.groups.next != null) {
        this.lightbox_next.click(function() {
          return _this.open(_this.groups.next);
        });
      }
      href = (clicked != null ? clicked.attr('href') : void 0) ? clicked.attr('href') : null;
      if (href) {
        is_img_link = /http:\/\/(.+)(\.jpg|\.jpeg|\.png|\.bmp|\.tif|\.tiff|\.svg|\.gif)$/;
        if (is_img_link.test(href)) {
          description = '';
          if (clicked != null ? clicked.attr('title') : void 0) {
            description = clicked.attr('title');
          } else if (clicked != null ? clicked.attr('data-title') : void 0) {
            description = clicked.attr('data-title');
          }
          this.description = new DescriptionHandler({
            description: description,
            container: this.lightbox_description,
            group_output: this.groups.output
          });
          return this.img = new ImageHandler({
            load: this.load,
            container: this.lightbox_content,
            href: href,
            description: this.description,
            time_fade: this.time_fade,
            max_width: this.max_width,
            max_height: this.max_height
          });
        }
      }
    };

    Lightbox.prototype.load = function(obj) {
      var content,
        _this = this;
      content = (obj != null ? obj.content : void 0) != null ? obj.content : void 0;
      if (this.lightbox_content.find('.autolightbox-loading')) {
        this.lightbox_loading.remove();
        this.lightbox_content.removeClass('loading');
      }
      this.lightbox_content.append(content);
      return setTimeout(function() {
        if (_this.description.is_on) {
          _this.lightbox_description.fadeOut(0);
          _this.lightbox_description.css('visibility', 'visible');
          _this.lightbox_description.fadeIn(500);
        }
        if (_this.groups.enable) {
          if (_this.groups.prev != null) {
            _this.lightbox_prev.fadeIn(500);
          }
          if (_this.groups.next != null) {
            _this.lightbox_next.fadeIn(500);
          }
        }
        return _this.lightbox_close.fadeIn(500);
      }, this.time_fade);
    };

    return Lightbox;

  })();

}).call(this);
