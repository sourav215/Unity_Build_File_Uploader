import { initializeApp } from "firebase/app";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  getFirestore,
  
} from "firebase/firestore";
import {
  getStorage,
  ref,
  listAll,
  getDownloadURL,
  uploadBytes,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCG-l7w3p6TQVkGaZycDLTI4-ph5STmW8E",
  authDomain: "vizuaradelta.firebaseapp.com",
  projectId: "vizuaradelta",
  storageBucket: "vizuaradelta.appspot.com",
  messagingSenderId: "1010171251555",
  appId: "1:1010171251555:web:25bd9cde3c2a99e3682156",
  measurementId: "G-12DXPJRTRV",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
const storage = getStorage();

export const uploadFile = async (collection, file) => {
  // alert("working");
  if (!file) return;
  try {
    const fileRef = ref(storage, `${collection}/${file.name}`);
    let snapshot = await uploadBytes(fileRef, file);
    let url = await getDownloadURL(snapshot.ref);
    toast.success("File Uploaded Successfully", {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
      hideProgressBar: true,
    });
    return url;
  } catch (err) {
    console.log(err);
    toast.error("Couldn't Upload Image", {
      position: "top-center",
      theme: "colored",
      autoClose: 1000,
      hideProgressBar: true,
    });
    return null;
  }
};

export const checkForFolder = async (folder) => {
  // console.log(folder);
  const path = `Virtual Labs 1.0/${folder}`;
  try {
    const listRef = ref(storage, path);
    let res = await listAll(listRef);
    let resultObj = {};
    await Promise.all(
      res.items.map(async (itemRef) => {
        let url = await getDownloadURL(ref(storage, itemRef._location.path_));
        if (url.includes(".data")) {
          resultObj.data = url;
          return { data: url };
        } else if (url.includes(".framework")) {
          resultObj.framework = url;
          return { framework: url };
        } else if (url.includes(".loader")) {
          resultObj.loader = url;
          return { loader: url };
        } else if (url.includes(".wasm")) {
          resultObj.code = url;
          return { code: url };
        }
      })
    );

    // console.log("data", resultObj);

    return resultObj;
  } catch (err) {
    console.log(err);
    return null;
  }
};
