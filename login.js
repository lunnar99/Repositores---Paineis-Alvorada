function login() {
  const inputUser = document.getElementById('username').value.trim();
  const inputPass = document.getElementById('password').value.trim();

  // Função para aguardar o SweetAlert carregar
  function waitForSwal(callback) {
    if (window.Swal) {
      callback();
    } else {
      setTimeout(() => waitForSwal(callback), 100);
    }
  }

  // Função para mostrar sucesso e redirecionar
  function showSuccessAndRedirect(message, redirectUrl) {
    waitForSwal(() => {
      Swal.fire({
        icon: 'success',
        title: 'Bem-vindo(a)!',
        text: message,
        timer: 2000,
        showConfirmButton: false,
        didOpen: (popup) => {
          popup.style.borderRadius = '12px';
        }
      }).then(() => {
        window.location.href = redirectUrl;
      });
      // Fallback para garantir redirecionamento
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2100);
    });
  }

  // Mapeamento das lojas para as novas siglas (baseado no usuarios.txt)
  const lojaMapping = {
    'aguamineral': 'AGM',
    'araruama1': 'AR1', 
    'araruama2': 'AR2',
    'arsenal': 'ARS',
    'bacaxa1': 'BX1',
    'bacaxa2': 'BX2', 
    'botafogo': 'BOT',
    'buzios': 'BZ1',
    'cabofrio1': 'CF1',
    'cabofrio2': 'CF2',
    'casimirodeabreu': 'CAS',
    'colubande': 'CLB',
    'copacabana': 'CPC',
    'cordeirinho': 'COR',
    'iguaba': 'IGB',
    'inoa': 'INO',
    'itaborai': 'ITB',
    'jardimcatarina': 'JDC',
    'jardimesperanca': 'JDE',
    'macae1': 'MC1',
    'macae2': 'MC2',
    'mage1': 'MG1',
    'mage2': 'MG2',
    'saojosedoimbassai': 'MAR',
    'novacidade': 'NCD',
    'riobonito1': 'RB1',
    'riobonito2': 'RB2',
    'riodoouro': 'RDO',
    'maracana': 'MRC',
    'saopedrodaaldeia': 'SPD',
    'tangua': 'TAN',
    'trindade': 'TRI',
    'unamar': 'UNA'
  };

  // Login especial do ADM
  if (inputUser === "adm" && inputPass === "adm") {
    localStorage.setItem("role", "ADM");
    localStorage.setItem("user", "Administrador");
    localStorage.setItem("loginTime", Date.now());
      showSuccessAndRedirect('Carregando seu painel administrativo…', 'ADM-painel.html');
    return;
  }

  // Demais usuários → validar pelo arquivo
  fetch('usuarios.txt')
    .then(res => res.text())
    .then(data => {
      const usuarios = data.split('\n');
      let role = null;
      let userName = null;

      const valido = usuarios.some(line => {
        const [user, pass] = line.trim().split(':');
        if (user === inputUser && pass === inputPass) {
          // Verifica se é uma loja válida
          if (lojaMapping[user]) {
            role = lojaMapping[user]; // Usa a sigla mapeada
            userName = user;
            return true;
          }
        }
        return false;
      });

      if (valido) {
        localStorage.setItem("role", role);
        localStorage.setItem("user", userName);
        localStorage.setItem("loginTime", Date.now());
          showSuccessAndRedirect('Carregando seu painel…', 'main.html');
      } else {
        alert("Usuário ou senha inválidos");
      }
    })
    .catch(() => alert("Erro ao carregar usuários"));
}

// Permitir Enter para enviar o formulário e evitar duplo disparo
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      login();
    });
  }
  // foco inicial para agilizar o login
  const userInput = document.getElementById('username');
  if (userInput) userInput.focus();
});

// Permitir Enter para enviar o formulário e evitar duplo disparo
window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      login();
    });
  }
  // foco inicial para agilizar o login
  const userInput = document.getElementById('username');
  if (userInput) userInput.focus();
});
