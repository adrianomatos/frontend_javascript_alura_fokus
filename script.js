const html = document.querySelector("html");
const imagem = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");

const btnFoco = document.querySelector(".app__card-button--foco");
const btnCurto = document.querySelector(".app__card-button--curto");
const btnLongo = document.querySelector(".app__card-button--longo");
const todosBotoes = document.querySelectorAll(".app__card-button");

// TEMPO (recebe id do local, pega tempo definido, formata e insere na tela)
const timer = document.querySelector("#timer");
let tempoDecorridoEmSegundos = 1500; // Tempo em segundos (25min/60)
let tempoFormatado; // Fora da função se eu quiser acessar de outros locais
// FORMATAÇÃO DE DATA
function mostraTempo() {
  let tempo = new Date(tempoDecorridoEmSegundos * 1000);
  tempoFormatado = tempo.toLocaleTimeString("pt-BR", {
    minute: "2-digit",
    second: "2-digit",
  });
  timer.textContent = tempoFormatado;
}
mostraTempo();

const btnMusica = document.querySelector("#alternar-musica");
const arquivoMusica = new Audio("./sons/luna-rise-part-one.mp3");
arquivoMusica.loop = true;
const arquivoPlay = new Audio("./sons/play.wav");
const arquivoPause = new Audio("./sons/pause.mp3");
const arquivoFimTimmer = new Audio("./sons/beep.mp3");

const btnIniciarOuPausar = document.querySelector("#start-pause span");
const btnIniciarOuPausarIcon = document.querySelector("#start-pause img");

let intervaloId = null;
const btnComecar = document.querySelector("#start-pause");

// const timer = document.querySelector(".app__card-timer");

// -------------------------------- FUNÇÃO ALTERAR CONTEXTO
function alterarContexto(contexto) {
  html.setAttribute("data-contexto", contexto);
  imagem.setAttribute("src", `/imagens/${contexto}.png`);
  // TEXTO (titulo.innerHTML += adiciona novo item )
  // Usar 'textContent' no lugar de 'innerHTML' (+  rápido e seguro)
  // EXCETO quando precisar manipular tags HTML com innerHTML
  switch (contexto) {
    case "foco":
      tempoDecorridoEmSegundos = 1500;
      mostraTempo();
      titulo.innerHTML = `Otimize sua produtividade.<br> 
			<strong class="app__title-strong">Mergulhe no que importa.</strong>`;
      break;
    case "descanso-curto":
      tempoDecorridoEmSegundos = 300;
      mostraTempo();
      titulo.innerHTML = `Que tal dar uma respirada?<br> 
			<strong class="app__title-strong">Faça uma pausa curta.</strong>`;
      break;
    case "descanso-longo":
      tempoDecorridoEmSegundos = 1800;
      mostraTempo();
      titulo.innerHTML = `Hora de voltar à superfície.<br> 
			<strong class="app__title-strong">Faça uma pausa longa.</strong>`;
      break;
  }
  // Adicionando e Removendo classes active
  todosBotoes.forEach(function (contexto) {
    contexto.classList.remove("active");
  });
}

// -------------------------------- 03 BOTÕES
// Botão Foco
btnFoco.addEventListener("click", () => {
  alterarContexto("foco");
  btnFoco.classList.add("active");
});

// Botão Curto
btnCurto.addEventListener("click", () => {
  alterarContexto("descanso-curto");
  btnCurto.classList.add("active");
});

// Botão Longo
btnLongo.addEventListener("click", () => {
  alterarContexto("descanso-longo");
  btnLongo.classList.add("active");
});

// -------------------------------- INÍCIO Botão Música (Play/Pause)
btnMusica.addEventListener("change", () => {
  if (arquivoMusica.paused) {
    arquivoMusica.play();
  } else {
    arquivoMusica.pause();
  }
});

