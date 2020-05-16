/**
 * Váriaveis usadas durante o desenvolvimento
 */
var CARD_CONTAINER = document.getElementsByClassName("card-container")[0];
var NOMES = [
  "Anderson",
  "Beatriz",
  "Caio",
  "Daniela",
  "Everton",
  "Fabiana",
  "Gabriel",
  "Hortencia",
  "Igor",
  "Joana",
];

/**
 * Botão para cria um card no card-contaier
 */
function criarCard() {
  var card = {
    nome: NOMES[Math.floor(Math.random() * NOMES.length) - 1],
    idade: Math.floor(Math.random() * 22 + 18),
    curtidas: 0,
  };

  /**
   * .collection('colecao'): referencia a coleção
   * .doc(): referencia o documento
   * .set({dados}) : insere objeto passado por parametro
   */
  //   firebase
  //     .firestore()
  //     .collection("cards")
  //     .doc("1")
  //     .set(card)
  //     .then(() => {
  //       adicionaCardATela(card, 1);
  //     });

  /**
   * .add({dados}): adiciona os dados dentro de um UID gerado automaticamente
   */
  firebase
    .firestore()
    .collection("cards")
    .add(card)
    .then(() => {
      adicionaCardATela(card, 1);
    });
}

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {}

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
  var card = document.getElementById(id);

  var countLike = card.getElementsByClassName("count-number")[0];
  var countNumber = +countLike.innerText;

  countNumber = countNumber + 1;

  //.update({dados}): atualiza todos os dados passados no parametro
  firebase
    .firestore()
    .collection("cards")
    .doc(id)
    .update({ curtidas: countNumber })
    .then(() => {
      countLike.innerText = countNumber;
    });
}

/**
 * Decrementa o numero de curtidas
 * @param {String} id Id do card
 */
function descurtir(id) {
  var card = document.getElementById(id);

  var countLike = card.getElementsByClassName("count-number")[0];
  var countNumber = +countLike.innerText;

  if (countNumber > 0) {
    countNumber = countNumber - 1;
    //.update({dados}): atualiza todos os dados passados no parametro
    firebase
      .firestore()
      .collection("cards")
      .doc(id)
      .update({ curtidas: countNumber })
      .then(() => {
        countLike.innerText = countNumber;
      });
  }
}

/**
 * Espera o evento de que a DOM está pronta para executar algo
 */
document.addEventListener("DOMContentLoaded", function () {
  /**
   * .GET(): busca resultados apenas uma vez;
   */
  firebase
    .firestore()
    .collection("cards")
    .get()
    .then((snapshot) => {
      // snapshot.docs(): Os documentos dentro da collection, retorna um objeto
      // snapshot.empty: retorna um boolean se o snapshot estiver vazio
      // snapshot.metadata: Metadados da coleção
      // snapshot.query: Retorna toda a query utilizada no GET
      // snapshot.size: Número de documentos dentro da coleção

      // snapshot.docChanges: Retorna um array com as mudanças que a coleção
      // sofreu desde a ultima leitura

      snapshot.docs.forEach((card) => {
        //card.data(): Retorna os dados do meu documento
        //card.id: Retorna id do documento
        //card.isEqual(): retorna um boolean caso o documento passado seja
        //igual ao documento utilizado (DOCS e collection)
        //adicionaCardATela(card.data(), card.id);
      });
    });

  /**
   * .onSnapshot(): Observando em tempo real
   */

  firebase
    .firestore()
    .collection("cards")
    .onSnapshot((snapshot) => {
      //snapshot.docs.forEach(): Tras todos os dados novamente nas mudanças

      // Traz todos os dados com o evento added na primeira chamada e depois
      // Traz apenas os novos documentos ou documentos que sofrearam alterações
      snapshot.docChanges().forEach((card) => {
        if (card.type === "added") {
          adicionaCardATela(card.doc.data(), card.doc.id);
        }

        if (card.type === "modified") {
          console.log("modified");
        }

        if (card.type === "removed") {
          console.log("removed");
        }
      });
    });
});

/**
 * Adiciona card na tela
 * @param {Object} informacao Objeto contendo dados do card
 * @param {String} id UID do objeto inserido/consultado
 */
function adicionaCardATela(informacao, id) {
  /**
   * HEADER DO CARD
   */
  let header = document.createElement("h2");
  header.innerText = informacao.nome;
  header.classList.add("card-title");
  // ===================================

  /**
   * CONTENT DO CARD
   */
  let content = document.createElement("p");
  content.classList.add("card-text");
  content.innerText = informacao.idade + " anos.";
  // ===================================

  /**
   * BOTÕES DO CARD
   */
  let inner = document.createElement("div");
  inner.classList.add("row");
  // Botão adicionar
  let button_add = document.createElement("button");
  button_add.classList.add("btn", "btn-link", "col-3");
  button_add.setAttribute("onclick", "curtir('" + id + "')");
  button_add.innerText = "+";
  inner.appendChild(button_add);

  // Contador de curtidas
  let counter = document.createElement("span");
  counter.innerHTML = informacao.curtidas;
  counter.classList.add("col-3", "text-center", "count-number");
  inner.appendChild(counter);

  // Botão de subtrair
  let button_sub = document.createElement("button");
  button_sub.classList.add("btn", "btn-link", "col-3");
  button_sub.setAttribute("onclick", "descurtir('" + id + "')");
  button_sub.innerText = "-";
  inner.appendChild(button_sub);
  // ===================================

  // Botão de excluir
  let button_del = document.createElement("button");
  button_del.classList.add("btn", "btn-danger", "col-3");
  button_del.setAttribute("onclick", "deletar('" + id + "')");
  button_del.innerText = "x";
  inner.appendChild(button_del);
  // ===================================

  /**
   * CARD
   */
  let card = document.createElement("div");
  card.classList.add("card");
  card.id = id;
  let card_body = document.createElement("div");
  card_body.classList.add("card-body");
  // ===================================

  // popula card
  card_body.appendChild(header);
  card_body.appendChild(content);
  card_body.appendChild(inner);
  card.appendChild(card_body);

  // insere no container
  CARD_CONTAINER.appendChild(card);
}
