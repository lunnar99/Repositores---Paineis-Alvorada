// JSZip CDN loader
(function(){
  if(window.JSZip) return;
  var script = document.createElement('script');
  script.src = 'https://cdn.jsdelivr.net/npm/jszip@3.10.1/dist/jszip.min.js';
  script.onload = function(){ window.JSZip = window.JSZip || window.JSZip; };
  document.head.appendChild(script);
})();
