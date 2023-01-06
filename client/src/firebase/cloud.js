import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

class Cloud {
  uploadUserImage(id, file) {
    console.log(id, file);
    const storageRef = ref(storage, `profilePictures/${id}`);
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }
}

const cloud = new Cloud();

export default cloud;
