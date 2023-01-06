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
        isFlagged: false,
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
      if (snapshot.val())
        callback({
          ...Object.values(snapshot.val())[0],
          id: Object.keys(snapshot.val())[0],
        });
      else callback(undefined);
    });
  }

  getUserById(id, callback) {
    const userRef = query(ref(this.databaseInstance, `users/${id}`));
    onValue(userRef, (snapshot) => {
      if (snapshot.val()) {
        callback(snapshot.val());
      } else console.log("Couldn't find user with the email");
    });
  }

  getUsersByRole(role, callback) {
    const userRef = query(
      ref(this.databaseInstance, `users`),
      orderByChild("role"),
      equalTo(role)
    );
    onValue(userRef, (snapshot) => {
      if (snapshot.val()) {
        const arrayToReturn = [];
        for (var user in snapshot.val()) {
          arrayToReturn.push({ ...snapshot.val()[user], id: user });
        }
        callback(arrayToReturn);
      } else console.log("Couldn't find any users with the specified role");
    });
  }

  async updateUserFlag(id, flag) {
    await set(ref(db, `users/${id}/isFlagged`), flag);
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
