style_content = "
      body { margin:0; padding: 0; }
      .k-lightbox .k-front {
        background-color: transparent; 
        padding: 0px; 
        position: fixed;
        z-index: 991;
      }
      .k-lightbox .k-front img { display:block; }
      .k-lightbox .k-front img.invisible { visibility: hidden; }
      .k-description {
        color: white;
        font-weight:normal;
        font-size: 14px;
        margin-top: 10px;
      }
      .k-lightbox .k-close {
        display:none;
        position:absolute; 
        top: 15px; right: 15px;
        cursor:pointer;
      }
      .k-lightbox .k-back {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 990;
        background: grey; background: rgba(0,0,0,0.4);
      }
"

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