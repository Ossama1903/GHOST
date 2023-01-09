import { useContext, useEffect, useState, createContext } from "react";
import { auth } from "../firebase/authentication";
import { useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { createNewUserFromAdmin, deleteUserFromAdmin } from "../api/admin";

import {
  set,
  get,
  ref,
  onValue,
  query,
  equalTo,
  orderByChild,
  remove,
} from "firebase/database";

import cloud from "../firebase/cloud";
import { db } from "../firebase/database";

const AuthContext = createContext("");

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (!currentUser) {
        if (user) {
          console.log(user);
          setCurrentUser(user);
          navigate("/");
        } else {
          setCurrentUser(null);
          navigate("/login");
        }
        setLoading(false);
      }
    });
  }, []);

  const attemptSignIn = (email, password) => {
    return new Promise((resolve, reject) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((user) => {
          resolve(user.user);
        })
        .catch((e) => {
          reject(e.code);
        });
    });
  };

  const deleteUser = (id) => {
    return new Promise((resolve, reject) => {
      remove(ref(db, `users/${id}`))
        .then(() => {
          deleteUserFromAdmin(id).then(() => {
            cloud
              .deleteUserImage(id)
              .then(() => {
                resolve();
              })
              .catch(() => {
                reject();
              });
          });
        })
        .catch(() => {
          reject();
        })
        .catch(() => {
          reject();
        });
    });
  };

  const getUserByEmail = (email) => {
    return new Promise((resolve, reject) => {
      const userRef = query(
        ref(db, `users`),
        orderByChild("email"),
        equalTo(email)
      );
      onValue(userRef, (snapshot) => {
        if (snapshot.val())
          resolve({
            ...Object.values(snapshot.val())[0],
            id: Object.keys(snapshot.val())[0],
          });
        else reject();
      });
    });
  };

  const signInAdmin = async (email, password) => {
    return new Promise(async (resolve, reject) => {
      getUserByEmail(email)
        .then((user) => {
          if (user.role === "superadmin" || user.role === "admin") {
            attemptSignIn(email, password)
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
  };

  const createNewUser = (
    email,
    password,
    firstName,
    lastName,
    role,
    image,
    gender,
    dateOfBirth
  ) => {
    return new Promise(async (resolve, reject) => {
      createNewUserFromAdmin(email, password)
        .then((user) => {
          console.log(user);
          set(ref(db, `users/${user.uid}`), {
            email,
            firstName,
            lastName,
            role,
            image,
            gender,
            dateOfBirth,
            isFlagged: false,
          });

          get(ref(db, `users/${user.uid}`))
            .then((snapshot) => {
              if (snapshot.exists()) {
                cloud
                  .uploadUserImage(user.uid, image)
                  .then(() => {
                    resolve(user.uid);
                  })
                  .catch((e) => {
                    //couldn't upload picture, delete data from realtime db and auth
                    reject({
                      message: "Couldn't upload picture on google cloud.",
                    });
                  });
              } else {
                //delete user from firebase auth here
                reject({
                  message:
                    "Couldn't create user in firebase realtime database.",
                });
              }
            })
            .catch((error) => {
              console.error(error);
              reject({
                message: "Error reading data from realtime database.",
              });
            });
        })
        .catch((e) => {
          reject({ message: "Couldn't register user in firebase auth." });
        });
    });
  };

  const signOutAdmin = (callback) => {
    signOut(auth).then(() => {
      typeof callback === "function" && callback();
    });
  };

  const value = {
    currentUser,
    setCurrentUser,
    signInAdmin,
    signOutAdmin,
    createNewUser,
    deleteUser,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
