style_content = "
      body { margin:0; padding: 0; } /* Certeza que nao vao ficar margens brancas */
      .k-lightbox { background-color: black; }
      .k-lightbox .k-front {
        position: fixed;
        z-index: 991;
      }
      .k-lightbox .k-front img { display:block; }
      .k-lightbox .k-front img.invisible { visibility: hidden; }
      .k-description {
        margin-top: 10px;
        font-size: 15px;
        line-height: 1.1em;
        color: white;
      }
      .k-description span {
        display: block;
        font-size: 0.85em;
        *color: #AAA; /* IE7 */
        opacity: 0.5; 
        filter: alpha(opacity=50); /* IE 8 */ 
      }
      .k-prev, .k-next {
        position: absolute;
        top: 50%;
        left: auto; right: 15px; /* Default k-next */
        transform: translateY(-100%); /* Default k-next */
        border:none;
        cursor:pointer;
      }
      .k-prev {
        left: 15px; right: auto;
        transform: rotate(180deg) translateY(50%);
        transform-origin: 50% 25%; 
      }
      .k-lightbox .k-close {
        display:none;
        position:absolute; 
        top: 15px; right: 15px;
        cursor:pointer;
      }
      .k-lightbox .k-back {
        width: 100%; height: 100%;
        position: fixed;
        z-index: 990;
        background: black; /* Init IE7-8 */
        background-color: rgba(0,0,0,0.7);      
        -ms-filter: \"progid:DXImageTransform.Microsoft.Alpha(Opacity=70)\"; /* IE 8 */        
        filter: alpha(opacity=70); /* IE 7 */
      }
"

custom_style = '
  /* Imagem do Slider */
  .k-content > img {
    border: 1px solid #DDD;
    border: 1px solid rgba(255,255,255,0.5);
    -webkit-border-radius: 8px;
    -moz-border-radius: 8px;
    border-radius: 8px;
  }
  .k-content.loading > * { border-color:transparent; }
  .k-lightbox svg {
    fill: grey; fill: rgba(0,0,0,0);
    stroke: rgba(255,255,255,0.5);
    stroke-width: 12px;
    -ms-transition: fill 250ms ease-in-out;
    transition: fill 250ms ease-in-out;
  }
  .k-lightbox svg:hover { fill: white; }
'

loader_style = '
  .k-loading {
  width: 50px;
  height: 50px;
  /*border:  1px solid black;*/
  }

  @keyframes "rotate" {
    to {
      -webkit-transform: rotateZ(410deg);
      -moz-transform: rotateZ(410deg);
      -o-transform: rotateZ(410deg);
      -ms-transform: rotateZ(410deg);
      transform: rotateZ(410deg); }

    /* If it starts with 50deg, a complete turn ends with 410deg */ }

  @-moz-keyframes rotate {
    to {
      -webkit-transform: rotateZ(410deg);
      -moz-transform: rotateZ(410deg);
      -o-transform: rotateZ(410deg);
      -ms-transform: rotateZ(410deg);
      transform: rotateZ(410deg); }

    /* If it starts with 50deg, a complete turn ends with 410deg */ }

  @-webkit-keyframes "rotate" {
    to {
      -webkit-transform: rotateZ(410deg);
      -moz-transform: rotateZ(410deg);
      -o-transform: rotateZ(410deg);
      -ms-transform: rotateZ(410deg);
      transform: rotateZ(410deg); }

    /* If it starts with 50deg, a complete turn ends with 410deg */ }

  @-ms-keyframes "rotate" {
    to {
      -webkit-transform: rotateZ(410deg);
      -moz-transform: rotateZ(410deg);
      -o-transform: rotateZ(410deg);
      -ms-transform: rotateZ(410deg);
      transform: rotateZ(410deg); }

    /* If it starts with 50deg, a complete turn ends with 410deg */ }

  @-o-keyframes "rotate" {
    to {
      -webkit-transform: rotateZ(410deg);
      -moz-transform: rotateZ(410deg);
      -o-transform: rotateZ(410deg);
      -ms-transform: rotateZ(410deg);
      transform: rotateZ(410deg); }
  }

  .k-loading div {
    position: absolute;
    left: 7%;
    top: 9%;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: white;

    -webkit-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);
    -moz-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);
    -ms-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);
    -o-animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);
    animation: rotate 1.3s infinite cubic-bezier(0.7, 0.3, 0.3, 0.7);
    
    /* Starts from the middle */
    -webkit-transform: rotateZ(50deg);
    -moz-transform: rotateZ(50deg);
    -o-transform: rotateZ(50deg);
    -ms-transform: rotateZ(50deg);
    transform: rotateZ(50deg);

    -webkit-transform-origin: 275% 275%;
    -moz-transform-origin: 275% 275%;
    -o-transform-origin: 275% 275%;
    -ms-transform-origin: 275% 275%;
    transform-origin: 275% 275%;
  }

  .k-loading div:nth-child(2) {
    -webkit-animation-delay: 0.12s;
    -moz-animation-delay: 0.12s;
    -ms-animation-delay: 0.12s;
    -o-animation-delay: 0.12s;
    animation-delay: 0.12s; }

  .k-loading div:nth-child(3) {
    -webkit-animation-delay: 0.24s;
    -moz-animation-delay: 0.24s;
    -ms-animation-delay: 0.24s;
    -o-animation-delay: 0.24s;
    animation-delay: 0.24s; }

  .k-loading div:nth-child(4) {
    -webkit-animation-delay: 0.36s;
    -moz-animation-delay: 0.36s;
    -ms-animation-delay: 0.36s;
    -o-animation-delay: 0.36s;
    animation-delay: 0.36s; }

  .k-loading div:nth-child(5) {
    -webkit-animation-delay: 0.48s;
    -moz-animation-delay: 0.48s;
    -ms-animation-delay: 0.48s;
    -o-animation-delay: 0.48s;
    animation-delay: 0.48s; }
'