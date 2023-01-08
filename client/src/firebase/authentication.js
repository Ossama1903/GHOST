import { getAuth } from "firebase/auth";
import { app } from "./firebase";

export const auth = getAuth(app);

class Authentication {
  constructor(passedInstance) {
    this.authenticationInstance = passedInstance;
  }
}

const authentication = new Authentication(auth);

export default authentication;
