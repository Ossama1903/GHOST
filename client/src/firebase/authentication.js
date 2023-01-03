import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { app } from "./firebase";

const auth = getAuth(app);

class Authentication {
  constructor(passedInstance) {
    this.authenticationInstance = passedInstance;
  }

  async registerWithEmailAndPassword(email, password) {
    const userToReturn = await createUserWithEmailAndPassword(
      this.authenticationInstance,
      email,
      password
    );
    return userToReturn;
  }
}

const authentication = new Authentication(auth);

export default authentication;
