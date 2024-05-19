import {initializeApp} from "firebase/app";
import {getStorage, ref, uploadBytes, getDownloadURL} from "firebase/storage";
import {v4} from "uuid";

const firebaseConfig = {
    apiKey: "AIzaSyALvgMAoWbEbB9oQs6HZxGt39hZCxaupI8",
    authDomain: "dream-lab-videowall.firebaseapp.com",
    projectId: "dream-lab-videowall",
    storageBucket: "dream-lab-videowall.appspot.com",
    messagingSenderId: "985617523517",
    appId: "1:985617523517:web:2c62289ee8a6419e1f1b54"
  };

// Inicializar la aplicación Firebase SDK con un nombre de instancia único
const app = initializeApp(firebaseConfig, "clientApp");

export const storage = getStorage(app);

export async function uploadFile(file) {
    const storageRef = ref(storage, v4());
    await uploadBytes(storageRef, file)
    const url = await getDownloadURL(storageRef);
    return url;
}
