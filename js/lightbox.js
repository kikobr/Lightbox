(function() {
  var Lightbox, check_jQuery, jquery_solicitado, options;

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
      alert('nao');
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

  Lightbox = (function() {
    function Lightbox() {
      var _ref, _ref1;
      this.user_options = options != null ? options : null;
      this.click_holder = ((_ref = this.user_options) != null ? _ref.click : void 0) ? this.user_options.click : '[data-lightbox]';
      this.time_fade = ((_ref1 = this.user_options) != null ? _ref1.time_fade : void 0) ? this.user_options.time_fade : 250;
      this.create_html_css();
      if (this.user_options != null) {
        this.set(this.user_options);
      }
      this.set_click_holders();
    }

    Lightbox.prototype.create_html_css = function() {
      var style, style_content;
      this.lightbox = $(document.createElement('div'));
      this.lightbox_front = $(document.createElement('div'));
      this.lightbox_back = $(document.createElement('div'));
      this.lightbox.addClass('lightbox');
      this.lightbox_front.addClass('front');
      this.lightbox_back.addClass('back');
      this.lightbox.append(this.lightbox_front, this.lightbox_back);
      $('body').prepend(this.lightbox);
      this.lightbox.fadeOut(0);
      style = $(document.createElement('style'));
      style.attr('type', 'text/css');
      style_content = "      body { margin:0; padding: 0; }      .lightbox .front {         background-color: #FFFFFF;         padding: 10px;         position: absolute;        z-index: 991;      }      .lightbox .back {        width: 100%;        height: 100%;        position: fixed;        z-index: 990;        background: grey; background: rgba(0,0,0,0.4);      }    ";
      style.html(style_content);
      return $('head').append(style);
    };

    Lightbox.prototype.set = function(obj) {
      var id_back, id_front;
      id_front = (obj != null ? obj.id_front : void 0) != null ? obj.id_front : null;
      id_back = (obj != null ? obj.id_back : void 0) != null ? obj.id_back : null;
      if (id_front != null) {
        this.lightbox_front.attr('id', id_front);
      }
      if (id_back != null) {
        return this.lightbox_back.attr('id', id_back);
      }
    };

    Lightbox.prototype.set_click_holders = function() {
      var _this = this;
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
      var img_link;
      img_link = (clicked != null ? clicked.attr('href') : void 0) != null ? clicked.attr('href') : null;
      return this.lightbox.fadeIn(this.time_fade);
    };

    return Lightbox;

  })();

}).call(this);
