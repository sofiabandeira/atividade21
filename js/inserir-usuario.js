import { verificarAutenticacao } from './autorizar.js';

(async () => {
  const autenticado = await verificarAutenticacao();
  const overlay = document.getElementById('loading-overlay');
  const conteudo = document.getElementById('conteudo-protegido');

  if (autenticado) {
    overlay.remove(); // Remove o overlay
    conteudo.style.display = 'block'; // Mostra o conteúdo
  }
})();

const botaoSalvar = document.getElementById('submit');
botaoSalvar.addEventListener('click', inserirUsuario);

const url = "URL_DO_SEU_BACK_END/usuario";
const token = localStorage.getItem('jwt');

async function inserirUsuario(e) {
  e.preventDefault();
  try {
    const dados = {
      nome: document.getElementById('nome').value,
      email: document.getElementById('email').value,
      senha: document.getElementById('senha').value
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      },
      body: JSON.stringify(dados)
    });

    if (!response.ok) {
      throw new Error("Erro na requisição: " + response.status);
    }

    const data = await response.json();
    console.log(data);
    alert("Usuário inserido com sucesso!");

  } catch (error) {
    console.error("Erro:", error);
    alert("Usuário não inserido");
  }
}