const functions = require("firebase-functions");
const admin = require("firebase-admin");

const firebaseConfig = {
  apiKey: "AIzaSyBfdcTVriqCP3mNck2va3mreB1dsymMpX0",
  authDomain: "app-firebase-udemy.firebaseapp.com",
  databaseURL: "https://app-firebase-udemy.firebaseio.com",
  projectId: "app-firebase-udemy",
  storageBucket: "app-firebase-udemy.appspot.com",
  messagingSenderId: "738651733694",
  appId: "1:738651733694:web:60c12c1a9fb90bb31a28ef",
};

admin.initializeApp(firebaseConfig);

exports.addCard = functions.https.onRequest((request, response) => {
  let card = JSON.parse(request.body);

  admin
    .database()
    .ref("card")
    .push(card)
    .then(() => {
      response.status(200).send("Gravação realizada com sucesso");
    })
    .catch((err) => response.status(500).send(err));
});

/**
 * .onCreate - ao criar um novo dado ao nó
 * .onUpdate - ao atualizar um dado em um nó
 * .onDelete - ao excluir um dado em um nó
 * .onWrite - todas as funções anteriores
 */

exports.updateCount = functions.database
  .ref("/card/{pushId}")
  .onCreate((snapshot, context) => {
    //onCreate(snapshot, context): snapshot é o dado atual / contexto da chamada

    admin
      .database()
      .ref("card")
      .once("value")
      .then((snap) => {
        admin
          .database()
          .ref("contagem")
          .set(snap.numChildren())
          .then(() => {
            return snap.numChildren();
          });
      });
  });

exports.updateName = functions.firestore
  .document("/cards/{userId}")
  .onCreate((snapshot, context) => {
    let nome = snapshot.data().nome;

    nome = nome.toUpperCase();

    admin
      .firestore()
      .collection("cards")
      .doc(snapshot.id)
      .update({ nome })
      .then(() => {
        return nome;
      });
  });