// -------------------------------- INÍCIO FUNÇÕES DE CONTROLE DO BOTÃO TIMER
// FUNCTION ZERAR
function zerar() {
  clearInterval(intervaloId);
  intervaloId = null;
}
// FUNÇÃO ACABOU O TEMPO
function acabouOTempo() {
  arquivoFimTimmer.play();
  alert("Tempo finalizado");
  zerar();
  tempoDecorridoEmSegundos = 5;
  console.clear();
}
// FUNÇÃO TIMER
const contagemRegressiva = () => {
  if (tempoDecorridoEmSegundos <= 0) {
    btnIniciarOuPausar.textContent = "Reiniciar";
    btnIniciarOuPausarIcon.setAttribute("src", "./imagens/play_arrow.png");
    acabouOTempo();
    return;
  } else {
    tempoDecorridoEmSegundos -= 1;
    mostraTempo();
    // console.log("Tempo: " + tempoFormatado);
  }
};
//  FUNÇÃO CHAMAR TIMER A CADA SEGUNDO
function iniciarOuPausar() {
  if (intervaloId) {
    arquivoPause.play();
    zerar();
    console.log("Pausa");
    btnIniciarOuPausar.textContent = "Executar";
    btnIniciarOuPausarIcon.setAttribute("src", "./imagens/play_arrow.png");
    return;
  } else {
    arquivoPlay.play();
    console.log("Play");
    intervaloId = setInterval(contagemRegressiva, 1000);
    btnIniciarOuPausar.textContent = "Parar";
    btnIniciarOuPausarIcon.setAttribute("src", "./imagens/pause.png");
  }
}
// BOTÃO COMEÇAR - INICIA CONTAGEM REGRESSIVA
btnComecar.addEventListener("click", iniciarOuPausar);
// -------------------------------- FIM FUNÇÕES DE CONTROLE DO BOTÃO TIMER

// -------------------------------- NOTAS
//
//
// SETANDO ATRIBUTOS - setAttribute
// ---------- Método manual e repetitivo
// html.setAttribute("data-contexto", "foco");
// imagem.setAttribute("src", "/imagens/foco.png");

// ---------- Método otimizado porém longo
// alterarContexto(html, "data-contexto", "foco");
// alterarContexto(imagem, "src", "/imagens/foco.png");

// ---------- Médodo otimizado e curto
// alterarContexto("foco");
// btnFoco.classList.add("active");

//
//
// EXERCÍCIO
// Inserindo elementos na tela ao click
// const app__title = document.querySelector(".app__title");
// app__title.addEventListener("click", () => {
//   app__title.innerHTML += "<p>Olá, mundo</p>";
// });

// Inserindo elementos na tela
// document.querySelector(".app__title").innerHTML += "<p>Olá, mundo</p>";

//
//
// ---------------- OUTRAS FUNCIONALIDADES DA CLASSLIST
// *** Substituindo classes
// const element = document.getElementById("meuElemento");
// element.classList.remove("classeAntiga");
// element.classList.add("classeNova");

// *** Manipulando várias classes simultaneamente
// const element = document.getElementById("meuElemento");
// element.classList.add("classe1", "classe2", "classe3");
// element.classList.remove("classe2", "classe3");

// *** Verificando se classe está presente
// document.getElementById("meuElemento").classList.containsc("minhaClasse");

// *** Verificando se a classe já estiver presente no elemento, o método a remove; caso contrário, ele a adiciona
// document.getElementById("meuElemento").classList.toggle("minhaClasse");

//
//
// ---------------- FUNCIONALIDADES DE ÁUDIO
// const audioElement = new Audio('caminho/do/arquivo-de-audio.mp3');
// audioElement.play(); // Inicia a reprodução
// audioElement.pause(); // Pausa a reprodução
// audioElement.currentTime = 10; // Move para 10 segundos no áudio
// audioElement.volume = 0.5; // Define o volume para metade (50%)

//
// ---------------- ACESSANDO DADOS COM PROPRIEADADES NO DOM
// * Propriedade parentNode: A propriedade parentNode é utilizada para acessar o nó pai de um elemento no DOM. Por meio dela, podemos navegar pela árvore do DOM em direção ao nó pai do elemento atual.

//<div id="container">
//  <p>Este é um parágrafo</p>
//</div>;*/

/*Agora, podemos usar o ‘parentNode’ para acessar o elemento pai do parágrafo:
//const paragraph = document.querySelector('p');
//const parentElement = paragraph.parentNode;
//console.log(parentElement.id); // Saída: "container" */

