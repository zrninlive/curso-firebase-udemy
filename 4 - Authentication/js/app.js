function logout() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      alert("Usuário deslogou");
    });
}

document.addEventListener("DOMContentLoaded", function () {
  //instancia firebase UI
  var ui = new firebaseui.auth.AuthUI(firebase.auth());

  // configurações firebase UI
  var config = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult) {
        console.log(authResult);
        return false;
      },
    },
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.GithubAuthProvider.PROVIDER_ID,
      {
        provider: firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        defaultCountry: "BR",
      },
    ],
    signInFlow: "popup",
  };

  //Inicializa o firebase UI
  ui.start("#firebaseui-auth", config);
});
