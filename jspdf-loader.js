// jsPDF CDN loader with fallback
(function(){
  if (window.jspdf && window.jspdf.jsPDF) return;
  if (window._loadJsPDF) return;

  function load(url){
    return new Promise(function(resolve, reject){
      var s = document.createElement('script');
      s.src = url;
      s.async = true;
      s.onload = function(){ resolve(); };
      s.onerror = function(){ reject(new Error('Falha ao carregar ' + url)); };
      document.head.appendChild(s);
    });
  }

  var cdnList = [
    'https://cdn.jsdelivr.net/npm/jspdf@2.5.1/dist/jspdf.umd.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js'
  ];

  window._loadJsPDF = (async function(){
    for (var i=0;i<cdnList.length;i++){
      try {
        await load(cdnList[i]);
        if (window.jspdf && window.jspdf.jsPDF) return window.jspdf.jsPDF;
      } catch (e) {
        // tenta próximo CDN
      }
    }
    throw new Error('jsPDF não pôde ser carregado por nenhum CDN');
  })();
})();
