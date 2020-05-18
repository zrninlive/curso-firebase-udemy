var currentUser;

/**
 * Função para cadastro com email e senha
 */
function createLogin() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, senha)
    .then((user) => {
      console.log("Usuário", user);
    });
}

/**
 * Função para login
 */
function loginEmail() {
  var email = document.getElementById("email").value;
  var senha = document.getElementById("senha").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, senha)
    .then((user) => {
      console.log("Usuário logado", user);
    })
    .catch((err) => console.log(err));
}

/**
 * Listener de dom ready
 */
document.addEventListener("DOMContentLoaded", function () {
  //Observa se há um usuário e mudanças na autênticação / login ou logout
  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      console.log("user logged");
      console.log(user);

      //Mudando o idioma do firebase;
      firebase.auth().languageCode = "pt";

      //Muda o idioma baseado no dispositivo
      firebase.auth().useDeviceLanguage();

      if (!user.emailVerified) {
        // Envia um e-mail para o usuário verificar a conta dele
        // user.sendEmailVerification().then(() => {
        //   alert("Email de verificação inválido");
        // });
      }

      //Envia um e-mail para troca de senha
      // firebase
      //   .auth()
      //   .sendPasswordResetEmail(user.email)
      //   .then(() => {
      //     alert("email enviado para resetar senha");
      //   });
    } else {
      console.log("user not logged");
    }
  });

  currentUser = firebase.auth().currentUser;

  if (currentUser) {
    console.log("currentUser", currentUser);
    //Metodos para update do usuário criado no auth()
    currentUser.updateProfile({
      displayName: "Christian Oliveira",
      photoURL:
        "https://scontent.fsod6-1.fna.fbcdn.net/v/t1.0-9/94887555_2937651059683524_8774660912062660608_n.jpg?_nc_cat=104&_nc_sid=85a577&_nc_ohc=sPt3st8nMjsAX9-Zxgh&_nc_ht=scontent.fsod6-1.fna&oh=6dff001fdc54951c19882557371dd392&oe=5EE605A8",
    });

    // currentUser.updateEmail("christian.soliveira@outlook.com");
    // currentUser.updatePassword("123456");
    // currentUser.updatePhoneNumber("+5511312312312");
  }
});

function deleteUser() {
  console.log("deleteUser");

  if (firebase.auth().currentUser) {
    console.log("deleting");

    firebase
      .auth()
      .currentUser.delete()
      .then(() => {
        alert("usuário excluido");
      });
  }
}
