import {
  getDatabase,
  set,
  ref,
  push,
  onValue,
  query,
  equalTo,
  orderByChild,
} from "firebase/database";
import { app } from "./firebase";
import authentication from "./authentication";

const db = getDatabase(app, "https://ghost-e4544-default-rtdb.firebaseio.com/");

class Database {
  constructor(passedInstance) {
    this.databaseInstance = passedInstance;
  }
  async createNewUser(
    email,
    password,
    firstName,
    lastName,
    role,
    image,
    gender,
    dateOfBirth
  ) {
    try {
      const { user } = await authentication.registerWithEmailAndPassword(
        email,
        password
      );
      await set(ref(this.databaseInstance, `users/${user.uid}`), {
        email,
        firstName,
        lastName,
        role,
        image,
        gender,
        dateOfBirth,
      });
    } catch {
      console.log("Couldn't register");
    }
  }

  async createNewAlert(time, userId, rideId, isApproved) {
    await push(ref(db, `alerts`), {
      userId,
      rideId,
      time,
      isApproved,
    });
  }

  getUserByEmail(email, callback) {
    const userRef = query(
      ref(this.databaseInstance, `users`),
      orderByChild("email"),
      equalTo(email)
    );
    onValue(userRef, (snapshot) => {
      if (snapshot.val()) callback(Object.values(snapshot.val())[0]);
      else console.log("Couldn't find user with the email");
    });
  }

  getUsersByRole(role, callback) {
    const userRef = query(
      ref(this.databaseInstance, `users`),
      orderByChild("role"),
      equalTo(role)
    );
    onValue(userRef, (snapshot) => {
      if (snapshot.val()) callback(Object.values(snapshot.val()));
      else console.log("Couldn't find any users with the specified role");
    });
  }

  updateUsersState(setUsers) {
    const usersRef = ref(db, "users");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      var arrayToReturn = [];
      for (const property in data) {
        arrayToReturn.push({ id: property, ...data[property] });
      }
      setUsers(arrayToReturn);
    });
  }
}

const database = new Database(db);

export default database;
