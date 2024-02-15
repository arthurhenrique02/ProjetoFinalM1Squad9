const perguntas = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;
const elementoPergunta = document.getElementById("pergunta");
const botoesResposta = document.getElementById("botoes-resposta");
const botaoProximo = document.getElementById("proximo-botao");

// ===== Adicionar perguntas =====
// adiciona um objeto contendo as keys 'pergunta' e 'respostas' a lista de perguntas
perguntas.push({
  pergunta: "Qual o nome do melhor amigo de Chris?",
  respostas: [
    { texto: "Greg", acertou: true },
    { texto: "Karuzo", acertou: false },
    { texto: "Monk", acertou: false },
    { texto: "Kill Moves", acertou: false },
    { texto: "Joey", acertou: false },
  ],
});

perguntas.push({
  pergunta: 'Quem é o narrador da série "Everybody Hates Chris"?',
  respostas: [
    { texto: "Terry Crews", acertou: false },
    { texto: "Tichina Arnold", acertou: false },
    { texto: "Tequan Richmond", acertou: false },
    { texto: "Imani Hakim", acertou: false },
    { texto: "Chris Rock", acertou: true },
  ],
});

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
  }
  Array.from(botoesResposta.children).forEach((botao) => {
    if (botao.dataset.acertou === "true") {
      botao.classList.add("acertou");
    }
    botao.disabled = true;
  });
  botaoProximo.style.display = "block";
}

// vai para a proxima pergunta
function lidarComBotaoProximo() {
  // incrementa o indice da pergunta atual
  indicePerguntaAtual++;
  // checa se é a ultima pergunta
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

// inicializar uma pergunta
mostrarPergunta(
  perguntas,
  indicePerguntaAtual,
  elementoPergunta,
  botoesResposta
);