// * Propriedade childNodes: A propriedade childNodes é utilizada para acessar todos os nós filhos de um elemento no DOM. Ela retorna uma lista de nós, incluindo nós de texto e elementos HTML.
// Considerando o mesmo HTML do exemplo anterior, podemos usar o childNodes para obter todos os nós filhos do elemento com o ID "container":
// const container = document.getElementById('container');
// const childNodes = container.childNodes;

// console.log(childNodes.length); // Saída: 1 (o nó de texto "\n  " é considerado um nó filho)
// console.log(childNodes[0].nodeName); // Saída: "#text"
// console.log(childNodes[1].nodeName); // Saída: "P"

// * Propriedade nextElementSibling: A propriedade nextElementSibling permite acessar o próximo irmão (nó adjacente) de um elemento no DOM. Exemplo:
/* <ul>
  <li>Item 1</li>
  <li>Item 2</li>
  <li>Item 3</li>
</ul> */

//Agora, podemos usar o nextElementSibling para acessar o próximo irmão de um elemento <li>:
// const item1 = document.querySelector('li:first-child');
// const item2 = item1.nextElementSibling;
// console.log(item2.textContent); // Saída: "Item 2"

// * Propriedade previousElementSibling: A propriedade previousElementSibling é semelhante ao nextElementSibling, mas permite acessar o irmão anterior (nó adjacente) de um elemento no DOM.
//Continuando o exemplo anterior, vamos usar o previousElementSibling para acessar o irmão anterior do elemento <li> que selecionamos:
// const item3 = document.querySelector('li:last-child');
// const item2 = item3.previousElementSibling;
// console.log(item2.textContent); // Saída: "Item 2"

// * Para saber mais: OBJETO DATE - Nesta aula, aprendemos como utilizar o objeto Date para formatar minutos e segundos. Entretanto, é possível utilizar suas propriedades e métodos para mais funcionalidades, como manipular e exibir datas e horas no seu código. Vamos conferir mais formas de seu uso?
/*
Para criar uma instância do objeto ‘Date’, você pode usar uma das várias formas de construção:

Construtor sem argumentos:
const dataAtual = new Date();

Construtor com argumentos (ano, mês, dia, hora, minuto, segundo, milissegundo):
const dataEspecifica = new Date(2023, 7, 3, 12, 30, 0, 0);

Construtor com uma string que representa a data (formato padrão é "yyyy-mm-dd"):
const dateString = "2023-08-03";
const formatoDeData = new Date(dateString);

Uma vez criado um objeto Date, você pode acessar informações específicas da data e hora, como o ano, mês, dia, hora, minuto e segundo usando os métodos de acesso do objeto:

const currentDate = new Date();

const ano = currentDate.getFullYear();  		// Acessa o ano
const mês = currentDate.getMonth(); 				// Acessa o mês - Janeiro é 0, Fevereiro é 1, ..., Dezembro é 11
const dia = currentDate.getDate(); 					// Acessa o dia
const horas = currentDate.getHours(); 			// Acessa as horas 
const minutos = currentDate.getMinutes(); 	// Acessa os minutos
const segundos = currentDate.getSeconds(); 	// Acessa os segundos
const milissegundos = currentDate.getMilliseconds();  // Acessa os milissegundos 

Você também pode modificar a data e hora usando os métodos de definição:

const data = new Date();

data.setFullYear(2024);  // Define o ano
data.setMonth(10); // Define o mês
data.setDate(25); // Define o dia
data.setHours(10);  // Define as horas
data.setMinutes(30); // Define os minutos
data.setSeconds(0); // Define os segundos

Além disso, o objeto ‘Date’ também fornece vários métodos para trabalhar com datas, como comparar datas, adicionar ou subtrair períodos de tempo, obter o dia da semana, entre outros.

Lembre-se de que, dependendo do fuso horário e configurações regionais do sistema em que o código está sendo executado, os resultados podem variar. Se você precisar de mais funcionalidades e suportes a diferentes formatos de zonas de tempo, uma boa alternativa é o uso de bibliotecas de manipulação de datas, como o Moment.js ou o date-fns.
*/
