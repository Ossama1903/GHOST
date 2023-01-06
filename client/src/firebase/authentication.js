import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";
import database from "./database";

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

  async attemptSignIn(email, password) {
    try {
      await signInWithEmailAndPassword(
        this.authenticationInstance,
        email,
        password
      );
    } catch (e) {
      console.log(e.code);
      console.log(e.message);
    }
  }

  signInAdmin(email, password) {
    database.getUserByEmail(email, async (user) => {
      if (user) {
        if (user.role === "superadmin" || user.role === "admin") {
          await this.attemptSignIn(email, password);
        } else {
          console.log(
            "ERROR: User doesn't have permission to log into this portal"
          );
        }
      } else {
        console.log("No user found");
      }
    });
  }

  signOutAdmin() {
    signOut(auth);
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}

const authentication = new Authentication(auth);

export default authentication;
