/* eslint-disable linebreak-style */
/**
 *  * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */
// const {format} = require("date-fns");
// const {es} = require("date-fns/locale");
// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const {logger} = require("firebase-functions");
const {onRequest} = require("firebase-functions/v2/https");
const {onDocumentCreated} = require("firebase-functions/v2/firestore");

// The Firebase Admin SDK to access Firestore.
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");

initializeApp();

exports.readAnuncios = onRequest( async (req, res) => {
  try {
    // Accede a la instancia de Firestore
    const firestore = getFirestore();

    res.set("Access-Control-Allow-Origin", "*");

    // Obtiene todos los documentos de la colección "AnunciosVideowall"
    const querySnapshot = await firestore
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
      // const fechaFormatted = format(data.fecha.toDate(),
      // "PPPP", {locale: es});

      // const fecha = fechaFormatted.replace(/^.*, /, "");

      // const horaFin = format(data.horaFin.toDate(), "p", {locale: es});

      // const horaInicio = format(data.horaInicio.toDate(), "p", {locale: es});

      // Formatea los campos según lo especificado
      const anuncio = {
        descripcion: data.descripcion,
        encendido: data.encendido,
        fecha: data.fecha,
        horaFin: data.horaFin,
        horaInicio: data.horaInicio,
        nombreEvento: data.nombreEvento,
        nombreSala: data.nombreSala,
        personalizado: data.personalizado,
        posicion: data.posicion,
        soloImagen: data.soloImagen,
        urlImagen: data.urlImagen,
        firebaseId: doc.id,
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

// Creación de anuncios
exports.createAnuncio = onRequest(async (req, res) => {
  try {
    const firestore = getFirestore();
    // Configurar los encabezados CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Si la solicitud es una solicitud OPTIONS, responder con un estado "ok"
    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }

    // Obtener los datos del anuncio del cuerpo de la solicitud
    const {
      descripcion,
      encendido,
      fecha,
      horaFin,
      horaInicio,
      id,
      nombreEvento,
      nombreSala,
      personalizado,
      posicion,
      soloImagen,
      urlImagen} = req.body;

    // Crear un nuevo documento de anuncio en la colección "AnunciosVideowall"
    await firestore.collection("AnunciosVideowall").add({
      descripcion,
      encendido,
      fecha,
      horaFin,
      horaInicio,
      id,
      nombreEvento,
      nombreSala,
      personalizado,
      posicion,
      soloImagen,
      urlImagen});

    // Enviar una respuesta de éxito
    res.status(200).send("Anuncio creado exitosamente.");
  } catch (error) {
    console.error("Error al crear anuncio:", error);
    // Enviar una respuesta de error
    res.status(500).send("Error al crear anuncio.");
  }
});


// Creación de anuncios
exports.createAnuncio2 = onRequest(async (req, res) => {
  try {
    const firestore = getFirestore();
    // Configurar los encabezados CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Si la solicitud es una solicitud OPTIONS, responder con un estado "ok"
    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }

    // Obtener los datos del anuncio del cuerpo de la solicitud
    const {
      descripcion,
      encendido,
      fecha,
      horaFin,
      horaInicio,
      nombreEvento,
      nombreSala,
      personalizado,
      posicion,
      soloImagen,
      urlImagen,
    } = req.body;

    // Crear un nuevo documento
    const newAnuncioRef = await firestore.collection("AnunciosVideowall").doc();
    const newId = newAnuncioRef.id; // Obtener el ID autogenerado por Firebase

    // Añadir el documento
    await newAnuncioRef.set({
      descripcion,
      encendido,
      fecha,
      horaFin,
      horaInicio,
      nombreEvento,
      nombreSala,
      personalizado,
      posicion,
      soloImagen,
      urlImagen,
      firebaseId: newId, // Agregar el ID autogenerado por Firebase
    });

    // Enviar una respuesta de éxito
    res.status(200).send("Anuncio creado exitosamente.");
  } catch (error) {
    console.error("Error al crear anuncio:", error);
    // Enviar una respuesta de error
    res.status(500).send("Error al crear anuncio.");
  }
});


// Eliminación de anuncios
exports.deleteAnuncio = onRequest(async (req, res) => {
  try {
    const firestore = getFirestore();
    // Configurar los encabezados CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "DELETE, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Si la solicitud es una solicitud OPTIONS, responder con un estado "ok"
    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }

    // Obtener el ID del anuncio a eliminar de los parámetros de la solicitud
    const anuncioId = req.query.id;
    console.log("ID del anuncio a eliminar INDEX:", anuncioId);

    // Verificar si se proporcionó un ID válido
    if (!anuncioId) {
      res.status(400).send("Se requiere un ID de anuncio válido.");
      return;
    }

    // Eliminar el anuncio de la colección "AnunciosVideowall"
    await firestore.collection("AnunciosVideowall").doc(anuncioId).delete();

    // Enviar una respuesta de éxito
    res.status(200).send("Anuncio eliminado exitosamente.");
  } catch (error) {
    console.error("Error al eliminar anuncio:", error);
    // Enviar una respuesta de error
    res.status(500).send("Error al eliminar anuncio.");
  }
});


// Edición de anuncios
exports.updateAnuncio = onRequest(async (req, res) => {
  try {
    const firestore = getFirestore();
    // Configurar los encabezados CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Si la solicitud es una solicitud OPTIONS, responder con un estado "ok"
    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }

    // Obtener el ID del anuncio a editar de los parámetros de la solicitud
    const anuncioId = req.query.id;

    // Verificar si se proporcionó un ID válido
    if (!anuncioId) {
      res.status(400).send("Se requiere un ID de anuncio válido.");
      return;
    }

    // Obtener los datos actualizados del anuncio del cuerpo de la solicitud
    const {
      descripcion,
      encendido,
      fecha,
      horaFin,
      horaInicio,
      nombreEvento,
      nombreSala,
      personalizado,
      posicion,
      soloImagen,
      urlImagen,
    } = req.body;

    // Verificar si se proporcionaron datos válidos
    if (!descripcion && !encendido && !fecha && !horaFin &&
      !horaInicio && !nombreEvento && !nombreSala &&
      !personalizado && !posicion && !soloImagen && !urlImagen) {
      res.status(400).send("Al menos un campo debe ser proporcionado.");
      return;
    }

    // Crear un objeto con los campos a actualizar
    const fieldsToUpdate = {};
    if (descripcion) fieldsToUpdate.descripcion = descripcion;
    if (encendido !== undefined) fieldsToUpdate.encendido = encendido;
    if (fecha) fieldsToUpdate.fecha = fecha;
    if (horaFin) fieldsToUpdate.horaFin = horaFin;
    if (horaInicio) fieldsToUpdate.horaInicio = horaInicio;
    if (nombreEvento) fieldsToUpdate.nombreEvento = nombreEvento;
    if (nombreSala) fieldsToUpdate.nombreSala = nombreSala;
    // eslint-disable-next-line max-len
    if (personalizado !== undefined) fieldsToUpdate.personalizado = personalizado;
    if (posicion) fieldsToUpdate.posicion = posicion;
    if (soloImagen !== undefined) fieldsToUpdate.soloImagen = soloImagen;
    if (urlImagen) fieldsToUpdate.urlImagen = urlImagen;

    // Actualizar el anuncio en la colección "AnunciosVideowall"
    // eslint-disable-next-line max-len
    await firestore.collection("AnunciosVideowall").doc(anuncioId).update(fieldsToUpdate);

    // Enviar una respuesta de éxito
    res.status(200).send("Anuncio actualizado exitosamente.");
  } catch (error) {
    console.error("Error al actualizar anuncio:", error);
    // Enviar una respuesta de error
    res.status(500).send("Error al actualizar anuncio.");
  }
});

