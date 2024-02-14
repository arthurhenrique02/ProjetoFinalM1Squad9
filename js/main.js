const perguntas = [];
let indicePerguntaAtual = 0;
let pontuacao = 0;
const elementoPergunta = document.getElementById("pergunta");
const botoesResposta = document.getElementById("botoes-resposta");
const botaoProximo = document.getElementById("proximo-botao");

perguntas.push({
    pergunta:'Qual o nome do melhor amigo de Chris?',
    respostas:[
        {texto:'Greg', acertou:true},
        {texto:'Karuzo', acertou:false},
        {texto:'Monk', acertou:false},
        {texto:'Kill Moves', acertou:false},
        {texto:'Joey', acertou:false},
    ]
});

perguntas.push({
    pergunta:'Quem é o narrador da série "Everybody Hates Chris"?',
    respostas:[
        {texto:'Terry Crews', acertou:false},
        {texto:'Tichina Arnold', acertou:false},
        {texto:'Tequan Richmond', acertou:false},
        {texto:'Imani Hakim', acertou:false},
        {texto:'Chris Rock', acertou:true},
    ]
});