function login() {
  const inputUser = document.getElementById('username').value.trim();
  const inputPass = document.getElementById('password').value.trim();

  // Login especial do ADM
  if (inputUser === "adm" && inputPass === "adm") {
    localStorage.setItem("role", "ADM");
    localStorage.setItem("user", "Administrador");
    localStorage.setItem("loginTime", Date.now());
    const go = () => { window.location.href = "ADM-painel.html"; };
    if (window.Swal) {
      Swal.fire({
        icon: 'success',
        title: 'Bem-vindo(a)!',
        text: 'Carregando seu painel…',
        timer: 2000,
        showConfirmButton: false,
        didOpen: (popup) => {
          popup.style.borderRadius = '12px';
        }
      }).then(go);
      setTimeout(go, 2100); // fallback se o then não disparar (timer autoclosed)
    } else {
      const overlay = document.getElementById('loginOverlay');
      if (overlay) overlay.classList.add('show');
      setTimeout(go, 2000);
    }
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
          role = pass.substring(0, 3); // BUZ, ARA, etc
          userName = user;
          return true;
        }
        return false;
      });

      if (valido) {
        localStorage.setItem("role", role);
        localStorage.setItem("user", userName);
        localStorage.setItem("loginTime", Date.now());
        const go = () => { window.location.href = "main.html"; };
        if (window.Swal) {
          Swal.fire({
            icon: 'success',
            title: 'Bem-vindo(a)!',
            text: 'Carregando seu painel…',
            timer: 2000,
            showConfirmButton: false,
            didOpen: (popup) => {
              popup.style.borderRadius = '12px';
            }
          }).then(go);
          setTimeout(go, 2100);
        } else {
          const overlay = document.getElementById('loginOverlay');
          if (overlay) overlay.classList.add('show');
          setTimeout(go, 2000);
        }
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
