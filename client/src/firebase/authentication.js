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

  attemptSignIn(email, password) {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(this.authenticationInstance, email, password)
        .then((user) => {
          localStorage.setItem("token", user.user.accessToken);
          localStorage.setItem("email", user.user.email);
          resolve(user);
        })
        .catch((e) => {
          reject(e.code);
        });
    });
  }

  async signInAdmin(email, password) {
    return new Promise(async (resolve, reject) => {
      database
        .getUserByEmail(email)
        .then((user) => {
          if (user.role === "superadmin" || user.role === "admin") {
            this.attemptSignIn(email, password)
              .then((user) => {
                resolve(user);
              })
              .catch((e) => {
                console.log(e);
                if (e === "auth/too-many-requests")
                  reject({
                    message:
                      "Account has been temporarily disabled due to too many requests",
                  });
                else reject({ message: "The password seems to be incorrect" });
              });
          } else {
            reject({
              message: "Uh oh! You don't seem to have the permission for this.",
            });
          }
        })
        .catch((e) => {
          reject({
            message: "No user was found against the provided email",
          });
        });
    });
  }

  signOutAdmin(callback) {
    signOut(auth).then(() => {
      localStorage.removeItem("token");
      typeof callback === "function" && callback();
    });
  }

  getCurrentUser() {
    return auth.currentUser;
  }
}

const authentication = new Authentication(auth);

export default authentication;
