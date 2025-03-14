export async function verificarAutenticacao() {
  try {
    const token = localStorage.getItem('jwt');
    if (!token) {
      throw new Error("Token não encontrado");
    }

    const url = "URL_DO_SEU_BACK_END_NA_VERCEL/auth"; // Substitua pela URL do seu back-end

    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    });

    if (!res.ok) {      
      throw new Error(`Erro na requisição: ${res.status}`);
    }

    const data = await res.json();
    console.log('Autenticação bem-sucedida:', data);
    return true;
  } catch (error) {
    console.error(error);
    window.location.href = 'login.html';
  }
}