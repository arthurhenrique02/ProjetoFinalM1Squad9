const perguntas = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;
const elementoPergunta = document.getElementById("pergunta");
const botoesResposta = document.getElementById("botoes-resposta");
const botaoProximo = document.getElementById("proximo-botao");
const quizName = document.querySelector(".quiz-name");

// ===== Adicionar perguntas =====
// adiciona um objeto contendo as keys 'pergunta' e 'respostas' a lista de perguntas
perguntas.push(
  {
    pergunta: "Qual o nome do melhor amigo de Chris?",
    respostas: [
      { texto: "Greg", acertou: true },
      { texto: "Karuzo", acertou: false },
      { texto: "Monk", acertou: false },
      { texto: "Kill Moves", acertou: false },
      { texto: "Joey", acertou: false },
    ],
  },
  {
    pergunta: "Em qual cidade a série “Everybody Hates Chris” se passa?",
    respostas: [
      { texto: "Brooklyn", acertou: false },
      { texto: "Los Angeles", acertou: false },
      { texto: "Miami", acertou: false },
      { texto: "Nova York", acertou: true },
      { texto: "Chicago", acertou: false },
    ],
  },
  {
    pergunta: "Quem é o narrador da série Everybody Hates Chris?",
    respostas: [
      { texto: "Terry Crews", acertou: false },
      { texto: "Tichina Arnold", acertou: false },
      { texto: "Tequan Richmond", acertou: false },
      { texto: "Imani Hakim", acertou: false },
      { texto: "Chris Rock", acertou: true },
    ],
  },
  {
    pergunta:
      "Qual é o nome do colégio que Chris frequenta na série durante seu High School?",
    respostas: [
      { texto: "Corleone", acertou: true },
      { texto: "Tattaglia", acertou: false },
      { texto: "Bed-Stuy Preparatory", acertou: false },
      { texto: "Brooklyn Academy", acertou: false },
      { texto: "East Flatbush Middle School", acertou: false },
    ],
  },
  {
    pergunta:
      "Quem é o valentão que sempre persegue Chris na série Everybody Hates Chris?",
    respostas: [
      { texto: "Malvo", acertou: false },
      { texto: "Risky", acertou: false },
      { texto: "Doc c", acertou: false },
      { texto: "Kill Moves", acertou: false },
      { texto: "Caruso", acertou: true },
    ],
  }
);

// Função para iniciar o questionario
function iniciarQuestionario() {
  indicePerguntaAtual = 0;
  pontuacao = 0;
  botaoProximo.innerHTML = "Próximo";
  quizName.style.display = "block";
  mostrarPergunta(
    perguntas,
    indicePerguntaAtual,
    elementoPergunta,
    botoesResposta
  );
}

// ===== Mostrar dados (perguntas e pontuação) =====
// Função para mostrar a pergunta atual
function mostrarPergunta(
  perguntas,
  indicePerguntaAtual,
  elementoPergunta,
  botoesResposta
) {
  // resetar html atual
  resetarEstado(botoesResposta, botaoProximo);
  // pegar a pergunta atual
  let perguntaAtual = perguntas[indicePerguntaAtual];
  let numeroPergunta = indicePerguntaAtual + 1;
  // alterar h2 (titulo da pergunta)
  elementoPergunta.innerHTML = numeroPergunta + ". " + perguntaAtual.pergunta;

  // criar botões de resposta
  perguntaAtual.respostas.forEach((resposta) => {
    const botao = document.createElement("button");
    botao.innerHTML = resposta.texto;
    botao.classList.add("botao");
    botoesResposta.appendChild(botao);
    if (resposta.acertou) {
      botao.dataset.acertou = resposta.acertou;
    }
    botao.addEventListener("click", (e) =>
      selecionarResposta(e, botoesResposta, botaoProximo)
    );
  });
}

// mostra a quantidade de acertos do usuário
function mostrarPontuacao(elementoPergunta, botaoProximo) {
  // esconde os botoes de resposta e botão de próximo
  resetarEstado(botoesResposta, botaoProximo);

  // mostra a pontuação
  if (pontuacao === perguntas.length) {
    elementoPergunta.innerHTML = `Parabéns! Você acertou todas as perguntas!`;
  } else {
    elementoPergunta.innerHTML = `Você Errou! Sua pontuação foi ${pontuacao} de ${perguntas.length}!`;
  }
  // centraliza o texto
  elementoPergunta.classList.add("center-text");

  // esconde o titulo/nome do quiz
  quizName.style.display = "none";

  // muda o texto do botão de próximo
  botaoProximo.innerHTML = "Jogar novamente";
  botaoProximo.style.display = "block";
}

// ===== Resetar estado da tela =====
// Esconde o botão de próximo e reseta os botoes de resposta
function resetarEstado(botoesResposta, botaoProximo) {
  botaoProximo.style.display = "none";

  while (botoesResposta.firstChild) {
    botoesResposta.removeChild(botoesResposta.firstChild);
  }
}

// ===== Selectionar respostas =====
// Função para tratar a seleção de resposta
function selecionarResposta(e, botoesResposta, botaoProximo) {
  const botaoSelecionado = e.target;
  const isCorreto = botaoSelecionado.dataset.acertou === "true";

  if (isCorreto) {
    botaoSelecionado.classList.add("acertou");
    pontuacao++;
  } else {
    botaoSelecionado.classList.add("errou");
    // Se a resposta estiver errada, mostre a pontuação e termine o jogo
    mostrarPontuacao(elementoPergunta, botaoProximo);
    return; // termina a execução da função aqui
  }
  Array.from(botoesResposta.children).forEach((botao) => {
    if (botao.dataset.acertou === "true") {
      botao.classList.add("acertou");
    }
    botao.disabled = true;
  });
  botaoProximo.style.display = "block";
}

// vai para a proxima pergunta ou mostra a pontuação do usuário
function mostrarProximaPerguntaOuPontuacao() {
  // incrementa o indice da pergunta atual
  indicePerguntaAtual++;
  // checa se não é a ultima pergunta, caso não seja mostra a proxima pergunta
  // caso contrário, mostra a pontuação
  if (indicePerguntaAtual < perguntas.length) {
    mostrarPergunta(
      perguntas,
      indicePerguntaAtual,
      elementoPergunta,
      botoesResposta
    );
  } else {
    mostrarPontuacao(elementoPergunta, botaoProximo);
  }
}

// adicionando o evento para jogar novamete ao finalizar as perguntas
// ou ir para a proxima pergunta
botaoProximo.addEventListener("click", () => {
  if (botaoProximo.innerHTML === "Jogar novamente") {
    iniciarQuestionario();
  } else if (indicePerguntaAtual < perguntas.length) {
    mostrarProximaPerguntaOuPontuacao();
  }
});

// inicializar uma pergunta
mostrarPergunta(
  perguntas,
  indicePerguntaAtual,
  elementoPergunta,
  botoesResposta
);

iniciarQuestionario();
