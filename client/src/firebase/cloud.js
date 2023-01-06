import { getStorage, ref, uploadBytes } from "firebase/storage";
import { app } from "./firebase";

const storage = getStorage(app);

class Cloud {
  uploadUserImage(file) {
    const storageRef = ref(storage, "profileImages/hellothere");
    uploadBytes(storageRef, file).then((snapshot) => {
      console.log("Uploaded a blob or file!");
    });
  }
}

const cloud = new Cloud();

export default cloud;