exports.updateAnuncio2 = onRequest(async (req, res) => {
  try {
    const firestore = getFirestore();
    // Configurar los encabezados CORS
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Allow-Methods", "PUT, OPTIONS");
    res.set("Access-Control-Allow-Headers", "Content-Type");

    // Si la solicitud es una solicitud OPTIONS, responder con un estado "ok"
    if (req.method === "OPTIONS") {
      res.status(200).send();
      return;
    }

    // Obtener el ID del anuncio a editar de los parámetros de la solicitud
    const anuncioId = req.query.id;

    // Verificar si se proporcionó un ID válido
    if (!anuncioId) {
      res.status(400).send("Se requiere un ID de anuncio válido.");
      return;
    }

    // Obtener los datos actualizados del anuncio del cuerpo de la solicitud
    const {encendido, posicion} = req.body;

    // Verificar si se proporcionaron datos válidos
    if (encendido === undefined && posicion === undefined) {
      res.status(400).send("Se debe proporcionar al menos un campo.");
      return;
    }

    // Crear un objeto con los campos a actualizar
    const fieldsToUpdate = {};
    if (encendido !== undefined) fieldsToUpdate.encendido = encendido;
    if (posicion !== undefined) fieldsToUpdate.posicion = posicion;

    // Actualizar el anuncio en la colección "AnunciosVideowall"
    // eslint-disable-next-line max-len
    await firestore.collection("AnunciosVideowall").doc(anuncioId).update(fieldsToUpdate);

    // Enviar una respuesta de éxito
    res.status(200).send("Anuncio actualizado exitosamente.");
  } catch (error) {
    console.error("Error al actualizar anuncio:", error);
    // Enviar una respuesta de error
    res.status(500).send("Error al actualizar anuncio.");
  }
});


// Funciones de ejemplo/tutorial

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

