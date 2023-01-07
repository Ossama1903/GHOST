import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

class Cloud {
  uploadUserImage(id, file, callback) {
    console.log(id, file);
    const storageRef = ref(storage, `profilePictures/${id}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      typeof callback === "function" && callback();
    });
  }
}

const cloud = new Cloud();

export default cloud;
