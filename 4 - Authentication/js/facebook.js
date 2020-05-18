function loginFacebook() {
  //Cria nova instancia provedor de login facebook
  var provider = new firebase.auth.FacebookAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      console.log("user", response.user);
      console.log("token", response.credential.accessToken);
    })
    .catch((err) => console.log(err));
}
