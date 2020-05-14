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
 * firebase: objeto global
 * database(): metodo para acesso ao realtime database
 * ref(): url em string para referencia do caminho do banco
 */
var refCard = firebase.database().ref("card");

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
   * set(): método que cria dados na url passada
   * child(): acessa nó filho passado por parametro
   */
  //   refCard.child(card.nome).set(card).then(() => {
  //       adicionaCardATela(card);
  //     });

  /**
   * push(): cria um id unico e insere os dados dentro desse uid
   */
  refCard.push(card).then((snapshot) => {
    //adicionaCardATela(card, snapshot.key);
  });
}

/**
 * Recebe a referencia do card e exclui do banco de dados
 * @param {String} id Id do card
 */
function deletar(id) {
  var card = document.getElementById(id);

  /**
   * remove: remove o nó em que o método é utilizado recursivamente
   */
  refCard
    .child(id)
    .remove()
    .then(() => card.remove());

  /**
   * .set(null): ao setar um nó como nulo exclui esse nó do firebase
   */
  //   refCard.child(id).set(null).then(() => {
  //       card.remove();
  // });
}

/**
 * Incrementa o numero de curtidas
 * @param {String} id Id do card
 */
function curtir(id) {
  var card = document.getElementById(id);

  var countLike = card.getElementsByClassName("count-number")[0];
  var countNumber = +countLike.innerText;

  countNumber = countNumber + 1;

  // .set(): pode ser acessado diretamente o objeto que quer atualizar
  // e passar o valor atualizado ou pode-se passar o objeto completo atualizado
  refCard
    .child(id + "/curtidas")
    .set(countNumber)
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

    // .update(): recebe um objeto e atualiza apenas as propriedades enviadas
    refCard
      .child(id)
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
   * once(): retorna os dados lidos de uma url
   * snapshot: objeto retornado pela leitura
   */
  // refCard.once("value").then((snapshot) => {
  // Acessa um nó filho
  // console.log("child", snapshot.child("-M7Ij5iPSG0Cj3oLkL60").val());
  // // Checa se existe algo no snapshot
  // console.log("exists()", snapshot.exists());
  // // se existe o filho passado na url
  // console.log(
  //   "hasChild nome",
  //   snapshot.hasChild("-M7Ij5iPSG0Cj3oLkL60/nome")
  // );
  // console.log(
  //   "hasChild comentario",
  //   snapshot.hasChild("-M7Ij5iPSG0Cj3oLkL60/comentario")
  // );
  // // se existe algum filho no nó
  // console.log(
  //   "hasChildren()",
  //   snapshot.child("-M7Ij5iPSG0Cj3oLkL60").hasChildren()
  // );
  // // número de filhos no snapshot
  // console.log("numChildren", snapshot.numChildren());
  // // a chave desse snapshot/caminho
  // console.log("keySnapshot", snapshot.key);
  //   snapshot.forEach((data) => {
  //     console.log("cardValue", data.val());
  //     adicionaCardATela(data.val(), data.key);
  //   });
  // });
  /**
   * .ON
   */
  // refCard.on("value", (snapshot) => {
  //   snapshot.forEach((data) => {
  //     adicionaCardATela(data.val(), data.key);
  //   });
  // });
  // refCard.on("child_added", (snapshot) => {
  //   adicionaCardATela(snapshot.val(), snapshot.key);
  // });
  // refCard.on("child_changed", (snapshot, uid) => {
  //   console.log(snapshot.key, uid);
  // });
  // refCard.on("child_removed", (snapshot) => {
  //   console.log("child_removed", snapshot.key);
  // });

  /**
   * Ordenação
   *  E possivel utilizar apenas um metodo de ordenação por vêz
   *
   * .orderByChild('filho'): Ordenada pela propriedade filho passado como parametro
   * .orderByKey(): ordenar pela chava dos nós
   *
   * .orderByValue(): ordena pelo valor de cada proprieda dentro do nó, não vale para nós pais
   *
   */
  // refCard
  //   .child("-M7KLs5qYRhzIMmFMQmb")
  //   .orderByValue()
  //   .on("child_added", (snapshot) => {
  //     console.log(snapshot.key, snapshot.val());
  //     // adicionaCardATela(snapshot.val(), snapshot.key);
  //   });

  /**
   * WHERES / Filtros
   *  .startAt() : Traz valores a partir do valor passado por parametro
   *  .endAt(): Traz valores até o valor passado por parametro
   *  .equalTo(): Traz valores correspondentes ao parametro
   *  */

  refCard
    .orderByChild("idade")
    .equalTo(26)
    .on("child_added", (snapshot) => {
      adicionaCardATela(snapshot.val(), snapshot.key);
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
