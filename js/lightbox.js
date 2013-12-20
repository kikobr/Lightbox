(function() {
  var ImageHandler, Lightbox, check_jQuery, jquery_solicitado, options, reposition;

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

  reposition = function(arg) {
    var lef_percent, left, left_percent, o_h, o_w, obj, position, top, top_percent, w_h, w_w;
    position = (arg != null ? arg.position : void 0) != null ? arg.position : 'center';
    obj = (arg != null ? arg.obj : void 0) != null ? arg.obj : console.log('Erro: A função reposition precisa de um objeto para reposicionar');
    top_percent = 0.5;
    left_percent = 0.5;
    if (position !== 'center') {
      if (position === 'left') {
        lef_percent = 0.1;
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
      this.container = (obj != null ? obj.container : void 0) != null ? obj.container : '.k-lightbox .front';
      this.max_height = (obj != null ? obj.max_height : void 0) != null ? obj.max_height : void 0;
      this.max_width = (obj != null ? obj.max_width : void 0) != null ? obj.max_width : void 0;
      this.time_fade = (obj != null ? obj.time_fade : void 0) != null ? obj.time_fade : void 0;
      if ((obj != null ? obj.href : void 0) != null) {
        this.img = $("<img />").attr({
          'src': obj.href,
          'style': '/*height: 500px; width: 2500px;*/'
        });
        this.img.load(function() {
          _this.append();
          return _this.resize();
        });
      }
    }

    ImageHandler.prototype.resize = function() {
      var c_h, c_w, container_infos, front, i_h, i_w, image_height, image_width, max_height, max_width, w_h, w_w;
      w_h = window.innerHeight;
      w_w = window.innerWidth;
      c_h = this.container.outerHeight();
      c_w = this.container.outerWidth();
      i_h = this.img.outerHeight();
      i_w = this.img.outerWidth();
      this.img.addClass('invisible');
      if (c_h >= w_h) {
        max_height = this.max_height * w_h;
        container_infos = c_h - i_h;
        image_height = max_height - container_infos;
        this.img.css({
          'height': image_height + 'px',
          'width': 'auto'
        });
      } else if (c_w >= w_w) {
        max_width = this.max_width * w_w;
        container_infos = c_w - i_w;
        image_width = max_width - container_infos;
        this.img.css({
          'width': image_width + 'px',
          'height': 'auto'
        });
      }
      front = this.img.closest('.front');
      reposition({
        position: 'center',
        obj: front
      });
      this.img.removeClass('invisible');
      this.img.fadeOut(0);
      return this.img.fadeIn(this.time_fade);
    };

    ImageHandler.prototype.append = function() {
      this.container.html('');
      return this.container.append(this.img);
    };

    return ImageHandler;

  })();

  Lightbox = (function() {
    function Lightbox() {
      var _ref, _ref1, _ref2, _ref3;
      this.user_options = options != null ? options : null;
      this.click_holder = ((_ref = this.user_options) != null ? _ref.click : void 0) ? this.user_options.click : '[data-lightbox]';
      this.time_fade = ((_ref1 = this.user_options) != null ? _ref1.time_fade : void 0) ? this.user_options.time_fade : 250;
      this.max_width = ((_ref2 = this.user_options) != null ? _ref2.max_width : void 0) ? this.user_options.max_width : 0.8;
      this.max_height = ((_ref3 = this.user_options) != null ? _ref3.max_height : void 0) ? this.user_options.height : 0.85;
      this.create_html_css();
      if (this.user_options != null) {
        this.set(this.user_options);
      }
      this.set_click_holders();
      this.set_2();
    }

    Lightbox.prototype.create_html_css = function() {
      var style, style_content;
      this.lightbox = $(document.createElement('div'));
      this.lightbox_front = $(document.createElement('div'));
      this.lightbox_back = $(document.createElement('div'));
      this.lightbox.addClass('k-lightbox');
      this.lightbox_front.addClass('front');
      this.lightbox_back.addClass('back');
      this.lightbox.append(this.lightbox_front, this.lightbox_back);
      $('body').prepend(this.lightbox);
      this.lightbox.fadeOut(0);
      style = $(document.createElement('style'));
      style.attr('type', 'text/css');
      style_content = "      body { margin:0; padding: 0; }      .k-lightbox .front {         background-color: transparent;         padding: 0px;         position: fixed;        z-index: 991;      }      .k-lightbox .front img { display:block; }      .k-lightbox .front img.invisible { visibility: hidden; }      .k-lightbox .back {        width: 100%;        height: 100%;        position: fixed;        z-index: 990;        background: grey; background: rgba(0,0,0,0.4);      }    ";
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
      return $(this.lightbox_back).click(function() {
        return _this.close();
      });
    };

    Lightbox.prototype.close = function() {
      return this.lightbox.fadeOut(this.time_fade);
    };

    Lightbox.prototype.open = function(clicked) {
      var href, img;
      this.lightbox.fadeIn(this.time_fade);
      href = (clicked != null ? clicked.attr('href') : void 0) != null ? clicked.attr('href') : null;
      return img = new ImageHandler({
        container: this.lightbox_front,
        href: href,
        time_fade: this.time_fade,
        max_width: this.max_width,
        max_height: this.max_height
      });
    };

    return Lightbox;

  })();

}).call(this);
