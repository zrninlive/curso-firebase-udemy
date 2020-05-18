function loginGoogle() {
  var provider = new firebase.auth.GoogleAuthProvider();

  firebase
    .auth()
    .signInWithPopup(provider)
    .then((response) => {
      console.log("user", response.user);
      console.log("token", response.credential.accessToken);
    })
    .catch((err) => console.log(err));
}
