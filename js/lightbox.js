(function() {
  var DescriptionHandler, ImageHandler, Lightbox, check_jQuery, close, jquery_solicitado, options, reposition,
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
		<polygon id="x-mark-icon" points="438.393,374.595 319.757,255.977 438.378,137.348 374.595,73.607 255.995,192.225 137.375,73.622 73.607,137.352 192.246,255.983 73.622,374.625 137.352,438.393 256.002,319.734 374.652,438.378 "/>\
		</svg>';

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
    w_h = window.innerHeight;
    w_w = window.innerWidth;
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
      this.container = (obj != null ? obj.container : void 0) != null ? obj.container : '.k-lightbox .k-front';
      this.max_height = (obj != null ? obj.max_height : void 0) != null ? obj.max_height : void 0;
      this.max_width = (obj != null ? obj.max_width : void 0) != null ? obj.max_width : void 0;
      this.time_fade = (obj != null ? obj.time_fade : void 0) != null ? obj.time_fade : void 0;
      this.resize_anim = 'scale';
      if ((obj != null ? obj.href : void 0) != null) {
        this.img = $("<img />").attr({
          'src': obj.href,
          'style': '/*height: 500px; width: 2500px;*/'
        });
        this.img.addClass('.k-img');
        this.img.load(function() {
          _this.load({
            content: _this.img,
            description: _this.description
          });
          return _this.resize();
        });
      }
    }

    ImageHandler.prototype.resize = function() {
      var c_h, c_w, container_infos, front, h_backup, i_h, i_w, image_height, image_width, l, l_backup, max_height, max_width, t, t_backup, w_backup, w_h, w_w;
      w_h = window.innerHeight;
      w_w = window.innerWidth;
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
      front = this.img.closest('.k-front');
      reposition({
        position: 'center',
        obj: front
      });
      this.img.removeClass('invisible');
      switch (this.resize_anim) {
        case 'scale':
          w_backup = this.img.outerWidth();
          h_backup = this.img.outerHeight();
          front = this.img.closest('.k-front');
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
      this.output();
    }

    DescriptionHandler.prototype.output = function() {
      this.container.append(this.description);
      return this.container.css('visibility', 'hidden');
    };

    return DescriptionHandler;

  })();

  Lightbox = (function() {
    function Lightbox() {
      this.load = __bind(this.load, this);
      var _ref, _ref1, _ref2, _ref3;
      this.user_options = options != null ? options : null;
      this.click_holder = ((_ref = this.user_options) != null ? _ref.click : void 0) ? this.user_options.click : '[data-lightbox]';
      this.time_fade = ((_ref1 = this.user_options) != null ? _ref1.time_fade : void 0) ? this.user_options.time_fade : 250;
      this.max_width = ((_ref2 = this.user_options) != null ? _ref2.max_width : void 0) ? this.user_options.max_width : 0.8;
      this.max_height = ((_ref3 = this.user_options) != null ? _ref3.max_height : void 0) ? this.user_options.height : 0.85;
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
      var style, style_content;
      this.lightbox = $(document.createElement('div'));
      this.lightbox_front = $(document.createElement('div'));
      this.lightbox_content = $('<div></div>');
      this.lightbox_description = $('<div></div>');
      this.lightbox_close = $(close);
      this.lightbox_back = $(document.createElement('div'));
      this.lightbox.addClass('k-lightbox');
      this.lightbox_front.addClass('k-front');
      this.lightbox_close.attr({
        'class': 'k-close',
        'title': 'Fechar'
      });
      this.lightbox_content.addClass('k-content');
      this.lightbox_description.addClass('k-description');
      this.lightbox_back.addClass('k-back');
      this.lightbox_front.append(this.lightbox_content, this.lightbox_description, this.lightbox_close);
      this.lightbox.append(this.lightbox_front, this.lightbox_back);
      $('body').prepend(this.lightbox);
      this.lightbox.fadeOut(0);
      style = $(document.createElement('style'));
      style.attr('type', 'text/css');
      style_content = "      body { margin:0; padding: 0; }      .k-lightbox .k-front {         background-color: transparent;         padding: 0px;         position: fixed;        z-index: 991;      }      .k-lightbox .k-front img { display:block; }      .k-lightbox .k-front img.invisible { visibility: hidden; }      .k-description {        color: white;        font-size: 13px;        margin-top: 10px;        -moz-box-sizing:border-box;        border-bottom-left-radius: 8px;        border-bottom-right-radius: 8px;      }      .k-lightbox .k-close {        display:none;        position:absolute;         top: 15px; right: 15px;        cursor:pointer;      }      .k-lightbox .k-back {        width: 100%;        height: 100%;        position: fixed;        z-index: 990;        background: grey; background: rgba(0,0,0,0.4);      }    ";
      style.html(style_content);
      return $('head').append(style);
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
        $(override).unbind('click');
      }
      $(this.click_holder).click(function(e) {
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
            return _this.close();
          }
        }
      });
    };

    Lightbox.prototype.close = function() {
      this.opened = false;
      this.lightbox_content.html('');
      this.lightbox_description.html('');
      this.lightbox_close.fadeOut(0);
      return this.lightbox.fadeOut(this.time_fade);
    };

    Lightbox.prototype.open = function(clicked) {
      var description, href, is_img_link;
      this.opened = true;
      this.lightbox.fadeIn(this.time_fade);
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
            container: this.lightbox_description
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
      this.lightbox_content.append(content);
      return setTimeout(function() {
        if (_this.description.is_on) {
          _this.lightbox_description.fadeOut(0);
          _this.lightbox_description.css('visibility', 'visible');
          _this.lightbox_description.fadeIn(500);
        }
        _this.lightbox_close.fadeOut(0);
        return _this.lightbox_close.fadeIn(500);
      }, this.time_fade);
    };

    return Lightbox;

  })();

}).call(this);
