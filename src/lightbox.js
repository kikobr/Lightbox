// Generated by CoffeeScript 1.6.3
(function() {
  var script;

  if (window.jQuery !== true) {
    script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.setAttribute('src', 'http://code.jquery.com/jquery-latest.min.js');
    (document.getElementsByTagName('head'))[0].appendChild(script);
  }

  $(function() {
    var Lightbox, lightbox;
    Lightbox = (function() {
      function Lightbox() {
        this.config();
      }

      Lightbox.prototype.config = function(obj) {
        var nome;
        nome = (obj != null ? obj.nome : void 0) != null ? obj.nome : 'Nome-padrão';
        return alert(nome);
      };

      return Lightbox;

    })();
    lightbox = new Lightbox();
    return window.lightbox = lightbox;
  });

}).call(this);