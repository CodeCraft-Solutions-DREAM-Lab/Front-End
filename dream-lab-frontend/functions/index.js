/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
const {format} = require("date-fns");
const {es} = require("date-fns/locale");
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.readAnuncios = onRequest(async (req, res) => {
  try {
    // Accede a la instancia de Firestore
    // const firestore = getFirestore();

    // Obtiene todos los documentos de la colección "AnunciosVideowall"
    const querySnapshot = await getFirestore()
        .collection("AnunciosVideowall")
        .get();
    console.log("QuerySnapshot:", querySnapshot.docs);

    // Array para almacenar los documentos formateados
    const anuncios = [];

    // Itera sobre los documentos obtenidos
    querySnapshot.forEach((doc) => {
      console.log("Documento encontrado:", doc.id);
      // Obtiene los datos del documento
      const data = doc.data();
      // Formatea los campos fecha, horaFin y horaInicio
      // Formatea la fecha sin el día de la semana
      const fechaFormatted = format(data.fecha.toDate(), "PPPP", {locale: es});
      const fecha = fechaFormatted.replace(/^.*, /, "");

      const horaFin = format(data.horaFin.toDate(), "p", {locale: es});
      const horaInicio = format(data.horaInicio.toDate(), "p", {locale: es});
      // Formatea los campos según lo especificado
      const anuncio = {
        fecha: fecha,
        horaFin: horaFin,
        horaInicio: horaInicio,
        id: data.id,
        nombreEvento: data.nombreEvento,
        nombreSala: data.nombreSala,
        soloImagen: data.soloImagen,
        urlImagen: data.urlImagen,
      };

      // Agrega el anuncio al array
      anuncios.push(anuncio);
    });

    // Envía la respuesta JSON con los anuncios
    console.log(anuncios);
    res.json(anuncios);
  } catch (error) {
    console.error("Error al leer anuncios:", error);
    res.status(500).send("Error al leer anuncios.");
  }
});


// Take the text parameter passed to this HTTP endpoint and insert it into
// Firestore under the path /messages/:documentId/original
exports.addmessage = onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await getFirestore()
      .collection("messages")
      .add({original: original});
    // Send back a message that we've successfully written the message
  res.json({result: `Message with ID: ${writeResult.id} added.`});
});

// Listens for new messages added to /messages/:documentId/original
// and saves an uppercased version of the message
// to /messages/:documentId/uppercase
exports.makeuppercase = onDocumentCreated("/messages/{documentId}", (event) => {
  // Grab the current value of what was written to Firestore.
  const original = event.data.data().original;

  // Access the parameter `{documentId}` with `event.params`
  logger.log("Uppercasing", event.params.documentId, original);

  const uppercase = original.toUpperCase();

  // You must return a Promise when performing
  // asynchronous tasks inside a function
  // such as writing to Firestore.
  // Setting an 'uppercase' field in Firestore document returns a Promise.
  return event.data.ref.set({uppercase}, {merge: true});
});

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

// exports.helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
