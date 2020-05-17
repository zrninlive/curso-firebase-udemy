/**
 * Variáveis com referencias dos inputs
 */
var fileInput = document.getElementById("file-input");
var stringInput = document.getElementById("string-input");

/**
 * Referencia para o storage do firebase criando uma pasta com o nome de arquivos
 */

var ref = firebase.storage().ref("arquivos");
var uploadTask;
/**
 * Metodo que observa mudanças no input de arquivo
 */
fileInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  // Cria um id unico no firebase, sem inserir nenhum registro
  var uid = firebase.database().ref().push().key;
  /**
   * .child(nome): Vai acessar o caminho para inserir o arquivo
   * .put(arquivo): Vai inserir o arquivo
   */

  // ref
  //   .child(uid)
  //   .put(arquivo, {
  //     customMetadata: {
  //       nome: "Curriculo",
  //     },
  //   })
  //   .then((snapshot) => {
  //     console.log("snapshot", snapshot);

  //     /**
  //      * .getDownloadUrl(): retornaa a url para download/apresentação desse arquivo enviado.
  //      */
  //     ref
  //       .child(uid)
  //       .getDownloadURL()
  //       .then((url) => {
  //         console.log(url);
  //       });

  /**
   * .getMetaData() : retorna os metadados do arquivo inserido
   */

  //   ref
  //     .child("uid")
  //     .getMetadata()
  //     .then((metadata) => {
  //       console.log(metadata);
  //     });
  // });

  // ref
  //   .child("cv")
  //   .put(arquivo, {
  //     customMetadata: {
  //       nome: "Curriculo",
  //       descricao: "Curriculo Atualizado",
  //     },
  //   })
  //   .then((snapshot) => {
  //     console.log(snapshot);
  //   });

  // Atribue a tarefa de upload a variavel uploadTask, e executa essa tarefa ao rodar PUT
  uploadTask = ref.child(uid).put(arquivo);

  uploadTask.on(
    "state_changed",
    (upload) => {
      console.log("Mudou o estado", upload);

      //state pode ser running, paused, success
      if (upload.state === "running") {
        var progress = Math.round(
          (upload.bytesTransferred / upload.totalBytes) * 100
        );

        console.log(`${progress}%`);
      }
    },
    (err) => {
      console.log("Ocorreu um erro", err);
    },
    () => {
      console.log("Complete task!");

      ref
        .child(uid)
        .getDownloadURL()
        .then((url) => {
          console.log(url);
        });
    }
  );

  // uploadTask
  //   .then((snapshot) => {
  //     console.log(snapshot);
  //   })
  //   .catch((err) => {
  //     // Cancelamento da tarefa
  //     console.log("error", err);
  //   });
};

/**
 * Metodo que observa mudanças no input de string
 */
stringInput.onchange = function (event) {
  var arquivo = event.target.files[0];

  const reader = new FileReader();
  reader.readAsDataURL(arquivo);

  reader.onload = function () {
    const [, base64] = reader.result.split("base64,");

    /**
     * .putString(string, formato, metadados) - Salva uma string no firebase passando formato de imagem
     */
    ref
      .child("imagem")
      .putString(base64, "base64", {
        contentType: "image/png",
      })
      .then((snapshot) => {
        console.log(snapshot);
        ref
          .child("imagem")
          .getDownloadURL()
          .then((url) => {
            console.log(url);
          });
      });
  };
};

pause = function () {
  uploadTask.pause();
  console.log("stopped task");
};

continuar = function () {
  uploadTask.resume();
  console.log("starting task");
};

cancel = function () {
  uploadTask.cancel();
  console.log("cancelling task");
};

remove = function () {
  ref
    .child("arquivo")
    .delete()
    .then(() => {
      console.log("removed file");
    })
    .catch((err) => {
      console.log("Error", err);
    });
};
