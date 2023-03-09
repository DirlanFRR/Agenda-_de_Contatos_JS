const formContato = document.getElementById('form-contato');
const tabelaContatos = document.getElementById('tabela-contatos');
const telefoneInput = document.querySelector('input[type="tel"]');

// FUNÇÕES DE VALIDAÇÃO

function validarNome() {
    var nomeInput = document.getElementById("nome").value;
    
  
    // verifica se o nome está vazio ou nulo
    if (!nomeInput) {
      document.getElementById("mensagem").innerHTML = "O nome não pode estar vazio";
      return false;
    }

    // verifica se o nome é muito longo
    if (nomeInput.length > 50) {
      document.getElementById("mensagem").innerHTML = "O nome é muito longo";
      return false;
    }
  
    // verifica se o nome contém apenas letras, espaços e acentos
    if (/^[a-zA-ZáàâãéèêíïóôõöúçñÁÀÂÃÉÈÊÍÏÓÔÕÖÚÇÑ\s]+$/.test(nomeInput) === false) {
      document.getElementById("mensagem").innerHTML = "O nome não pode conter caracteres especiais ou números";
      return false;
    }
  
    // verifica se o nome tem espaços em branco no início ou no final
    if (nomeInput.trim() !== nomeInput) {
      document.getElementById("mensagem").innerHTML = "O nome não pode ter espaços em branco no início ou no final";
      return false;
    }

     // verifica se o nome é muito curto
  if (nomeInput.length < 20) {
    document.getElementById("mensagem").innerHTML = "O nome precisa ter pelo menos 20 letras";
    return false;
  }
  
    var nomeArray = nomeInput.split(" ");
  
    if (nomeArray.length < 2) {
      document.getElementById("mensagem").innerHTML = "O nome precisa ser completo";
      return false;
    } else {
      document.getElementById("mensagem").innerHTML = "";
      return true;
    }
    
}
  

// EVENTOS

nome.addEventListener('keyup', function(e){
  validarNome();

  })
  

formContato.addEventListener('submit', function(event) {
  event.preventDefault();

  const nomeValido = validarNome(); // adiciona essa linha para chamar a função validarNome()

  // verifica se o nome é válido
  if (!nomeValido) {
    return;
  }


  // obter os valores dos campos de nome e telefone
  const nome = document.getElementById('nome').value;
  const telefone = telefoneInput.value;

  // verifica se o telefone tem 13 dígitos
if (telefone.length !== 13) {
    document.getElementById('mensagem').textContent = 'O telefone deve ter 13 dígitos';
    return;
  } else {
    document.getElementById('mensagem').textContent = '';
  }
  
// verifica se o telefone contém traço
  if (telefone.includes('-')) {
    document.getElementById('mensagem').textContent = 'O telefone não pode conter traços';
    return;
  } else {
    document.getElementById('mensagem').textContent = '';
  }

  // verificar se o nome ou telefone já existem na tabela
  let nomeJaExiste = false;
  let telefoneJaExiste = false;
  const linhas = tabelaContatos.rows;
  for (let i = 0; i < linhas.length; i++) {
    const linha = linhas[i];
    if (linha.cells[0].textContent === nome) {
      nomeJaExiste = true;
    }
    if (linha.cells[1].textContent === telefone) {
      telefoneJaExiste = true;
    }
  }

  if (nomeJaExiste || telefoneJaExiste) {
    // se o nome ou telefone já existem, exibir uma mensagem de erro
    document.getElementById('mensagem').textContent = 'Este nome ou telefone já existe na tabela.';
    return;
  }

  // criar uma nova linha na tabela
  const novaLinha = tabelaContatos.insertRow();

  // adicionar as células com os valores do nome e telefone
  const nomeCelula = novaLinha.insertCell();
  nomeCelula.textContent = nome;

  const telefoneCelula = novaLinha.insertCell();
  telefoneCelula.textContent = telefone;

  // limpar os campos de entrada
  document.getElementById('nome').value = '';
  telefoneInput.value = '';

  // limpar a mensagem de erro
  document.getElementById('mensagem').textContent = '';
});

telefoneInput.addEventListener('input', function() {
  const valor = this.value;

  let telefone = telefoneInput.value;

  telefone = telefone.replace(/\D/g, ""); // Remove todos os caracteres não numéricos
  if (telefone.length > 2) {
    telefone = `(${telefone.substring(0, 2)})${telefone.substring(2)}`;
  }
  telefoneInput.value = telefone;

  if (valor.length > 13) {
    this.value = valor.slice(0, 13); // limita o valor a 13 caracteres
  }
  if (telefone.length < 13) { // adiciona essa verificação para validar se o telefone tem 13 dígitos
    document.getElementById('mensagem').textContent = 'O telefone deve ter 13 dígitos';
    return;
  } else {
    document.getElementById('mensagem').textContent = '';
  }
});