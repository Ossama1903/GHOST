import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

class Cloud {
  uploadUserImage(id, file) {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `profilePictures/${id}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          resolve(snapshot);
        })
        .catch((e) => {
          console.log(e);
          reject(e);
        });
    });
  }

  deleteUserImage(id) {
    return new Promise((resolve, reject) => {
      const pictureRef = ref(storage, `profilePictures/${id}`);
      deleteObject(pictureRef)
        .then(() => {
          resolve();
        })
        .catch((error) => {
          reject();
        });
    });
  }

  getUserImage(id) {
    return new Promise((resolve, reject) => {
      getDownloadURL(ref(storage, `profilePictures/${id}`))
        .then((url) => {
          resolve(url);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

const cloud = new Cloud();

export default cloud;
